Respiration.Models.LeafGraphData = Backbone.Model.extend({
	defaults: {
	    'Rg': 8.314,
        'Ta_min': 0,
        'Ta_max': 30
    }
});


Respiration.Models.GraphData = new Respiration.Models.LeafGraphData();


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
/*    ,

    get_arrhenius_range: function(Rg, Ta_min, Ta_max){
    	/* We need to get the arrhenius value for each value in the temperature range */
    	/*var temp_data = [];*/
    	/* LeafGraphData.prototype.arrhenius */
    	/*var Ta_min = Ta_min;//+273.15;
    	var Ta_max = Ta_max;//+273.15;
    	var Rg = parseInt(Rg, 10);

    	var count;

    	for(count=Ta_min; count < Ta_max; count++){
    	    var inner = ( (1/this.get('t0')) - (1/count));
            var right = (this.get('e0') / Rg) * inner;
            var Rval = this.get('r0') * Math.exp(right);
            var val = Math.round(Rval*1000)/1000;
            console.log("temperature to calculate");
            console.log(count);
            console.log("val");
            console.log(val);
            temp_data.push(val);
        }

        return temp_data;
    }
});*/