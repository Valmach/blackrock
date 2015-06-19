jQuery(function () {

    jQuery('#leaf-graph-area').highcharts({
        title: {
            text: 'Respiration Rate Graph',
            x: -20 //center
        },
        xAxis: {
            title: {
                text: "Ambient Temperature (Ta)",
            },
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
        series: Respiration.PredefinedSpecies.prepareSeries()
    });
});