jQuery(function () {

    jQuery('#leaf-graph-area').highcharts({
        chart: {
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
        },
        series: testCollectionView.species_list_view.collection.prepareSeries()
        //Respiration.PredefinedSpecies.prepareSeries()
    });

        //testCollectionView.species_list_view.collection.on('add', this.addItem);
        //testCollectionView.species_list_view.collection.on('change', this.addItem);
});