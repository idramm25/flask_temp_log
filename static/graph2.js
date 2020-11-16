$(document).ready(function () {
    showGraph();
    });
        function showGraph(){
            $.getJSON('templates/w_data_json', function (data){
                console.log(data);
                var pub_time = [];
                var pub_date = [];
                var in_temp = [];
                var out_temp = [];
                for (var i in data) {
                    in_temp.push(data[i].in_temp);
                    out_temp.push(data[i].out_temp);
                    pub_date.push(data[i].pub_date);
                    pub_time.push(data[i].pub_time);
                }
                //-----------------------------------------------------

                //--------------------------------------------------------------
                //var ctx = document.getElementById('myChart2').getContext('2d');
                var ctx2 = document.getElementById('myChart27').getContext('2d');
                //var x = pub_time.concat(pub_date);
                var chart = new Chart(ctx2, {

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
                    options: {
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

                    }
                });
                //---------------------------------------------------------------
            });
        }

