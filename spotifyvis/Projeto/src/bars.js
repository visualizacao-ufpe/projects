var margin = {top: 10, right: 30, bottom: 50, left: 30},
    w = (2*window.innerWidth/3) - margin.left - margin.right,
    h = 500 - margin.top - margin.bottom;


var texto = d3.select('body')
  .append("div")
  .append('text')
  .text(" View by ")
  .style("font-family","sans-serif");

var select3 = texto
     .append('select')
     .attr('class','select3')
     .on('change',onchange3);

var attrs_qual = ["key","mode","time_signature"];
 
 // Create crude SVG
var crudeSVG = d3.select("body").append("svg").attr("id","svgHisto");

// Set up svg dimensions
var svgHisto = crudeSVG
               .attr("width", w + margin.left + margin.right)
               .attr("height", h + margin.top + margin.bottom);

var xScale = d3.scaleBand().range([0, w]).padding(1),
    yScale = d3.scaleLinear().range([h, 0]);

var att_selec = "key";
var artist = 0;


var options3 = select3
  .selectAll('option')
  .data(attrs_qual)
  .enter()
  .append('option')
  .text(function (d) { return d; });

function onchange3() {
 
  drawBars (artist,att_selec)

}


function drawBars (artistInfo){

var att_selec = d3.select('select.select3').property('value');
     console.log("Histogram ",artistInfo,att_selec);
     artist = artistInfo;
     var data = [];
     var musics = artistInfo.musics;
     for(var i=0;i<musics.length;i++){
          var aux = artistInfo.musics[i];
          data.push(aux[att_selec]);
     }

var min = Math.min.apply(null, data);
var max = Math.max.apply(null, data);

var color = d3.scaleLinear().domain([min,max]).range(["#9fdfbf","#133926"]);

 var svgHisto = d3.select("#svgHisto");
    svgHisto.selectAll("g").remove();

xScale.domain(musics.map( d => d.name));
yScale.domain([0,d3.max(musics, function(d) { return d[att_selec] })]);

var hScale = d3.scaleLinear()
               .domain([0, d3.max(data)])
               .range([h, 0]);
// Create x axis
    var xAxis = d3.axisBottom(xScale);
    var bandwidth = xScale.range()[1]/xScale.domain().length
    var xAxisGroup = svgHisto.append("g")
    .attr("id","xAxis")
    .attr("transform","translate(" + marginPlot.right + "," + (heightPlot + marginPlot.top) + ")")
    .call(xAxis)
    .selectAll(".tick text")
    .call(wrap, bandwidth);

    // Create y axis
    var y_max = yScale.domain().slice(-1)[0];
    var yAxis = d3.axisLeft(yScale);
    var yAxisGroup = svgHisto.append("g")
    .attr("id","yAxis")
    .attr("transform","translate(" + margin.right + "," + margin.top +")")
    .call(yAxis.tickValues(d3.range(y_max + 1)));

     var histo = d3.select("body").select("#svgHisto").selectAll("rect");
 
     histo.remove(); 

    var bars = svgHisto.append("g")
    .attr("id","rect")
    .attr("transform","translate(" + marginPlot.right + "," + marginPlot.top + ")");
    
    histo = bars.selectAll("rect").data(data);
     
     histo
        .enter()
        .append("rect")
        .attr("x", function(d, i) {        
               return xScale(musics[i].name)-8;
        })
        .attr("y", function(d) {
               return hScale(d);
        })
        .attr("width", 15)
        .attr("height", function(d) {
          return h - hScale(d);
        })
        .attr("fill",function(d,i){
          return color(d);
        })
        .attr("opacity",function(d,i){
          return 1;
        }).append("title")
          .text(function(d,i) {
              return musics[i].name;
        });      

}

// Wrap text labels on x axis
function wrap(text, w) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1,
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > w) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}