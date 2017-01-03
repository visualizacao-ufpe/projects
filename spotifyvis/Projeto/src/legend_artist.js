var margin = {top: 30, right: 30, bottom: 30, left:30},
    width = 300 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var svg3 = d3.select("body")
			.append("g")
			.append("svg")
			.attr("class","painel3")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
            //.attr("style","outline: thin solid red")
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			
var xScaleArtist = d3.scaleLinear()
        .domain([0,100])
        .range([0, width]);
    
var yScaleArtist = d3.scaleLinear()
        .domain([0,100])
		.range([height,100]);
//var color = d3.scaleOrdinal(d3.schemeCategory10);

function showLegend (artistInfo) {
	console.log("showLegend ",artistInfo);
	svg3.selectAll("rect").remove();
	svg3.selectAll("text").remove();
    svg3.selectAll("rect")
    	.data(artistInfo.musics)
    	.enter()
    	.append("rect")
    	.attr("x",5)
    	.attr("y",function(d,i){return yScaleArtist(i);})
    	.attr("fill",function(d,i){ return color(i);})
    	.attr("width", 20)
        .attr("height", 15);

    svg3.selectAll("text")
    	.data(artistInfo.musics)
    	.enter()
    	.append("text")
    	.text(function(d,i){return d.name;})
    	.attr("x",26)
    	.attr("y",function(d,i){return yScaleArtist(i)+13;})
		.attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "black");
}