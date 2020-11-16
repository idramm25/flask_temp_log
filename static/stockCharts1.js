window.onload = function () {
  var dataPoints = [];
  var stockChart = new CanvasJS.StockChart("chartContainer", {
    exportEnabled: true,
    title: {
      text:"StockChart with Line using JSON Data"
    },
    subtitles: [{
      text:"Total Temp DATA "
    }],
    charts: [{
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          valueFormatString: "MMM YYYY"
        }
      },
      axisY: {
        title: "Temperature",
        prefix: "",
        suffix: " C",
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          valueFormatString: "$#,###.00M",
        }
      },
      data: [{
        type: "line",
        xValueFormatString: "MMM YYYY",
        yValueFormatString: "$#,###.##M",
        dataPoints : dataPoints
      }]
    }],
    navigator: {
      slider: {
        minimum: new Date(2010, 00, 01),
        maximum: new Date(2020, 12, 01)
      }
    }
  });
  $.getJSON("templates/m_data_json", function(data) {
    for(var i = 0; i < data.length; i++){
      dataPoints.push({x: new Date(data[i].pub_date), y: Number(data[i].out_temp)});
    }
    console.log(dataPoints);
    stockChart.render();
  });
}