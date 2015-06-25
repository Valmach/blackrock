jQuery(function(){
	
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
        }
    }


    /* Need to update so we can pass all initialization info here */
    /* Set up view for leaf graph and add a defualt species to the list */
    testCollectionView = new Respiration.Views.RespirationTable({ 
        el: jQuery('.leaf-graph-info')
    }).render();

    testCollectionView.species_list_view.collection.add([new Respiration.Models.Species()]);
    //console.log(testCollectionView.species_list_view.collection.models[0].isGraphable());
    /* We need to check that species information has been entered that can be graphed */
    respirationGraph = new Highcharts.Chart(leafGraphOptions);

    // draw the graph every time the collections changes
    testCollectionView.species_list_view.collection.on('change', function(){

        respirationGraph = new Highcharts.Chart(leafGraphOptions);

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

            respirationGraph.addSeries({
                name: testCollectionView.species_list_view.collection.models[j].get('label'),
                data: newdata
            });
        }
    });


    /* Area to display scenario data to user */
    Respiration.TestScenarioView = new Respiration.Views.Scenario({ 
        model: new Respiration.Models.Scenario({}), 
        el: jQuery('.scenariobox')
    }).render();


    forestGraphOptions = {
        chart: {
            type: 'column',
            renderTo: 'forest-graph-area',
            zoomType: 'xy'
        },
        title: {
            text: 'Scenario Graph',
            x: -20 //center
        },
        xAxis: {
            title: {
                text: "Scenario",
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Seasonal Respiratory Carbon Release'
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        }
    }


});