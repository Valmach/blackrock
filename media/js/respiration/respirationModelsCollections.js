Respiration.Models.Species = Backbone.Model.extend({
    defaults: {
        'id': "something",
        'label' : 'Select Your Tree Species',
        't0' : 0,
        'k' :  0,
        'r0' : 0,
        'e0' : 0
    },

    isGraphable: function () {
        console.log('this.attributes');
        console.log(this.attributes);
        console.log(parseInt(this.attributes.t0));
        /* First make sure they fields are not empty*/
        if (!this.attributes.label) {
            return 'Please label you tree species.';
        }
    },

    validate: function (attrs) {
        /* First make sure they fields are not empty*/
        if (!attrs.label) {
            return 'Please label you tree species.';
        }
        if (!attrs.t0) {
            return 'Please fill in the base temperature.';
        }
        if (!attrs.r0) {
            return 'Please fill in the respiration rate at the base temperature.';
        }
        if (!attrs.e0) {
            return 'Please fill in the energy of activation at the base temperature.';
        }
        /* Now make sure that fields which should be numbers are */
        if (parseInt(attrs.t0) === NaN) {
            return 'Please enter a number for the base temperature.';
        }
        if (parseInt(attrs.r0) === NaN) {
            return 'Please enter a number for the respiration rate at the base temperature.';
        }
        if (parseInt(attrs.e0) === NaN) {
            return 'Please enter a number for the energy of activation at the base temperature.';
        }
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


Respiration.Collections.SpeciesCollection = Backbone.Collection.extend({
    model: Respiration.Models.Species,
});


Respiration.Models.GraphData = new Respiration.Models.LeafGraphData();


/* This is only used for the second graph */
Respiration.Models.Scenario = Backbone.Model.extend({
    
    defaults: function() {
        return {
            /* Should I be using 'this' or is that done automatically because it is a default? */
            scenarioName: 'Scenario Name',
            numSpecies: 0,
            speciesList: new Respiration.Collections.SpeciesCollection(),
        }
    }
    
});

Respiration.Collections.ScenarioCollection = Backbone.Collection.extend({
    model: Respiration.Models.Scenario,
});
