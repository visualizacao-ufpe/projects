// Canvas dimensions varaibles

var widthForceGraph = window.innerWidth,
    heightForceGraph = 1000;

var artists =0;
var node = 0;

var labels = 0;
var format = d3.format(".3f");

function onchangePCArtist(artistName) {
  //var artists = d3.select('select').property('value');
  var att_selec = d3.select('select.select2').property('value');
  selected_artist_position = data.indexOf(artistName);
  var artistInfo = data_json[selected_artist_position];
  x.domain(dimensions = d3.keys(artistInfo.musics[0]).filter(function(d) {
        y[d] = d3.scaleLinear()
        .domain(d3.extent(artistInfo.musics, function(p) { return +p[d]; }))
        .range([height, 0]);
       return d != "name" && d != "id" && (y[d]) && d!="key" && d!= "time_signature" && d!= "mode" && d!="duration_ms";
  }));

 var color_blue = 0;
  if(att_selec==="none"){
     color_blue = selected_artist_position;
  }else {
    color_blue = -1;
  }
  coordinates(artistInfo,color_blue,att_selec);
  draw(artistInfo,color_blue,att_selec);
  showLegend(artistInfo,color_blue,att_selec);
  drawBars (artistInfo);

};

function onchangeTSNE(artistName) {
  //var artists = d3.select('select').property('value');
  selected_artist_position = data.indexOf(artistName);
  var artistInfo = data_json[selected_artist_position];
  draw(artistInfo);
};

// Change displayed albums accordingly to selected artist
function onChangePlotArtist(artistName) {
    //var artist = d3.select('#selectArtist').property('value')
    if(artistsList.indexOf(artistName) != -1) {

      selectedArtistPosition = artistsList.indexOf(artistName);

      updateDataset(selectedArtistPosition);

      if(d3.select("#boxplotRadio").property("checked")){
          drawBoxPlot(tracksByAlbum, albumsByArtist);
      } else {
          drawScatterplot(tracksByAlbum, albumsByArtist);
      }
    } else {
         if(d3.select("#boxplotRadio").property("checked")){
          drawBoxPlot(-3, -3);
      } else {
          drawScatterplot(-3, -3);
      }
      

    }
}

d3.select('body')
  .append("g")
  .append("h1")
  .text("Spotify Visualizer")
  //.style("font-size", "22px")
  //.style("dy", ".100em")
  .style("text-align","center")
  .style("font-family","sans-serif")
  .style("fill","#133926");

var svgForceGraph = d3.select("body")
    .append("g")
    .append("svg")
    //.attr("class", "container")
    .attr("width", widthForceGraph)
    .attr("height", heightForceGraph);

    //widthForceGraph = +svgForceGraph.attr("width");
   // heightForceGraph = +svgForceGraph.attr("height");


var panel = svgForceGraph.append("rect")
            .attr("width",1000)
            .attr("height",1000)
            .attr("opacity",0)
            .on("click",function(a,b){
            // var texts = svgForceGraph.selectAll("text").remove();
            var artist_name_selected = d3.select("text.artist_name").text();
            
            var texts = svgForceGraph.selectAll("text").attr("opacity", 1);
            var allNodes = svgForceGraph.selectAll("circle");
                allNodes.attr("opacity",1 );
                allNodes.style("stroke", function(d){
                  if(d.name===artist_name_selected){ //if he was previously selected
                    return "#DC143C";
                  }
                  if(artistsList.indexOf(d.name) != -1) {
                    return "black";
                  } else {
                    return "#fff"
                  }
                });

            svgForceGraph.selectAll("line").attr("opacity",1);
            svgForceGraph.selectAll("line").style("stroke","#999");
      });

var zoom = d3.zoom()
    .scaleExtent([1, 40])
    .translateExtent([[-100, -100], [widthForceGraph + 90, heightForceGraph + 100]])
    .on("zoom", zoomed);

var x = d3.scaleLinear()
    .domain([-1, widthForceGraph + 1])
    .range([-1, widthForceGraph + 1]);

var y = d3.scaleLinear()
    .domain([-1, heightForceGraph + 1])
    .range([-1, heightForceGraph + 1]);

