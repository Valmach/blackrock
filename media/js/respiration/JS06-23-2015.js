    Respiration.Functions.Arrhenius = function (R0, E0, Rg, T0, Ta) {
        var inner = ( (1/T0) - (1/Ta));
        var right = (E0 / Rg) * inner;
        var Rval = R0 * Math.exp(right);
        return Math.round(Rval*1000)/1000;
    }


Respiration.Models.Species = Backbone.Model.extend({
	defaults: {
		'id': "something",
        'label' : 'Select Your Tree Species',
        't0' : 0,
        'k' :  0,
        'r0' : 0,
        'e0' : 0
    }
});

Respiration.Models.LeafGraphData = Backbone.Model.extend({
	defaults: {
	    'Rg': 8.314,
        'Ta_min': 0,
        'Ta_max': 30
    },

    graphArrhenius: function(model, t_a) {
    	var r0 = model.get('r0');
    	var e0 = model.get('e0');
    	var t0 = model.get('t0');
        var Rval = Respiration.Functions.Arrhenius(model.get('r0'), model.get('e0'), this.get('Rg'), model.get('t0')+273.15, t_a+273.15);
        return Rval;
    }
});


Respiration.Models.GraphData = new Respiration.Models.LeafGraphData();


Respiration.Collections.SpeciesCollection = Backbone.Collection.extend({
	model: Respiration.Models.Species,
});


Respiration.Views.Species = Backbone.View.extend({

	events: {
	    'click .delete': 'remove',
	    'click .species-row .name_info .dropdown-menu .species-predefined-choice': 'selectSpecies'
	  },
	
	initialize: function(options){
		_.bindAll(this, 'render', 'insert', 'remove', 'selectSpecies');
		this.model.on('change', this.render);
		this.template = _.template(jQuery("#leaf-species-template").html());
		if (options && 'container' in options) {
			this.container = options.container;
			this.insert();
		}
		if (options && 'predefinedList' in options) {
			this.predefinedList = options.predefinedList;
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
        this.collection = new Respiration.Collections.SpeciesCollection();
        this.collection.on('reset', this.renderCollection);
        this.collection.on('add', this.addItem);
        this.item_view = Respiration.Views.Species;
    }

});




Respiration.Views.RespirationTable = Backbone.View.extend({
    
    events: {
    	'click .addSpecies': 'addSpecies'
    },
    
    initialize: function (options) {
        _.bindAll(this,
                  'addSpecies');
        this.options = options;
        this.species_list_view = new Respiration.Views.SpeciesCollection({
            el: jQuery('.leafspeciescontainer')
        });
    },

    addSpecies: function(event) {
    	this.species_list_view.collection.add([new Respiration.Models.Species()]);
    }
});