var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var data_json = [];
var first_time = true;
var circleCliked = [];
var circleAlreadyCliked = [];

function onchangeTSNE(artistName) {
  //var artists = d3.select('select').property('value');
  selected_artist_position = data.indexOf(artistName);
  var artistInfo = data_json[selected_artist_position];
  draw(artistInfo);
};

var svg2 = d3.select("body")
			.append("g")
			.append("svg")
			.attr("class","painel2")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			//.attr("style","outline: thin solid red")
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
			.attr("style", "outline: thin solid black;") ;

var panel = svg2
			.append("rect")
			.attr("width", width)
			.attr("height", height)
			.attr("fill","white");

var svg4 = d3.select("body")
			.append("g")
			.append("svg")
			.attr("class","painel4")
			.attr("width", 50)
			.attr("height", height + margin.top + margin.bottom)
			//.attr("style","outline: thin solid red")
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

aux =[];
var circles_positions_anterior = [];
var artistInfo_anterior = "none";
var artistInfo_atual = "";
function draw(artistInfo,position,att_selec){
	aux.pop();
	artistInfo_atual = artistInfo.name;
	//console.log("Atual ",artistInfo_atual," Anterior ",artistInfo_anterior);
	var artists_data =[];
	if(first_time){
		artistInfo = data_json[selected_artist_position]
		console.log("Draw ",artistInfo);
		artistInfo = data_json[selected_artist_position].musics;
		for (var i =0;i<20;i++){
				 values = [];
				 values.push(artistInfo[i].energy);
				 values.push(artistInfo[i].danceability);
				 values.push(artistInfo[i].valence);
				artists_data.push(values);
			}
		first_time = false;
	}else{
		console.log("Draw ",artistInfo);
		d3.select("svg.painel2").selectAll("circle").remove();
		d3.select("svg.painel2").selectAll("text").remove();
		artistInfo = artistInfo.musics;
		for (var i =0;i<artistInfo.length;i++){
			 values = [];
			 values.push(artistInfo[i].energy);
			 values.push(artistInfo[i].danceability);
			 values.push(artistInfo[i].valence);
			 artists_data.push(values);
			}
	}

		//console.log("artists_data ",artists_data);
		var opt = {}
			opt.epsilon = 20; // epsilon is learning rate (10 = default)
			opt.perplexity = 9; // roughly how many neighbors each point influences (30 = default)
			opt.dim = 2; // dimensionality of the embedding (2 = default)
		var tsne = new tsnejs.tSNE(opt); // create a tSNE instance
		tsne.initDataRaw(artists_data);
		//tsne.initDataDist(artists_data);
		for(var k = 0; k < 9000; k++) {
		  tsne.step(); // every time you call this, solution gets better
		}

		var circles_positions =[];
		if(artistInfo_atual===artistInfo_anterior){
			circles_positions = circles_positions_anterior;
		}else {
			artistInfo_anterior = artistInfo_atual;
			circles_positions = tsne.getSolution(); 
			circles_positions_anterior = tsne.getSolution(); 
		}
		 // Y is an array of 2-D points that you can plot
		//console.log("Y ",circles_positions);

	var xScale = d3.scaleLinear()
        .domain([d3.min(circles_positions, function(d) { return d[0]; }), d3.max(circles_positions, function(d) { return d[0]; })])
        .range([0, width]);
    
    var yScale = d3.scaleLinear()
        .domain([d3.min(circles_positions, function(d) { return d[1]; }), d3.max(circles_positions, function(d) { return d[1]; })])
		.range([height,0]);

	 var tooltip = d3.select("body").append("div").attr("class", "toolTip");
	 var tooltip2 = d3.select("body").append("div").attr("class", "toolTip2"); 

		//var color = d3.scaleOrdinal(d3.schemeCategory10);
		var color = d3.scaleLinear().domain([0,1]).range(["#9fdfbf","#133926"])
        svg2.selectAll("circle") 
		   .data(circles_positions)
		   .enter()
		   .append("circle")
		   .attr("cx", function(d) {
		        return xScale(d[0]);
		   })
		   .attr("cy", function(d) {
		        return yScale(d[1]);
		   })
		   .attr("r", 15)
		   .attr("fill",function(d,i){
		   if(position==-1){
              var aux = artistInfo[i];
              	//console.log(">>>>>>>>>>>>>> ",color(aux[att_selec]), "valor ",aux[att_selec]);
            return color(aux[att_selec]);
            }
            return color.range()[1];
          })
		   .on("mousemove", function(d,i){  	
		   	tooltip
              .style("left", d3.event.pageX  + "px")
              .style("top", d3.event.pageY  + "px")
              .style("display", "inline-block")
              .style("background","none repeat scroll 0 0 #339966")
              .html(artistInfo[i].name);
          	})
		   .on("mouseout",  function(d){
		    tooltip.style("display", "none");}
		    );

		/*   .append("title").text(function(d,i) {
			         return artistInfo[i].name;
			});*/

			var info = data_json[selected_artist_position]
		   	aux.push(info.name);
		   //	console.log("AUX ",aux);
		   	svg4.selectAll("circle") 
		   		.data(aux)
				.enter()
				.append("circle")
		   		.attr("cx", function(d) {
		        return -11;
			  	 })
			   .attr("cy", function(d) {
			        return 358;
			  	 })
			   .attr("r", 9)
			   .attr("fill",function(d,i){
			   	//console.log(i,color(i));
			   	return "#3b5998 ";
			   	}).on("mousemove", function(d,i){  	
			   	tooltip2
	              .style("left", d3.event.pageX  + "px")
	              .style("top", d3.event.pageY -100 + "px")
	              .style("display", "inline-block")
	              .style("background","none repeat scroll 0 0 white")
	              .html("How close to each other are the <b>"+ aux[i] + "</b>' songs"+ "<br>" +
	              		"based on attributes presents on the parallel coordinates." +"<br>"+ 
	              		"We used the <b>tSNEJS algorithm</b> to calculate the positions of each songs"+"<br>"+
	              		"the <b>learning rate</b> used was 20 and 9 is how many <b>neighbors<b/> each point influences");
	          	})
			   .on("mouseout",  function(d){
			    tooltip2.style("display", "none");}
			    );

			svg4.selectAll("text").remove();

			svg4.append("text")
			    .attr("x",-15)
			    .attr("y",362)
			    .style("fill","white")
			    .style("font-style","italic")
			    .text("?").attr("fill",function(d,i){
			   	//console.log(i,color(i));
			   	return "#3b5998 ";
			   	})
			   .on("mousemove", function(d,i){  	
			   	tooltip2
	              .style("left", d3.event.pageX  + "px")
	              .style("top", d3.event.pageY -100 + "px")
	              .style("display", "inline-block")
	              .style("background","none repeat scroll 0 0 white")
	              .html("How close to each other are the <b>"+ aux[i] + "</b>' songs"+ "<br>" +
	              		"based on attributes presents on the parallel coordinates." +"<br>"+ 
	              		"We used the <b>tSNEJS algorithm</b> to calculate the positions of each songs"+"<br>"+
	              		"the <b>learning rate</b> used was 20 and 9 is how many <b>neighbors<b/> each point influences");
	          	})
			   .on("mouseout",  function(d){
			    tooltip2.style("display", "none");}
			    );

		   	svg2.selectAll("rect").on("click",function(a,b){

		   		circleCliked =[] ;
		   		circleAlreadyCliked =[];
				var circles = svg2.selectAll("circle");
					circles.attr("opacity", function(c,d){
					 		return 1;
					 	
				});
				var actives = ["danceability", "energy", "loudness", "acousticness", "instrumentalness", "liveness", "valence", "tempo"];
				var brushAll =  svg.selectAll(".brush").each(function(d,i) {
         	 		var aux = actives[i];
         	 		//console.log("aqui",i);
         	 		var bu = y[aux].brush;
         	 		d3.select(this).call(bu.move, null);
       			 });


				var actives = ["danceability", "energy", "loudness", "acousticness", "instrumentalness", "liveness", "valence", "tempo"];
					foreground.style("display", function(c,d) {
						//console.log("d ",d);
					  return actives.every(function(p, i) {
					  //	console.log("i",i);
					  	return true;
					    })  ? null : "none";
					     return actives;
					});
			});

			

			svg2.selectAll("circle").on("click",function(a,b){
				//console.log("ja tinha clicado em circleAlreadyCliked ",circleAlreadyCliked);

				circleCliked.push(b);
				//console.log("Cliquei em ",circleCliked);
				//console.log("circleCliked ",circleCliked);
				var circles = svg2.selectAll("circle");
					circles.attr("opacity", function(c,d){
						
					 	if(circleCliked.indexOf(d)>-1){
					 		return 1;
					 	}else{
					 		return 0.3;
					 	}
					 		
					});

					var circles = svg2.selectAll("circle");
					circles.attr("opacity", function(c,d){
						
					 	if(circleAlreadyCliked.indexOf(d)>-1 && circleCliked.indexOf(d)>-1){
					 		var aux = 0;
					 		for(var i =0;i<circleCliked.length;i++){
					 				if(circleCliked[i]===d){
					 					aux++;
					 				}
					 		}
					 		if(aux>1){
					 			for(var i =0;i<circleCliked.length;i++){
					 				if(circleCliked[i]===d){
					 					circleCliked[i] = 25;
					 				}
					 		}
					 			return 0.3;
					 		}
					 		return 1;
					 	}else if(circleCliked.indexOf(d)>-1){
					 		return 1;
					 	}
					 	return 0.3;
					 		
					});


					var actives = ["danceability", "energy", "loudness", "acousticness", "instrumentalness", "liveness", "valence", "tempo"];
					foreground.style("display", function(c,d) {
					  return actives.every(function(p, i) {
					  	if(circleCliked.indexOf(d)>-1){
					  	return true;
					  	} 
					    return false;
					    })  ? null : "none";
					     return actives;
					});

				for(var i =0;i<circleCliked.length;i++){
					circleAlreadyCliked.push(circleCliked[i]);
				}
			});
}

function set_opacity(musics_selected){
	var circles_selected = svg2.selectAll("circle");

	circles_selected.attr("opacity",function(c,i){
		if(musics_selected.indexOf(i)<0){
			return 0.2;
		}else {
			return 1;
		}
	});

}