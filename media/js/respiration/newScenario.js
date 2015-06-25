/* Defining a general scenario view, this is an empty scenario,
probably not the first scenario, the first scenario data should be 
obtained from the leaf graph assuming there is leaf graph data */
Respiration.Views.Scenario = Backbone.View.extend({

    events: {
        'click .scenario-row .deleteScenario': 'remove',
        /* Do we want to leave functionality as is? Where it adds a row and then user selects species or what? */
         'click .species-table-header .dropdown-menu .species-predefined-choice': 'addSpeciesRow'
      },
    
    initialize: function(options){
        _.bindAll(this, 'render', 'remove', 'addSpecies', 'isGraphable');
        this.template = _.template(jQuery("#scenario-template").html());
        this.species_list_view = new Respiration.Views.SpeciesCollection({
            el: jQuery('.speciescontainer')
        });
    },
    
    render: function() { 
        console.log("inside render");
        /* If the model has species render those inner rows */
        var num_of_species = 0;
        // = this.model.get('numSpecies');
        if(num_of_species > 0) {
            console.log(this.model.attributes);
            // remove current species rows
            var species_container = this.$('.species-table-body .species-row-container').empty();
            this.model.speciesList.each(function(species) { 
                new Respiration.Views.Species(
                    { model: species, container: species_container }
                    ).render(); 
            });
        }
        else {
            console.log(this.model.attributes);
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
                new Respiration.Views.Species({ model: tree_here, container: species_container  }).render());
            
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
    },

    isGraphable: function() {
        this.species_list_view.collection.each(function(model){ model.validate();});
    }
    
});

    

//  
//  App.TestScenario = new App.Models.Scenario({});
//
//    App.TestScenarioView = new App.Views.Scenario({ model: App.TestScenario, el: jQuery('.scenario-view-test')}).render();
//});