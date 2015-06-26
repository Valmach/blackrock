jQuery(function(){

    /* Set up view for leaf graph data and add a defualt species to the list */
    LeafCollectionView = new Respiration.Views.LeafTable({ 
        el: jQuery('.leaf-graph-info')
    }).render();

    LeafCollectionView.species_list_view.collection.add([new Respiration.Models.Species()]);

    /* If user has put information in the leaf graph get that information
    and use it to populate the first scenario area */
    ScenarioView = new Respiration.Views.Scenario({ 
       model: new Respiration.Models.Scenario({
            speciesList: new Respiration.Collections.SpeciesCollection(LeafCollectionView.species_list_view.collection.toJSON())
        }), 
        el: jQuery('.forest-graph-info')
    }).render();


    // Set up graphs by passing options
    /* We need to check that species information has been entered that can be graphed */
    LeafGraph = new Highcharts.Chart(Respiration.leafGraphOptions);


    //console.log(testCollectionView.species_list_view.collection.models[0].isGraphable());
    
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




    // need to add some sort of sync method for when the user switches between views
    console.log(LeafCollectionView.species_list_view.collection.toJSON());
    //console.log(ScenarioView.model.attributes.speciesList);
    //ScenarioView.model.attributes.speciesList = LeafCollectionView.species_list_view.collection.toJSON();
    //console.log(ScenarioView.model);

    /* When user clicks on forest tab update first scenario to reflect
    what the user currently has in the leaf graph */



    /* When user clicks on leaf tab leaf graph to correspond to what
    is in the first scenario of the forest graph */


    /* Drawing the Forest Graph involved calling getsum for each tree
    in each scenario and drawing a column for it */
    //ForestGraph = new Highcharts.Chart(Respiration.forestGraphOptions);
    //console.log(ForestCollectionView.species_list_view.collection);
    // draw the graph every time the collections changes
    /*ForestCollectionView.species_list_view.collection.on('change', function(){

        ForestGraph = new Highcharts.Chart(Respiration.forestGraphOptions);

        var collection_length = ForestCollectionView.species_list_view.collection.size();

        for(var j=0; j < collection_length; j++)
        {
            /* For each value in temperature range */
            //var newdata = [];

            //var i=Respiration.Models.GraphData.get('Ta_min');
            //var max_i = Respiration.Models.GraphData.get('Ta_max');

            /* for(i; i < max_i; i++)
            {
                newdata.push(Respiration.Models.GraphData.graphArrhenius(LeafCollectionView.species_list_view.collection.models[j], i));
            }

            LeafGraph.addSeries({
                name: LeafCollectionView.species_list_view.collection.models[j].get('label'),
                data: newdata
            });
        }
    }); */







});