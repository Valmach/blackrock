    Respiration.leafGraphOptions = {
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


    Respiration.forestGraphOptions = {
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