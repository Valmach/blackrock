

/* Now the Collection Views */
var BaseListView = Backbone.View.extend({

    renderCollection: function() {
        this.collection.each(function(model)
        {
            this.$el.append(new this.item_view({
                model: model
            }).render().el);
        }, this);
        return this;
    },
    
    addItem: function(model, collection, options)
    {
        this.$el.append(new this.item_view({
            model: model
        }).render().el);
    }

});




var Respiration = { 
	Models: {}, 
	Collections: {}, 
	Views:{}
};


Respiration.Models.Species = Backbone.Model.extend({
/*	defaults: {
		'id': "something",
        'label' : 'Select Your Tree Species',
        't0' : 0,
        'k' :  0,
        'r0' : 0,
        'e0' : 0
    } */
});

Respiration.Collections.SpeciesCollection = Backbone.Collection.extend({
	model: Respiration.Models.Species,
});

Respiration.Views.Species = Backbone.View.extend({

	events: {
	    'click .delete': 'remove',
	    'click .scenario-species-row .name_info .dropdown-menu .species-predefined-choice': 'selectSpecies'
	  },
	
	initialize: function(options){
		_.bindAll(this, 'render', 'insert', 'remove');
		this.template = _.template(jQuery("#leaf-species-template").html());
		if (options && 'container' in options) {
			this.container = options.container;
			this.insert();
		}
	},

	render: function () {
        this.$el.html(this.template(this.model.attributes));
        return this;
    },

    insert: function(){
		this.container.append(this.$el);
	},
	
	remove: function() {
	    this.model.destroy();
	},
	
	/* should decouple so you pass it a collection to search for a copy */
	selectSpecies: function(event) {
		var tree_id = event.currentTarget.attributes['data-id'].value;
		/* Shouldn't be relying on a global variable here... should be passing in or something */
		var cpy_tree = Respiration.PredefinedSpecies.get(tree_id).clone();
		this.model.set({'id': cpy_tree.get('id'), 'label' : cpy_tree.get('label'),
			            't0' : cpy_tree.get('t0'), 'k' :  cpy_tree.get('k'),
			            'r0' : cpy_tree.get('r0'), 'e0' : cpy_tree.get('e0')});
	}

});

Respiration.Views.SpeciesCollection = BaseListView.extend({
    
    initialize: function (options)
    {
    	
        _.bindAll(this, 'renderCollection', 'addItem');
        this.options = options;
    	console.log(options);
        this.collection = new Respiration.Collections.SpeciesCollection();
        this.collection.on('reset', this.renderCollection);
        this.collection.on('add', this.addItem);
        this.item_view = Respiration.Views.Species;
        //this.collection.addItem(new Respiration.Models.Species());
    }
});

Respiration.Views.RespirationTable = Backbone.View.extend({
    
    // events: {
    //	'click .addSpecies': 'addSpecies'
    //},
    
    initialize: function (options) {
        //_.bindAll(this,
        //          'addSpecies');
        this.options = options;
        this.species_list_view = new Respiration.Views.SpeciesCollection({
            el: jQuery('.leafspeciescontainer')
        });//{el: this.options.listEl})//.render();
    }
});
//el: leaf-graph-info




jQuery(function(){
	
	var predefinedSpecies = new Respiration.Collections.SpeciesCollection();

	/* Add some predefined species */
	predefinedSpecies.add([
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
	
	
	var testModel = new Respiration.Models.Species({   
        'id': "unique_id",
        'label' : 'Quercus rubra',
        't0' : 10,
        'k' :  283.15,
        'r0' : 0.602,
        'e0' : 43140
    });

	/*var testView = new Respiration.Views.Species({
	    model: testModel,
	    el: jQuery('.leafspeciescontainer')
	}).render();*/
    
    
    /*var Respiration.TestCollectionView = new Respiration.Views.SpeciesCollection({ 
    	el: jQuery('.leafspeciescontainer')
    });
    Respiration.TestCollectionView.collection.add([new Respiration.Models.Species({   
        	'id': "betula_lenta",
            'label' : 'Betula lenta',
            't0' : 10,
            'k' :  283.15,
            'r0' : 0.162,
            'e0' : 54267.7
        })]);  */

   
    var testCollectionView = new Respiration.Views.RespirationTable({ 
    	el: jQuery('.speciesbox')//,
    	//listEl: jQuery('.leafspeciescontainer')
   }).render();

    testCollectionView.species_list_view.collection.add([new Respiration.Models.Species({   
        	'id': "betula_lenta",
            'label' : 'Betula lenta',
            't0' : 10,
            'k' :  283.15,
            'r0' : 0.162,
            'e0' : 54267.7
    })]);


	
	
});