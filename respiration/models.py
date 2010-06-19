#coding:utf-8 (this comment allows us to use the degree symbol)
from django.db import models, connection
import math
from time import time

Rg = 8.314

class Temperature(models.Model):
  def __unicode__(self):
    if self.reading is None:
      return "%s: [No reading] at %s station" % (self.date, self.station)
    return u"%s: %.2f° C at %s station" % (self.date, self.reading, self.station)
    
  station = models.CharField(max_length=50, unique_for_date="date")
  date = models.DateTimeField()
  reading = models.FloatField(null=True,blank=True)
  precalc = models.FloatField(null=True,blank=True)

  DATA_SOURCE_CHOICES = (
    ('original', 'Original Blackrock Spreadsheet'),
    ('mock', 'Mock data to fill in gaps')
  )  
  
  data_source = models.CharField(max_length=10, choices=DATA_SOURCE_CHOICES)

  def save(self, *args, **kwargs):
    "This is mainly just to weed out insane values when arrhenius sums are calculated"
    self.precalc = None
    if -100 < self.reading < 100: #not crazy
      self.precalc = 1
    return super(Temperature, self).save(*args, **kwargs)

  @classmethod
  def arrhenius_sum(self,e0,r0,t0,delta_t,start_date,end_date,station,use_python=False):
    """ returns tuple with value and time it took
    >>>from datetime import datetime
    >>>Temperature.arrhenius_sum(27210.0,0.84,288.0,datetime(2002,1,1),datetime(2003,1,1),'Ridgetop')
    (6626.1003695358022, 0.011781930923461914)
    two implementations, depending on how much optimization is nec
     use_python=True on my system is mostly about 0.2 seconds
     use_python=False (in postgres) is about 0.01 seconds --BETTER!
    """
    
    x=time()
    if t0 == 0: #avoid division by zero
      return 0
    
    summation = 0
    if use_python: 
      try:
        goodyear = Temperature.objects.filter(date__gte=start_date,date__lt=end_date,precalc__isnull=False,station=station)
        for r in goodyear:
          summation += math.exp(e0 *(1/t0 - 1/(r.reading+273.15) ) /Rg)
      except:
        import pdb
        pdb.set_trace()

    else:
      tablename = self._meta.db_table
      station_field = self._meta.get_field('station').column
      date_field = self._meta.get_field('date').column
      precalc_field = self._meta.get_field('precalc').column
      reading_field = self._meta.get_field('reading').column

      cursor = connection.cursor()
      #might need to filter station here or something, too
      sqlcmd = """SELECT sum(exp(%f*(1/%f - 1/("%s"+273.15+%f)) /%f)) FROM "%s" WHERE "%s" >= '%s' AND "%s" < '%s'
                  AND "%s" IS NOT NULL and "%s"='%s'
                  """ % (e0,t0,reading_field,delta_t,Rg,
                         tablename,
                         date_field,
                         start_date.strftime('%m/%d/%Y'),
                         date_field,
                         end_date.strftime('%m/%d/%Y'),
                         precalc_field,
                         station_field,
                         station, #beware SQL injection!!!
                         )
      cursor.execute(sqlcmd)
      summation = cursor.fetchone()[0] or 0.0

    final=summation*r0*3600.0
    return (final,time()-x)

  @classmethod
  def selective_delete(self, station, start_date, end_date):
      kwargs = {}
      if (station and station != 'All'):
        kwargs['station' ] = station
      if (start_date and end_date):
        kwargs['date__range'] = (start_date, end_date)
        
      qs = Temperature.objects.filter(**kwargs)
      rows = qs.count()
      qs.delete()
      return rows