Respiration.Views.BaseSpecies = Backbone.View.extend({

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
        this.model.set({'id' : cpy_tree.get('id'), 'label' : cpy_tree.get('label'),
                        't0' : cpy_tree.get('t0'), 'k' :  cpy_tree.get('k'),
                        'r0' : cpy_tree.get('r0'), 'e0' : cpy_tree.get('e0')});
    }

});

Respiration.Views.LeafSpecies = Respiration.Views.BaseSpecies.extend({

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
	}

});


Respiration.Views.ForestSpecies = Respiration.Views.BaseSpecies.extend({

    events: {
        'click .delete': 'remove',
        'click .species-row .name_info .dropdown-menu .species-predefined-choice': 'selectSpecies'
      },
    
    initialize: function(options){
        _.bindAll(this, 'render', 'insert', 'remove', 'selectSpecies');
        this.model.on('change', this.render);
        this.template = _.template(jQuery("#forest-species-template").html());
        if (options && 'container' in options) {
            this.container = options.container;
            this.insert();
        }
    }

});


Respiration.Views.LeafSpeciesCollection = BaseListView.extend({

    initialize: function (options)
    {
        _.bindAll(this, 'renderCollection', 'addItem');
        this.options = options;
        //how to pass collection
        this.collection = new Respiration.Collections.SpeciesCollection();
        this.collection.on('reset', this.renderCollection);
        this.collection.on('add', this.addItem);
        this.item_view = Respiration.Views.LeafSpecies;
    }

});


Respiration.Views.ForestSpeciesCollection = BaseListView.extend({

    initialize: function (options)
    {
        _.bindAll(this, 'renderCollection', 'addItem');
        this.options = options;
        //how to pass collection
        this.collection = new Respiration.Collections.SpeciesCollection();
        this.collection.on('reset', this.renderCollection);
        this.collection.on('add', this.addItem);
        this.item_view = Respiration.Views.ForestSpecies;
    }

});



Respiration.Views.LeafTable = Backbone.View.extend({
    
    events: {
    	'click .addSpecies': 'addSpecies'
    },
    
    initialize: function (options) {
        _.bindAll(this,
                  'addSpecies',
                  'isGraphable');
        this.options = options;
        this.species_list_view = new Respiration.Views.LeafSpeciesCollection({
            el: jQuery('.leafspeciescontainer')
        });
    },

    addSpecies: function(event) {
        console.log("Inside addSpecies");
        console.log("this.species_list_view.collection");
        console.log(this.species_list_view.collection);
        console.log(this.species_list_view.collection.length);
    	this.species_list_view.collection.add([new Respiration.Models.Species()]);
        console.log("after addSpecies");
        console.log("this.species_list_view.collection");
        console.log(this.species_list_view.collection);
        console.log(this.species_list_view.collection.length);
    },

    isGraphable: function() {
        this.species_list_view.collection.each(function(model){ model.validate();});
    }
});


