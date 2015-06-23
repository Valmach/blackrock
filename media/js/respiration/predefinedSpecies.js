jQuery(function(){
	
	// We want this list to be globally accessible
	Respiration.PredefinedSpecies = new Respiration.Collections.SpeciesCollection();

	/* Add some predefined species */
	Respiration.PredefinedSpecies.add([
	    new Respiration.Models.Species({   
	        'id': "quercus_rubra",
	        'label' : 'Quercus rubra',
	        't0' : 10,
	        'k' :  283.15,
	        'r0' : 0.602,
	        'e0' : 43140
	    }),
	    new Respiration.Models.Species({   
	        'id': "quercus_prinus",
	        'label' : 'Quercus prinus',
	        't0' : 10,
	        'k' :  283.15,
	        'r0' : 0.670,
	        'e0' : 37005
	    }),
	    new Respiration.Models.Species({   
	        'id': "acer_rubrum",
	        'label' : 'Acer rubrum',
	        't0' : 10,
	        'k' :  283.15,
	        'r0' : 0.680,
	        'e0' : 27210
	   }),
	   new Respiration.Models.Species({   
	        'id': "vaccinium_corymbosum",
	        'label' : 'Vaccinium corymbosum',
	        't0' : 10,
	        'k' :  283.15,
	        'r0' : 0.091,
	        'e0' : 62967
	   }),
	   new Respiration.Models.Species({   
	        'id': "berberis_thumbergii",
	        'label' : 'Berberis thumbergii',
	        't0' : 10,
	        'k' :  283.15,
	        'r0' : 0.203,
	        'e0' : 81950
	   }),
	   new Respiration.Models.Species({   
	        'id': "kalmia_latifolia",
	        'label' : 'Kalmia latifolia',
	        't0' : 10,
	        'k' :  283.15,
	        'r0' : 0.308,
	        'e0' : 54940
        }),
        new Respiration.Models.Species({   
        	'id': "carya_glabra",
            'label' : 'Carya glabra',
            't0' : 10,
            'k' :  283.15,
            'r0' : 0.134,
            'e0' : 70547.5
        }),
        new Respiration.Models.Species({   
        	'id': "liriodendron_tulipifera",
            'label' : 'Liriodendron tulipifera',
            't0' : 10,
            'k' :  283.15,
            'r0' : 0.187,
            'e0' : 60620.0
        }),
        new Respiration.Models.Species({   
        	'id': "platanus_occidentalis",
            'label' : 'Platanus occidentalis',
            't0' : 10,
            'k' :  283.15,
            'r0' : 0.320,
            'e0' : 56336.7
        }),
        new Respiration.Models.Species({   
        	'id': "betula_papyrifera",
            'label' : 'Betula papyrifera',
            't0' : 10,
            'k' :  283.15,
            'r0' : 0.357,
            'e0' : 45322.0
        }),
        new Respiration.Models.Species({   
        	'id': "populus_tremuloides",
            'label' : 'Populus tremuloides',
            't0' : 10,
            'k' :  283.15,
            'r0' : 0.424,
            'e0' : 52261.3
        }),
        new Respiration.Models.Species({   
        	'id': "populus_grandidentata",
            'label' : 'Populus grandidentata',
            't0' : 10,
            'k' :  283.15,
            'r0' : 0.294,
            'e0' : 59425.5
        }),
        new Respiration.Models.Species({   
        	'id': "betula_lenta",
            'label' : 'Betula lenta',
            't0' : 10,
            'k' :  283.15,
            'r0' : 0.162,
            'e0' : 54267.7
        })
    ]);
});