jQuery(function(){
	
	/* Need to update so we can pass all initialization info here */
    testCollectionView = new Respiration.Views.RespirationTable({ 
    	el: jQuery('.speciesbox')
    }).render();


    testCollectionView.species_list_view.collection.add([new Respiration.Models.Species({   
        	'id': "betula_lenta",
            'label' : 'Betula lenta',
            't0' : 10,
            'k' :  283.15,
            'r0' : 0.162,
            'e0' : 54267.7
    })]);

    //testCollectionView.species_list_view.collection.add([new Respiration.Models.Species()]);
    //console.log(testCollectionView.species_list_view.collection);

    
    leafGraphOptions = {
        chart: {
		    renderTo: 'leaf-graph-area',
            zoomType: 'xy'
        },
        title: {
            text: 'Respiration Rate Graph',
            x: -20 //center
        },
        xAxis: {
            tickInterval: 5,
            title: {
                text: "Ambient Temperature (Ta)",
            }
            ,
            plotLines: [{
                value: 0,
             }]
        },
        yAxis: {
            title: {
                text: 'Respiration Rate (R)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        }//,
        //series: testCollectionView.species_list_view.collection.prepareSeries()
    }
    respirationGraph = new Highcharts.Chart(leafGraphOptions);
    console.log("Passed respirationGraph");


    console.log("testCollectionView.species_list_view.collection.size()");
    console.log(testCollectionView.species_list_view.collection.size());

    
    var collection_length = testCollectionView.species_list_view.collection.size();
    for(var j=0; j < collection_length; j++)
    {
    	/* For each value in temperature range */
        var newdata = [];

        var i=Respiration.Models.GraphData.get('Ta_min');
        var max_i = Respiration.Models.GraphData.get('Ta_max');
        
        for(i; i < max_i; i++)
        {
            newdata.push(Respiration.Models.GraphData.graphArrhenius(testCollectionView.species_list_view.collection.models[j], i));
        }
        console.log(newdata);

        respirationGraph.addSeries({
            name: testCollectionView.species_list_view.collection.models[j].get('label'),
            data: newdata
        });
   }


});