/* Defining a general scenario view, this is an empty scenario,
probably not the first scenario, the first scenario data should be 
obtained from the leaf graph assuming there is leaf graph data */
Respiration.Views.Scenario = Backbone.View.extend({

    events: {
        'click .scenario-row .deleteScenario': 'remove',
        'click .species-table-header .dropdown-menu .species-predefined-choice': 'addSpeciesRow'
      },
    
    initialize: function(options){
        _.bindAll(this, 'render', 'remove', 'addSpecies');
        this.template = _.template(jQuery("#scenario-template").html());
        this.species_list_view = new Respiration.Views.ForestSpeciesCollection({
            el: jQuery('.speciescontainer')
        });
    },
    
    render: function() { 
        console.log("inside scenario render");
        //console.log("this.model scenario");
        //console.log(this.model);
        //console.log("this.species_list_view.collection.length scenario");
        //console.log(this.species_list_view.collection.length);
        /* If the model has species render those inner rows */
        if(this.species_list_view.collection.length > 0) {
            console.log("inside if");
            console.log(this.model.attributes);
            // remove current species rows
            var species_container = this.$('.species-table-body .species-row-container').empty();
            this.species_list_view.collection.each(function(species) { 
                new Respiration.Views.ForestSpecies(
                    { model: species, container: species_container }
                    ).render(); 
            });
        }
        else {
            console.log("inside else");
            //console.log(this.model.attributes);
            console.log("this.$el.html(this.model.attributes))");
            console.log(this.$el.html(this.model.attributes));
            //if there is nothing in the collection add a default so the template is rendered
            //if there are no species we must create a default one
            this.$el.html(this.template(this.model.attributes));
            var species_container = this.$('.species-table-body .species-row-container').empty();
            var tree_here = new Respiration.Models.Species({   
                'id': "ue_id",
                'label' : 'Tree Species',
                't0' : 10,
                'k' :  283.15,
                'r0' : 0.602,
                'e0' : 43140
            });
            this.$('.species-table-body').append(
                new Respiration.Views.ForestSpecies({ model: tree_here, container: species_container  }).render());
            
            return this;
        }
    },

    addSpecies: function(event) {
        this.species_list_view.collection.add([new Respiration.Models.Species()]);
    },
    
    insert: function(){
        this.container.append(this.$el);
    },
    
    remove: function() {
        /* I assume I will have to do this in a custom way so it removes the inner collection */
         this.model.destroy();
    },
    
    addSpeciesRow: function(event) {
        var tree_id = event.currentTarget.attributes['data-id'].value;
        /* Shouldn't be relying on a global variable here... should be passing in or something */
        var cpy_tree = Respiration.PredefinedSpecies.get(tree_id).clone();
        var species_container = this.$('.species-table-body .species-row-container');
        this.$('.species-table-body').append(
            new Respiration.Views.Species({ model: cpy_tree, container: species_container  }).render()); 
        return this;
    }
});


// Respiration.Views.ForestGraphManagement = Backbone.View.extend({

//     events: {
//          'click .species-table-header .dropdown-menu .species-predefined-choice': 'addScenario'
//       },
    
//     initialize: function(options){
//         _.bindAll(this, 'render', 'remove', 'addSpecies', 'isGraphable');
//         this.template = _.template(jQuery("#scenario-template").html());
//         this.species_list_view = new Respiration.Views.ForestSpeciesCollection({
//             el: jQuery('.speciescontainer')
//         });
//     },
    
//     render: function() { 
//         console.log("inside render");
//         /* If the model has species render those inner rows */
//         var num_of_species = 0;
//         // = this.model.get('numSpecies');
//         if(num_of_species > 0) {
//             console.log(this.model.attributes);
//             // remove current species rows
//             var species_container = this.$('.species-table-body .species-row-container').empty();
//             this.model.speciesList.each(function(species) { 
//                 new Respiration.Views.ForestSpecies(
//                     { model: species, container: species_container }
//                     ).render(); 
//             });
//         }
//         else {
//             console.log(this.model.attributes);
//             //if there are no species we must create a default one
//             this.$el.html(this.template(this.model.attributes));
//             var species_container = this.$('.species-table-body .species-row-container').empty();
//             var tree_here = new Respiration.Models.Species({   
//                 'id': "ue_id",
//                 'label' : 'Tree Species',
//                 't0' : 10,
//                 'k' :  283.15,
//                 'r0' : 0.602,
//                 'e0' : 43140
//             });
//             this.$('.species-table-body').append(
//                 new Respiration.Views.ForestSpecies({ model: tree_here, container: species_container  }).render());
            
//             return this;
//         }
//     },

//     addSpecies: function(event) {
//         this.species_list_view.collection.add([new Respiration.Models.Species()]);
//     },
    
//     insert: function(){
//         this.container.append(this.$el);
//     },
    
//     remove: function() {
//         /* I assume I will have to do this in a custom way so it removes the inner collection */
//          this.model.destroy();
//     },
    
//     addSpeciesRow: function(event) {
//         var tree_id = event.currentTarget.attributes['data-id'].value;
//         /* Shouldn't be relying on a global variable here... should be passing in or something */
//         var cpy_tree = Respiration.PredefinedSpecies.get(tree_id).clone();
//         var species_container = this.$('.species-table-body .species-row-container');
//         this.$('.species-table-body').append(
//             new Respiration.Views.Species({ model: cpy_tree, container: species_container  }).render()); 
//         return this;
//     }
    
// });


