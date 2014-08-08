from blackrock.portal.search import PortalSearchView, PortalSearchForm
from django.conf.urls.defaults import patterns, url
from django.contrib import databrowse
from django.views.generic.simple import direct_to_template
import os.path

media_root = os.path.join(os.path.dirname(__file__), "media")

urlpatterns = patterns(
    '',
    (r'^media/(?P<path>.*)$',
     'django.views.static.serve',
     {'document_root': media_root}),

    (r'^browse/(.*)', databrowse.site.root),

    url(r'^search/',
        PortalSearchView(template="portal/search.html",
                         form_class=PortalSearchForm),
        name='search'),

    url(r'^nearby/(?P<latitude>-?\d+\.\d+)/(?P<longitude>-?\d+\.\d+)/$',
        'blackrock.portal.views.nearby'),

    url(r'^weather/$', direct_to_template,
     {'template': 'portal/weather.html'}),

    (r'^(?P<path>.*)$', 'blackrock.portal.views.page')
)
