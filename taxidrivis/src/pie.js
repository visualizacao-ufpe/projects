var marginPie = {top: 20, right: 20, bottom: 0, left: 0};
var wPie = 400 - marginPie.left - marginPie.right,
    wPieCenter = wPie / 2;
var hPie = 300 - marginPie.top - marginPie.bottom,
    hPieCenter = hPie / 2;
var tau = 2 * Math.PI;
var outerRadius = 120,
    innerRadius = 100;
var pieSvg;
var shouldBuildLegend = true;
var arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
var pieColorScale = d3.scaleOrdinal().domain([0,1,2,3,4,5,6,7,8,9]).range(d3.schemeCategory20);
var barWidth = 40;
var csv_path_Pie = "../assets/tlc/green/subset2.csv";
var arcsData = {};
var pieXAxis = false;
var pieYAxis = false;

function initPie() {
    pieSvg = d3.select("#piechart")
        .append("svg")
        .attrs({
            id : "pie",
            width : wPie + marginPie.left + marginPie.right,
            height: hPie + marginPie.top + marginPie.bottom,
            transform : "translate(" + marginPie.left + "," + marginPie.top + ")"
        })
        .attr("class", "pie")
        .append("g")
        .attr("transform", "translate(" + wPieCenter + "," + hPieCenter + ")");

    readPieData();
}

function readPieData() {
    if (!loaded) {
        d3.json(chosenCabCategory, function(error, data) {
            if (error) throw error;
            loadedData = data.slice();
            selectedData = loadedData.slice();
            loaded = true;
            renderPie();
        });
    } else {
        renderPie();
    }
}

function buildPieLegend() {
    shouldBuildLegend = false;
    var keys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    var pieLegendSVG = d3.select("#piechart")
        .append("svg")
        .attrs({
            id : "pieLegend",
            width : 100, height: 300,
            transform : "translate(" + marginPie.left + "," + marginPie.top + ")"
        })
        .attr("class", "pieLegend")
        .append("g")
        .attr("transform", "translate(" + marginPie.left + "," + marginPie.top + ")");

    pieLegendSVG
        .selectAll("#pieLegendRect").data(keys)
        .enter().append("rect")
        .attr("id", "pieLegendRect")
        .attr("x", 0)
        .attr("width", 10)
        .attr("height", 15)
        .attr("transform", function(d,i){ return "translate(0, " + i*25 + ")" })
        .style("fill", pieColorScale)

    pieLegendSVG
        .selectAll("#pieLegendText").data(keys)
        .enter().append("text")
        .attr("id", "pieLegendText")
        .attr("x", 15)
        .attr("width", 50)
        .attr("height", 15)
        .attr("transform", function(d,i){ return "translate(0, " + (i*25 + 15) + ")" })
        .text(d => d)
        .style("fill", pieColorScale);

}

function renderPie() {
    var tmp = selectedData.map(d => d.passenger_count);
    var data = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5:0, 6: 0, 7: 0, 8: 0, 9: 0};
    if (shouldBuildLegend) { buildPieLegend(); }

    for (var i = 0; i < tmp.length; i++) {
        var curr = tmp[i];
        for (var key in curr) {
            if (key > 0 && key < 10) data[key] += curr[key];
        }
    }
    arcsData = d3.pie()(Object.values(data));
    var keys = Object.keys(data);

    var pathBind = pieSvg.selectAll("#piePath").data(arcsData);
    pathBind.exit().remove();

    pathBind.enter().append("path")
        .attr("id", "piePath")
        .attr("d", arc)
        .style("fill", function(d, i){ return pieColorScale(i); });

    pathBind.transition()
        .duration(1000)
        .attr("id", "piePath")
        .attr("d", arc)
        .style("fill", function(d, i){ return pieColorScale(i); });
}

// function arcTween(newAngle) {
//     return function(d) {
//         var interpolate = d3.interpolate(d.endAngle, newAngle);
//         return function(t) {
//             d.endAngle = interpolate(t);
//             return arc(d);
//         }
//     }
// }
