Respiration.Collections.SpeciesCollection = Backbone.Collection.extend({
	model: Respiration.Models.Species,
});

/*    prepareSeries: function(event) {
    	/* For now going to use set max/min values - will add slider later */
/*    	var series_data = [];

    	this.forEach(function(model) {
            series_data.push({
            	name: model.get('label'),
                data: model.get_arrhenius_range(
                	Respiration.Models.GraphData.get('Rg'),
                	Respiration.Models.GraphData.get('Ta_min'),
                	Respiration.Models.GraphData.get('Ta_max'))
            });
        });
        return series_data;
    }
});
*/