var xAxis = d3.axisBottom(x)
    .ticks((widthForceGraph + 2) / (heightForceGraph + 2) * 10)
    .tickSize(heightForceGraph)
    .tickPadding(8 - heightForceGraph);

var yAxis = d3.axisRight(y)
    .ticks(10)
    .tickSize(widthForceGraph)
    .tickPadding(8 - widthForceGraph);

var radius = 25;
var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody().distanceMax((widthForceGraph/2)))
    .force("center", d3.forceCenter(widthForceGraph / 2, heightForceGraph / 2))
    .force("collision ",d3.forceCollide().radius(radius));  
/*var gX = svg.append("g")
    .attr("class", "axisx")
    .style("opacity",0)
    .call(xAxis);

var gY = svg.append("g")
    .attr("class", "axisy")
    .style("opacity",0)
    .call(yAxis);*/

svgForceGraph.call(zoom);

function zoomed() {
  var aux =  svgForceGraph.selectAll(".node");
  var lines  = svgForceGraph.selectAll("line");
  aux.attr("transform", d3.event.transform);
  lines.attr("transform", d3.event.transform);
/*  var circles = svgForceGraph.selectAll("circle");
  var lines  = svgForceGraph.selectAll("line");
  var texts = svgForceGraph.selectAll("text");
  circles.attr("transform", d3.event.transform);
  lines.attr("transform", d3.event.transform);
  texts.attr("transform", d3.event.transform);*/
/*  gX.call(xAxis.scale(d3.event.transform.rescaleX(x)));
  gY.call(yAxis.scale(d3.event.transform.rescaleY(y)));*/
}

var gen = ["british invasion", 
"album rock",
"christmas", 
"adult standards", 
"classic funk rock",
"reggae", 
"acoustic blues",
"motown", 
"alternative rock", 
"irish rock",
"classic rock",
"country christmas", 
"brill building pop",
"dance pop", 
"east coast hip hop",
"g funk", 
"hard rock", 
"art rock", 
"chicago soul", 
"country", 
"detroit hip hop",
"alternative country",
"blues", 
"alternative metal"];
var color_palette = ["#1E90FF",
"#4682B4",
"#00FFFF",
"#006400",
"#7B68EE",
"#FFFF00",
"#CD5C5C",
"#BC8F8F",
"#A0522D",
"#E9967A",
"#FF4500",
"#FF8C00",
"#FF1493",
"#FF00FF",
"#FA8072",
"#EEE8AA",
"#FFE4C4",
"#FF00FF",
"#32CD32",
"#708090",
"#D2691E",
"#EB1DC1",
"#1E90FF",
"#D8BFD8"]



var margin = {top: 30, right: 30, bottom: 30, left:30},
    width2 = 300 - margin.left - margin.right,
    height2 = 1500 - margin.top - margin.bottom;

var xScale = d3.scaleLinear()
        .domain([0,100])
        .range([0, width2]);
    
var yScale = d3.scaleLinear()
        .domain([0,100])
    .range([height2,10]);

var data = [];

