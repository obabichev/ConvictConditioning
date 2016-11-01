/**
 * Created by olegchuikin on 01/11/16.
 */

$(document).ready(function () {
    var ctx = document.getElementById("chart");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            label: 'Scatter Dataset',
            datasets: [{
                label: 'Scatter Dataset',
                data: graph
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        }
    });
});