var canvas_html = '<canvas id="canvas" height="100px;"></canvas>';

$(document).ready(function(){

    // draw stanza at launch
    drawChart(generateChartData());

    $("#stanza").click(function() {
        // redraw chart with stanza data
        drawChart(generateChartData());
    });

    $("#settimanale").click(function(){
        // redraw chart with settimanale data
        drawChart(generateChartData());
    });

    $("#mensile").click(function(){
		// redraw chart with mensile data
        drawChart(generateChartData());
    });

    $("#annuo").click(function(){
        // redraw chart with annuo data
        drawChart(generateChartData());
    });
});

    var drawChart = function(data) {
        // reinit canvas
        $('#canvas_container').html(canvas_html);

        // redraw chart
        var ctx = document.getElementById("canvas").getContext("2d");
            window.myBar = new Chart(ctx).Line(data, { responsive : true })
    };