d3.json("../../json/Artists_Links.json", function(error, graph) {

  var artists_features = [];
  for(var i = 0; i < graph.nodes.length; i++){
    var aux = graph.nodes[i];
    graph.nodes[i].x = graph.nodes[i].x +10 ;

    var average_features = [];
    var acousticness = 0;
    var danceability = 0;
    var energy = 0;
    var instrumentalness = 0;
    var liveness = 0;
    var speechiness = 0;
    var valence = 0;

    for(var j = 0; j < graph.nodes[i].musics.length; j++) {
      acousticness += graph.nodes[i].musics[j]['acousticness'];
      danceability += graph.nodes[i].musics[j]['danceability'];
      energy += graph.nodes[i].musics[j]['energy'];
      instrumentalness += graph.nodes[i].musics[j]['instrumentalness'];
      liveness += graph.nodes[i].musics[j]['liveness'];
      speechiness += graph.nodes[i].musics[j]['speechiness'];
      valence += graph.nodes[i].musics[j]['valence'];
    }

    var mean_acousticness = acousticness / graph.nodes[i].musics.length;
    var mean_danceability = danceability / graph.nodes[i].musics.length;
    var mean_energy = energy / graph.nodes[i].musics.length;
    var mean_instrumentalness = instrumentalness / graph.nodes[i].musics.length;
    var mean_liveness = liveness / graph.nodes[i].musics.length;
    var mean_speechiness = speechiness / graph.nodes[i].musics.length;
    var mean_valence = valence / graph.nodes[i].musics.length;

    average_features.push({feature: 'acousticness', value: mean_acousticness});
    average_features.push({feature: 'danceability', value: mean_danceability});
    average_features.push({feature: 'energy', value: mean_energy});
    average_features.push({feature: 'instrumentalness', value: mean_instrumentalness});
    average_features.push({feature: 'liveness', value: mean_liveness});
    average_features.push({feature: 'speechiness', value: mean_speechiness});
    average_features.push({feature: 'valence', value: mean_valence});

    average_features.sort(function(a,b) {
      return b.value - a.value;
    });

    var artist_feature = {
      'position': graph.nodes[i].position,
      'average_features': average_features
    }
    artists_features.push(artist_feature);
  }
  console.log(artists_features);

  var artist_Colors = [];
  var link = svgForceGraph.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
    .style("stroke-width", function(d) { return Math.sqrt(d.value)+2; })
    .style("stroke","#999")
    .style("stroke-opacity", 0.6);

var tooltipNode = d3.select("body").append("div").attr("class", "toolTipNode"); 


 var node = svgForceGraph.selectAll(".node")
    .data(graph.nodes)
    .enter().append("g")
    .attr("class", "node");

var artists = node.append("circle")
  .attr("r", 10)
  .style("fill", function(d,i) {
      var position = gen.indexOf(d.genres[0]);
      //console.log(d.name,d.genres[0],position, color_palette[position]);
      artist_Colors.push(color_palette[position]);
      return color_palette[position];
   })
  .style("stroke", function(d) {
    if(d.name==="The Beatles"){
      return "#DC143C";
    }
    if(artistsList.indexOf(d.name) != -1) {
        return "black";
      } else {
        return "#fff"
      }
  })
  .style("stroke-width", 2);

 var labels =  node.append("g").append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(function(d) { return d.name });

  /*      
  var labelAlbums = node.append("g").append("text")
    .attr("font-family", "sans-serif")
    .attr("font-size", 11)
    .attr("dx", -4)
    .attr("dy", ".35em")
    .text(function(d) {
      if(artistsList.indexOf(d.name) != -1) {
        return "A";
      }
    })
    */
    


/*  var node = svgForceGraph.append("g")
      .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter().append("circle")
      .attr("r", 10)
      .style("fill", function(d,i) { artist_Colors.push(color(i));return color(i); })
      .style("stroke", "#fff")
      .style("stroke-width", 2)
     .on("mousemove", function(d,i){    
          tooltipNode
                .style("left", d3.event.pageX  + "px")
                .style("top", d3.event.pageY  + "px")
                .style("display", "inline-block")
                .style("background","none repeat scroll 0 0" +color(i) )
                .html(d.name);
              })
         .on("mouseout",  function(d){
          tooltipNode.style("display", "none");});*/

var links = graph.links;
var neighbors_id =[]
svgForceGraph.selectAll("circle")
.on("contextmenu", function() 
	{
		d3.event.stopPropagation();
		d3.event.preventDefault();
	})
.on("mousemove", function(d,i) {
  var tooltip_feature_name = artists_features.find(obj => obj.position == d.position).average_features[0].feature;
  var tooltip_feature_value = artists_features.find(obj => obj.position == d.position).average_features[0].value;
  tooltipNode
  .style("left", d3.event.pageX + "px")
  .style("top", d3.event.pageY  + "px")
  .style("display", "inline-block")
  .style("background","none repeat scroll 0 0" + artist_Colors[i])
  .html("<b>" + tooltip_feature_name + ":</b> " + format(tooltip_feature_value));
})
.on("mouseout", function() {
  tooltipNode.style("display", "none");
})
.on("click", function(d) {
  var texts = svgForceGraph.selectAll("text").attr("opacity", 1);
    var allNodes = svgForceGraph.selectAll("circle");
        allNodes.attr("opacity",1 );
        allNodes.style("stroke", function(aux) {
        if(artistsList.indexOf(aux.name) != -1) {
          return "black";
        } else {
          return "#fff"
        }
      });

    svgForceGraph.selectAll("line").attr("opacity", 1);
    svgForceGraph.selectAll("line").style("stroke", "#999");
    
    allNodes = svgForceGraph.selectAll("circle");
    allNodes.style("stroke", function(aux) {
      console.log(d.id === aux.id);
     if(aux.id === d.id) {
        return "DC143C";
      }
      if(artistsList.indexOf(aux.name) != -1) {
        return "black";
      } else {
        return "#fff"
      }
    });

    onchangePCArtist(d.name);
    //onchangeTSNE(d.name);
    //onchange2();
    onChangePlotArtist(d.name);
  })
.on("mousedown", function(a,b) {
  if(d3.event.button == 2) { //0 esquerdo 1 meio 2 direito
    neighbors_id =[];
    var id = a.id;
    var mygroup = a.group;

    for(var i = 0; i < links.length; i++) {
          var node_aux = links[i];
          var source = node_aux.source;
          var target = node_aux.target;
          if(source.id ===id) {
            neighbors_id.push(target.id);
          }
    }

    var allNodes = svgForceGraph.selectAll("circle");
    allNodes.attr("opacity", function(aux) {
      if(neighbors_id.indexOf(aux.id) > -1) {
            return 1;
      } else if(aux.id === id) {
        return 1;
      }
      return 0.3;
    });

    allNodes.style("stroke", function(aux) {
      if(neighbors_id.indexOf(aux.id) > -1) {
            if(artistsList.indexOf(aux.name) != -1) {
              return "black";
            } else {
              return "#fff"
            }
      } else if(aux.id === id) {
        return "#DC143C";
      }
      if(artistsList.indexOf(aux.name) != -1) {
        return "black";
      } else {
        return "#fff"
      }
    });

    svgForceGraph.selectAll("line").style("stroke", function(link) {
        var source = link.source.id;
        var target = link.target.id;
        if(neighbors_id.indexOf(target) > -1 && source == id) {
            return "#ff0000";
        }
          return"#999";
    });

    svgForceGraph.selectAll("line").attr("opacity", function(link) {
        var source = link.source.id;
        var target = link.target.id;
        if(neighbors_id.indexOf(target) > -1 || source.id == id) {
            return 1;
        }
        return 0.3;
    });

    svgForceGraph.selectAll("text").attr("opacity", function(entrada) {
        if(neighbors_id.indexOf(entrada.id) > -1  || entrada.id === id) {
            return 1;
        }
        return 0.2;
    });

    onchangePCArtist(a.name);
    //onchangeTSNE(a.name);
    //onchange2();
    onChangePlotArtist(a.name);
  /* var texts = svgForceGraph.selectAll("text").remove();
  var array = graph.nodes;
  var array1 = [];
  var root = [];
    for(var i = 0; i < array.length; i++){
      if(neighbors_id.indexOf(array[i].id) > -1) {
      } else if(array[i].id == id) {
        root.push(array[i]);
      }else{
        array1.push(array[i]);
      }
    }
    var array1 = array1.concat(root);

    svgForceGraph.selectAll(".node")
    .data(array1)
    .enter()
    .append("text")
    .attr("dx", 12)
    .attr("dy", ".35em")
    .text(function(d) { return d.name });*/

  }
}).call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  /*node.append("title")
      .text(function(d) { return d.name; });*/

     /* svgForceGraph.selectAll("line").on("click",function(a,b){
        var texts = svgForceGraph.selectAll("text").remove();

        var allCircles = svgForceGraph.selectAll("circle");
            allCircles.attr("opacity",1 );
            allCircles.style("stroke","#fff" );

      svgForceGraph.selectAll("line").attr("opacity",1);
      svgForceGraph.selectAll("line").style("stroke","#999");

      })*/;

  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.links);

  function ticked() {
    artists.attr("cx", function(d) { return d.x = Math.max(radius, Math.min(widthForceGraph - radius, d.x)); })
        .attr("cy", function(d) { return d.y = Math.max(radius, Math.min(heightForceGraph - radius, d.y)); });

    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
  labels.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  //labelAlbums.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  }
});

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

