from django import template
from django.utils.text import capfirst
from haystack.query import SearchQuerySet
register = template.Library()
from django.conf import settings


@register.filter('klass')
def klass(obj):
    return obj._meta.object_name
  
@register.filter('klass_display')
def klass_display(obj):
    return capfirst(obj._meta.verbose_name)
  
@register.filter('klass_display_plural')
def klass_display_plural(obj):
    return capfirst(obj._meta.verbose_name_plural)  
  
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

@register.filter('display_name')
def display_name(obj):
  if hasattr(obj, "display_name") and len(obj.display_name) > 0:
    return obj.display_name
  else:
    return obj.name

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

    