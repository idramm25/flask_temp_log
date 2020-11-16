window.onload = function () {
  var dataPoints1 = [], dataPoints2 = [];
  var stockChart = new CanvasJS.StockChart("chartContainer",{
    theme: "light2",
    charts: [{
      title: {
        text: "Bitcoin Price in USD"
      },
      axisY: {
        prefix: "$"
      },
      data: [{
        type: "line",
        yValueFormatString: "$#,###.##",
        dataPoints : dataPoints1
      }]
    },
    {
      title: {
        text: "Bitcoin Volume"
      },
      data: [{
        dataPoints : dataPoints2
      }]
    }],
    navigator: {
      data: [{
        dataPoints: dataPoints2
      }],
      slider: {
        minimum: new Date(2018, 05, 01),
        maximum: new Date(2018, 09, 01)
      }
    }
  });
  $.getJSON("https://canvasjs.com/data/docs/btcusd2018.json", function(data) {
    for(var i = 0; i < data.length; i++){
      dataPoints1.push({x: new Date(data[i].date), y: [Number(data[i].open), Number(data[i].high), Number(data[i].low), Number(data[i].close)]});
      dataPoints2.push({x: new Date(data[i].date), y: Number(data[i].volume_btc)});
    }
    stockChart.render();
  });
}