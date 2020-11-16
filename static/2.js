//var canvas_html = '<canvas id="canvas"></canvas>';
var pub_time_a= [];
var pub_date_a = [];
var in_temp_a = [];
var out_temp_a = [];
//------------------
var pub_time_m= [];
var pub_date_m = [];
var in_temp_m = [];
var out_temp_m = [];
//------------------
var pub_time_w= [];
var pub_date_w = [];
var in_temp_w = [];
var out_temp_w = [];
//------------------

$(document).ready(function(){

    // draw all_period at launch
   // getDataW();
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
function getData(){
    $.getJSON('static/all_data_json', function (data){
         console.log(data);
         pub_time_a.splice(0,pub_time.length);
         pub_date_a.splice(0,pub_date.length);
         in_temp_a.splice(0,in_temp.length);
         out_in_temp_a.splice(0,out_temp.length);
         for (var i in data) {
             in_temp_a.push(data[i].in_temp_a);
             out_in_temp_a.push(data[i].out_in_temp_a);
             pub_date_a.push(data[i].pub_date_a);
             pub_time_a.push(data[i].pub_time_a);
         }
         //-----------------------------------------------
         pub_time_m = pub_time_a.slice(-1344);
         pub_date_m = pub_date_a.slice(-1344);
         in_temp_m = in_temp_a.slice(-1344);
         out_temp_m = out_temp_a.slice(-1344);
         //-----------------------------------------------
         pub_time_w = pub_time_a.slice(-336);
         pub_date_w = pub_date_a.slice(-336);
         in_temp_w = in_temp_a.slice(-336);
         out_temp_w = out_temp_a.slice(-336);
         console.log(out_temp_w)
         //-----------------------------------------------
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



