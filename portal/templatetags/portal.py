from django import template
from django.utils.text import capfirst
from haystack.query import SearchQuerySet
register = template.Library()
from django.conf import settings
import types

@register.filter('klass')
def klass(obj):
    return obj._meta.object_name
  
@register.filter('klass_display')
def klass_display(obj):
    return capfirst(obj._meta.verbose_name)
  
@register.filter('klass_display_plural')
def klass_display_plural(obj):
    return capfirst(obj._meta.verbose_name_plural)  

@register.filter('hidden_klasses')
def hidden_klasses():
    return ['Publication', 'Audience', 'Region']

@register.filter("facet")
def facet(obj, facetName):
    return [facet.display_name for facet in obj.facet.filter(facet=facetName)]

@register.filter('facet_assets')
def facet_assets(obj, facetName):
      # Get all assets with valid "infrastructure" facets
    sqs = SearchQuerySet()
    sqs = sqs.facet(facetName)
    sqs = sqs.narrow(facetName + ":[* TO *]")
    return sqs

@register.filter('facet_counts')
def facet_counts(obj, facetName):
  
  try:
    counts = {}
  
    sqs = SearchQuerySet()
    sqs = sqs.facet(facetName)
    sqs = sqs.narrow(facetName + ":[* TO *]")
  
    for x in sqs.facet_counts()['fields'][facetName]:
      key = x[0].replace(' ', '')
      key = key.replace('-', '')
      counts[key] = x[1]
    return counts
  except:
    return None  
  
@register.filter('infrastructure')
def infrastructure(obj):
    return [facet.display_name for facet in obj.facet.filter(facet='Infrastructure')]

@register.filter('featured')  
def featured(obj):
    return [facet.name for facet in obj.facet.filter(facet='Featured')]
  
@register.filter('featured_assets')
def featured_assets(obj):
      # Get all assets with valid "infrastructure" facets
    sqs = SearchQuerySet()
    sqs = sqs.facet("featured")
    sqs = sqs.narrow("featured:[* TO *]")
    return sqs  
  
@register.filter('infrastructure_assets')
def infrastructure_assets(obj):
      # Get all assets with valid "infrastructure" facets
    sqs = SearchQuerySet()
    sqs = sqs.facet("infrastructure")
    sqs = sqs.narrow("infrastructure:[* TO *]")
    return sqs

@register.filter('infrastructure_counts')
def infrastructure_counts(obj):
  
  try:
    infrastructure_counts = {}
  
    sqs = SearchQuerySet()
    sqs = sqs.facet("infrastructure")
    sqs = sqs.narrow("infrastructure:[* TO *]")
  
    for infrastructure in sqs.facet_counts()['fields']['infrastructure']:
      key = infrastructure[0].replace(' ', '')
      key = key.replace('-', '')
      infrastructure_counts[key] = infrastructure[1]
    return infrastructure_counts
  except:
    return None

@register.filter('featured_counts')
def featured_counts(obj):
  
  try:
    featured_counts = {}
    sqs = SearchQuerySet()
    sqs = sqs.facet("featured")
    sqs = sqs.narrow("featured:[* TO *]")
  
    for featured in sqs.facet_counts()['fields']['featured']:
      key = featured[0].replace(' ', '')
      key = key.replace('-', '')
      featured_counts[key] = featured[1]
    return featured_counts
  except:
    return None
    
@register.filter('detail_url')
def detail_url(obj):
    if obj._meta.object_name == 'ForestStory':
      url = "/portal/foreststories/%s" % (obj.name) 
    else:
      url = "/portal/browse/portal/%s/objects/%s" % (obj._meta.object_name.lower(), obj.id)
      
    return url

@register.filter('map_url')
def map_url(obj):
    return "/portal/interactive-map/?type=%s&id=%s" % (obj._meta.object_name.lower(), obj.id)

@register.filter('display_name')
def display_name(obj):
  display_name = getattr(obj, "display_name", None)
  if display_name and type(display_name) == types.UnicodeType and len(obj.display_name) > 0:
    return obj.display_name
  elif display_name and type(display_name) == types.MethodType:
    return obj.display_name()  
  else:
      if type(obj.name) == types.MethodType:
        return obj.name()
      else:
        return obj.name

@register.filter('search_name')
def search_name(obj):
  display_name = getattr(obj, "display_name", None)
  if display_name and type(display_name) == types.UnicodeType and len(obj.display_name) > 0:
    return obj.display_name
  else:
      if type(obj.name) == types.MethodType:
        return obj.name()
      else:
        return obj.name
    
@register.filter('gallery')
def gallery(obj):
    images = []
    display_image = obj.display_image
    if display_image and display_image.digital_format.is_image and display_image.file:
        images.append(display_image)
        if hasattr(obj, 'extra_media'):
            for d in obj.extra_media.all():
                if d.digital_format.is_image() and d.file:
                    images.append(d)
    return images
    
@register.tag
def value_from_settings(parser, token):
    try:
        # split_contents() knows not to split quoted strings.
        tag_name, var = token.split_contents()
    except ValueError:
        raise template.TemplateSyntaxError, "%r tag requires a single argument" % token.contents.split()[0]
    return ValueFromSettings(var)

class ValueFromSettings(template.Node):
    def __init__(self, var):
        self.arg = template.Variable(var)
    def render(self, context):        
        return settings.__getattr__(str(self.arg))

    
    