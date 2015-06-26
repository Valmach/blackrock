jQuery(function(){
	
    /* Need to update so we can pass all initialization info here */
    /* Set up view for leaf graph and add a defualt species to the list */
    LeafCollectionView = new Respiration.Views.RespirationTable({ 
        el: jQuery('.leaf-graph-info')
    }).render();

    LeafCollectionView.species_list_view.collection.add([new Respiration.Models.Species()]);
    //console.log(testCollectionView.species_list_view.collection.models[0].isGraphable());
    /* We need to check that species information has been entered that can be graphed */
    LeafGraph = new Highcharts.Chart(Respiration.leafGraphOptions);
    console.log(LeafCollectionView.species_list_view.collection);
    // draw the graph every time the collections changes
    LeafCollectionView.species_list_view.collection.on('change', function(){

        LeafGraph = new Highcharts.Chart(Respiration.leafGraphOptions);

        var collection_length = LeafCollectionView.species_list_view.collection.size();

        for(var j=0; j < collection_length; j++)
        {
        	/* For each value in temperature range */
            var newdata = [];

            var i=Respiration.Models.GraphData.get('Ta_min');
            var max_i = Respiration.Models.GraphData.get('Ta_max');

            for(i; i < max_i; i++)
            {
                newdata.push(Respiration.Models.GraphData.graphArrhenius(LeafCollectionView.species_list_view.collection.models[j], i));
            }

            LeafGraph.addSeries({
                name: LeafCollectionView.species_list_view.collection.models[j].get('label'),
                data: newdata
            });
        }
    });


    /* Area to display scenario data to user */
    /* If user has put information in the leaf graph get that information
    and use it to populate the first scenario area */
    ScenarioView = new Respiration.Views.Scenario({ 
        model: new Respiration.Models.Scenario({
            speciesList: new Respiration.Collections.SpeciesCollection(LeafCollectionView.species_list_view.collection.toJSON())
        }), 
        el: jQuery('.scenariobox')
    }).render();

    // need to add some sort of sync method for when the user switches between views
    console.log(LeafCollectionView.species_list_view.collection.toJSON());
    console.log(ScenarioView.model.attributes.speciesList);
    //ScenarioView.model.attributes.speciesList = LeafCollectionView.species_list_view.collection.toJSON();
    console.log(ScenarioView.model);





});