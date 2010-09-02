from blackrock.portal.models import *
from django.contrib import admin

class GenericAdmin(admin.ModelAdmin):
  search_fields = ['name']
  ordering = ["name"]

admin.site.register(Audience, GenericAdmin)
admin.site.register(DigitalFormat, GenericAdmin)
admin.site.register(Facet, GenericAdmin)
admin.site.register(Institution, GenericAdmin)
admin.site.register(LocationType, GenericAdmin)
admin.site.register(LocationSubtype, GenericAdmin)
admin.site.register(PersonType, GenericAdmin)
admin.site.register(PublicationType, GenericAdmin)
admin.site.register(RegionType, GenericAdmin)
admin.site.register(RightsType, GenericAdmin)
admin.site.register(Tag, GenericAdmin)
admin.site.register(Url, GenericAdmin)

class LocationAdmin(admin.ModelAdmin):
  search_fields = ['name']
  list_display = ('name', 'latitude', 'longitude')
  ordering = ["name"]
admin.site.register(Location, LocationAdmin)

class StationAdmin(admin.ModelAdmin):
  search_fields = ['name']
  ordering = ["name"]
admin.site.register(Station, StationAdmin)

class PersonAdmin(admin.ModelAdmin):
  search_fields = ['name']
  ordering = ["name"]
admin.site.register(Person, PersonAdmin)

class DataSetAdmin(admin.ModelAdmin):
  search_fields = ['name']
  ordering = ["name"]
admin.site.register(DataSet, DataSetAdmin)

class DigitalObjectAdmin(admin.ModelAdmin):
  search_fields = ['name']
  ordering = ["name"]
admin.site.register(DigitalObject, DigitalObjectAdmin)

class PublicationAdmin(admin.ModelAdmin):
  search_fields = ['name']
  ordering = ["name"]
admin.site.register(Publication, PublicationAdmin)

class RegionAdmin(admin.ModelAdmin):
  search_fields = ['name']
  ordering = ["name"]
admin.site.register(Region, RegionAdmin)

class ResearchProjectAdmin(admin.ModelAdmin):
  search_fields = ['name']
  ordering = ["name"]
admin.site.register(ResearchProject, ResearchProjectAdmin)

class LearningActivityAdmin(admin.ModelAdmin):
  search_fields = ['name']
  ordering = ["name"]
admin.site.register(LearningActivity, LearningActivityAdmin)

class ForestStoryAdmin(admin.ModelAdmin):
  search_fields = ['display_name', 'name', 'description']
  ordering = ["display_name"]
  list_display = ('display_name',)
  
admin.site.register(ForestStory, ForestStoryAdmin)



