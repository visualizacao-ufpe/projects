var margin = {top: 5, right: 30, bottom: 30, left:10},
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
			
var xScaleSubtitle = d3.scaleLinear()
        .domain([0,19])
        .range([0, width]);
    
var yScaleSubtitle = d3.scaleLinear()
        .domain([0,19])
		.range([height,10]);


function showLegend (artistInfo,position,att_selec) {
    //var color = d3.scaleOrdinal(d3.schemeCategory20);
	var color = d3.scaleLinear().domain([0,1]).range(["#9fdfbf","#133926"])
	console.log("showLegend ",artistInfo);
	svg3.selectAll("rect").remove();
	svg3.selectAll("text").remove();
    svg3.selectAll("rect")
    	.data(artistInfo.musics)
    	.enter()
    	.append("rect")
    	.attr("x",5)
    	.attr("y",function(d,i){return yScaleSubtitle(i);})
    	.attr("fill",function(d,i){
          if(position==-1){
              var aux = artistInfo.musics[i];
              //console.log("@@@@@@@@@@@@@@@@ ",color(aux[att_selec]), " valor ",aux[att_selec]);
            return  color(aux[att_selec]);
            }
            return color.range()[1];
          })
    	.attr("width", 20)
        .attr("height", 15);

    svg3.selectAll("text")
    	.data(artistInfo.musics)
    	.enter()
    	.append("text")
    	.text(function(d,i){return d.name;})
    	.attr("x",26)
    	.attr("y",function(d,i){return yScaleSubtitle(i)+13;})
		.attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "black");
}