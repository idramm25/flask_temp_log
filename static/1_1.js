//var canvas_html = '<canvas id="canvas"></canvas>';
var pub_time = [];
var pub_date = [];
var in_temp = [];
var out_temp = [];

$(document).ready(function(){

    // draw all_period at launch
    getDataW();
    drawChart();

    $("#all_period").click(function() {
        // redraw chart with all_period data
        getDataAll();
        drawChart();
    });

    $("#m_period").click(function(){
        // redraw chart with m_period data
        getDataM();
        drawChart();
    });

    $("#w_period").click(function(){
		// redraw chart with w_period data
		getDataW();
        drawChart();
    });
});

//---------------------------------------------------------
function getDataAll(){
    $.getJSON('templates/all_data_json', function (data){
         console.log(data);
         pub_time.splice(0,pub_time.length);
         pub_date.splice(0,pub_date.length);
         in_temp.splice(0,in_temp.length);
         out_temp.splice(0,out_temp.length);
         for (var i in data) {
             in_temp.push(data[i].in_temp);
             out_temp.push(data[i].out_temp);
             pub_date.push(data[i].pub_date);
             pub_time.push(data[i].pub_time);
         }
    });
};
//---------------------------------------------------------
function getDataM(){
    $.getJSON('templates/m_data_json', function (data){
         console.log(data);
         pub_time.splice(0,pub_time.length);
         pub_date.splice(0,pub_date.length);
         in_temp.splice(0,in_temp.length);
         out_temp.splice(0,out_temp.length);
         for (var i in data) {
             in_temp.push(data[i].in_temp);
             out_temp.push(data[i].out_temp);
             pub_date.push(data[i].pub_date);
             pub_time.push(data[i].pub_time);
         }
    });
};
//----------------------------------------------------------
function getDataW(){
    $.getJSON('templates/w_data_json', function (data){
         console.log(data);
         pub_time.splice(0,pub_time.length);
         pub_date.splice(0,pub_date.length);
         in_temp.splice(0,in_temp.length);
         out_temp.splice(0,out_temp.length);
         for (var i in data) {
             in_temp.push(data[i].in_temp);
             out_temp.push(data[i].out_temp);
             pub_date.push(data[i].pub_date);
             pub_time.push(data[i].pub_time);
         }

    });
};
//----------------------------------------------------------
    function drawChart() {
        var ctx = document.getElementById('canvas_container1').getContext('2d');
        var chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        datasets: [{
                            data: in_temp,
                            label: 'Inside temp',
                            fill: false,
                            pointRadius: 0,
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            // This binds the dataset to the left y axis
                            yAxisID: 'left-y-axis'
                        }, {
                            data: out_temp,
                            label: 'Outside temp',
                            fill: false,
                            pointRadius: 0,
                            backgroundColor: 'rgb(25, 150, 255)',
                            borderColor: 'rgb(25, 150, 255)',
                            // This binds the dataset to the right y axis
                            yAxisID: 'right-y-axis'
                        }],
                        labels: pub_date
                    },
                        options: ({
                            scales: {
                                yAxes: [{
                                    ticks: {
                                    autoSkip: true,
                                    min: -10,
                                    max: 38
                                    },
                                    id: 'left-y-axis',
                                    type: 'linear',
                                    position: 'left'
                                }, {
                                    ticks: {
                                    autoSkip: true,
                                    min: -10,
                                    max: 38
                                    },
                                    id: 'right-y-axis',
                                    type: 'linear',
                                    position: 'right'
                                }]
                            }
                        })
                    });
        };



