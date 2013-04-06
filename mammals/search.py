from django import forms
from haystack.views import SearchView, FacetedSearchView
from haystack.forms import SearchForm
from mammals.models import TrapLocation, Species, Habitat, School, GridSquare
from django.db.models import get_model, get_app
from django.utils.text import capfirst
from types import ListType
#from collections import Counter  ## not allowed in 2.6
from collections import defaultdict
from django.utils import simplejson
from django.http import HttpResponse

def my_counter(L):
    d = defaultdict(int)
    for i in L:
        d[i] += 1
    return d

class MammalSearchForm(SearchForm):

    success_list = [
        ('unsuccessful',          'Unsuccessful traps')
        ,('trapped_and_released', 'Trapped and released')
    ]
    
    signs_list = [
        ('observed',                'Observed')
        ,('camera',                 'Camera')
        ,('tracks_and_signs',       'Tracks and signs')
    ]
    
    habitat_list = [(h.id, h.label ) for h in Habitat.objects.all()]
    species_list = [(s.id, s.common_name) for s in Species.objects.all()]
    school_list =  [(s.id, s.name) for s in School.objects.all()]

    csm = forms.CheckboxSelectMultiple
    # note: the order in which these are defined... affects the order in which they are displayed in the template. This sucks but it's what I get for accepting to use Django forms.
    
    success = forms.MultipleChoiceField(required=False, label='', widget=csm, choices=success_list)
    signs =   forms.MultipleChoiceField(required=False, label='', widget=csm, choices=signs_list)
    
    habitat = forms.MultipleChoiceField(required=False, label='Habitat', widget=csm, choices=habitat_list)
    species = forms.MultipleChoiceField(required=False, label='Species', widget=csm, choices=species_list)
    school = forms.MultipleChoiceField(required=False, label='School', widget=csm, choices=school_list)



    def __init__(self, *args, **kwargs):
        super(MammalSearchForm, self).__init__(*args, **kwargs)

    def checkboxes_or (self, name):
        """" note: this returns a blank string if nothing is checked."""
        return ' OR '.join (['%s:%s'% (name, a)  for a in self.cleaned_data[name]])
        
    def calculate_breakdown (self, the_sqs):
        result = {}
        for thing in  ['species', 'habitat', 'school', 'unsuccessful', 'trapped_and_released']:            
            what_to_count = [getattr (x, ('%s' % thing)) for x in the_sqs]
            result [thing] = my_counter (what_to_count )
        # nanohack
        result['success'] = {}
        result['success']['unsuccessful']         = result['trapped_and_released'][False];
        result['success']['trapped_and_released'] = result['trapped_and_released'][True ];
        return result

    def search(self):
        sqs = []
        self.hidden = []
        if self.is_valid():
            #else
            ##TODO test validity of connection and throw error if there's a problem.
            #note -- haystack catches the error. so i can't. This kinda sucks.
            
            sqs = self.searchqueryset.auto_query('')
            #import pdb
            #pdb.set_trace()
            #sqs = sqs.narrow ('asset_type_exact:TrapLocation')
            sqs =sqs.narrow ('asset_type_exact:TrapLocation OR asset_type_exact:Sighting')
            #not sure i want this...
            #if self.load_all:
            #    return sqs.load_all()
            
            sqs = sqs.narrow (self.checkboxes_or ('habitat'))
            sqs = sqs.narrow (self.checkboxes_or ('species'))
            sqs = sqs.narrow (self.checkboxes_or ('school' ))
            
            #trap success:
            show_unsuccessful = 'unsuccessful'         in self.cleaned_data['success']
            show_successful   = 'trapped_and_released' in self.cleaned_data['success']
            
            
            
            
            observed           = 'observed'         in self.cleaned_data['signs']
            camera             = 'camera'           in self.cleaned_data['signs']
            tracks_and_signs   = 'tracks_and_signs' in self.cleaned_data['signs']


            # if neither, or both, are clicked, show all locations.
            # however:
            if show_unsuccessful and not show_successful:
                sqs = sqs.narrow('unsuccessful:True')
            if show_successful   and not show_unsuccessful:
                sqs = sqs.narrow('trapped_and_released:True')
            
            
            if observed or camera or tracks_and_signs:
                
                tmp = []
               
                if observed:
                    tmp.append ('observed:True')
                if camera:
                    tmp.append ('camera:True')
                if tracks_and_signs:
                    tmp.append ('tracks_and_signs:True')
                sqs = sqs.narrow(  ' OR '.join(tmp))
        self.breakdown = simplejson.dumps(self.calculate_breakdown(sqs))
        
        return sqs


class MammalSearchView(SearchView):
    def __init__(self, *args, **kwargs):
        hella_many = 5000000000
        super(MammalSearchView, self).__init__(*args, **kwargs)
        self.results_per_page = hella_many
  
    def __name__(self):
        return "MammalSearchView"

    def get_results(self):
        return self.form.search()
    
    def extra_context(self):
        extra = super(MammalSearchView, self).extra_context()
        if hasattr(self, "results"):
            if type(self.results) is ListType and len(self.results) < 1:
                extra["count"] = -1
            else:
                extra["count"] = len(self.results)
        query = ''
        for param, value in self.request.GET.items():
            if param != 'page':
                query += '%s=%s&' % (param, value)
        
        
        grid = [gs.info_for_display() for gs in GridSquare.objects.all() if gs.display_this_square]
        extra['grid_json']  = simplejson.dumps(grid)
        extra['query'] = query
        extra['little_habitat_disks_json'] = simplejson.dumps(dict((a.id, a.image_path_for_legend) for a in Habitat.objects.all()))
        extra['habitat_colors_json'] = simplejson.dumps(dict((a.id, a.color_for_map) for a in Habitat.objects.all()))

        if not hasattr(self.form, 'breakdown'):
            self.form.breakdown = {}
            
        #this is what's used to actually draw the form:
        #TODO: index search_map_repr itself.
        
        #this is still hitting the DB. TODO: fix.
        
        extra ['results_json']= simplejson.dumps([tl.object.search_map_repr() for tl in self.results])
        return extra
        
def ajax_search(request):
    if request.method == 'POST':
        my_new_form    = MammalSearchForm(request.POST)
        search_results = my_new_form.search()
        result_obj = {}
        #this is still hitting the DB. TODO: fix.
        #result_obj['map_data']  = [tl.object.search_map_repr() for tl in search_results]
        result_obj['map_data']  = [  new_search_map_repr( tl) for tl in search_results]
        
            
        result_obj['breakdown_object'] = my_new_form.calculate_breakdown(search_results)
        return HttpResponse(simplejson.dumps(result_obj))
    else:
        return HttpResponseRedirect ( '/mammals/search/')
        
        
        
    #TODO what happens if lat or long is NULL?
    
    

def new_search_map_repr (obj):
    result = {}
    
    vals = (
        obj.species_label,
        obj.habitat_label,
        obj.school_label,
        obj.date
    )
    
    try:
        result ['where']   =  [float(obj.lat), float(obj.lon)]
    except TypeError:
        result ['where'] = [0.0,0.0]
    
    result ['name'] =  "Animal: %s</br>Habitat: %s</br>School: %s</br>Date: %s" % vals
    result ['species'] =  obj.species_label
    result ['habitat_id'] = obj.habitat
    result ['habitat'] =    obj.habitat_label
    result ['school_id']  =    obj.school
    result ['school']     =    obj.school
    result ['school_label']     =    obj.school_label
    
    if obj.date !=None:
        result ['date']    =    obj.date.strftime("%m/%d/%y")
    else:
        result ['date']    =    ''
    
    
    return result
