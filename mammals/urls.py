from django.conf.urls.defaults import *
import os.path
from django.contrib import databrowse
from portal.search import PortalSearchView, PortalSearchForm

media_root = os.path.join(os.path.dirname(__file__),"media")

urlpatterns = patterns('',
	
	(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': media_root}),
	
	
	#Sandbox version:
	(r'^sandbox/$',              'blackrock.mammals.views.sandbox_grid' ),
	(r'^sandbox/grid/',          'blackrock.mammals.views.sandbox_grid' ),
	(r'^sandbox/grid_square/',   'blackrock.mammals.views.sandbox_grid_block' ),
	
	
	
	#Blackrock version:
	(r'^$',              'blackrock.mammals.views.index' ),
	(r'^grid/',          'blackrock.mammals.views.grid' ),
	(r'^grid_square/',   'blackrock.mammals.views.grid_block' ),
	(r'^login/',                 'blackrock.mammals.views.mammals_login' ),
	(r'^process_login/',         'blackrock.mammals.views.process_login_and_go_to_expedition' ),
	(r'^new_expedition/',   'blackrock.mammals.views.new_expedition' ),
	(r'^edit_expedition/(?P<expedition_id>\d+)/$',       'blackrock.mammals.views.edit_expedition'),
	(r'^team_form/(?P<expedition_id>\d+)/(?P<team_letter>\w+)/$',       'blackrock.mammals.views.team_form'),
	
	
	#(r'^selenium/(?P<task>\w+)/$',               'family_info.views.selenium'),

    (r'^grid_square_csv/',   'blackrock.mammals.views.grid_square_csv' ),

)
