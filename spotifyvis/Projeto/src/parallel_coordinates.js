var margin = {top: 20, right: 20, bottom: 0, left: 20},
    width = 960 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

var x =  d3.scalePoint().range([0, width]).padding(0.5),
    y = {},
    dragging = {};

var musics_selected = [];
var music_notSelected = [];
var selected_artist_position = 0;
var data = ["The Beatles","Bob Dylan","Elvis Presley","The Rolling Stones","Chuck Berry","Jimi Hendrix","James Brown","Little Richard","Aretha Franklin","Ray Charles","Bob Marley & The Wailers","The Beach Boys", 
"Buddy Holly","Led Zeppelin","Stevie Wonder","Sam Cooke","Muddy Waters","Marvin Gaye","The Velvet Underground","Bo Diddley","Otis Redding","U2","Bruce Springsteen","Jerry Lee Lewis",  
"Fats Domino","Ramones","The Clash","The Who","Nirvana","Johnny Cash","Smokey Robinson","The Everly Brothers","Neil Young","Michael Jackson","Madonna","Roy Orbison","John Lennon", 
"David Bowie","Simon & Garfunkel","The Doors","Van Morrison","Sly Stone","Public Enemy","The Byrds","Janis Joplin","Patti Smith","Run-D.M.C.","Elton John","The Band","Pink Floyd",
"Queen","The Allman Brothers Band" ,"Howlin Wolf","Eric Clapton","Dr. Dre","Grateful Dead","Funkadelic Parliament","Aerosmith","The Sex Pistols","Metallica","Joni Mitchell",
"Tina Turner","Phil Spector","The Kinks","Al Green","Cream","The Temptations","Jackie Wilson","The Police","Frank Zappa","AC/DC","Radiohead","Hank Williams","Eagles","The Shirelles",
"Beastie Boys","The Stooges","Four Tops","Elvis Costello","The Drifters","Creedence Clearwater Revival","Eminem","James Taylor","Black Sabbath","2Pac","Gram Parsons",
"Jay Z","The Yardbirds","Carlos Santana","Tom Petty","Guns N' Roses","Booker T. & the M.G.s","Nine Inch Nails","Lynyrd Skynyrd","The Supremes","R.E.M.","Curtis Mayfield","Carl Perkins","Talking Heads"];
var attrs =["none","danceability", "energy", "loudness", "acousticness", "instrumentalness", "liveness", "valence", "tempo"];
      
var data_json = [];
/*
var select = d3.select('body')
  .append("div")
  .append('select')
    .attr('class','select')
    .on('change', onchange)

var options = select
  .selectAll('option')
  .data(data).enter()
  .append('option')
    .text(function (d) { return d; });
*/
var textoArtist = d3.select('body')
  .append("g")
  .append("text")
  .attr("class","artist_name")
  .text("The Beatles:")
  .style("font-size", "22px")
  .style("dy", ".100em")
  .style("font-family","sans-serif")
  .style("fill","#133926");

var texto = d3.select('body')
  .append("div")
  .append('text')
  .text(" Color by ")
  .style("font-family","sans-serif");

var select2 = d3.select('body')
  .select("div")
  .append('select')
    .attr('class','select2')
    .on('change',onchange2)

var options2 = select2
  .selectAll('option')
  .data(attrs).enter()
  .append('option')
    .text(function (d) { return d; });

var line = d3.line(),
    axis = d3.axisLeft(),
    background,
    foreground;

var svg = d3.select("body").append("svg")
    .attr("class", "container")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    //.attr("style","outline: thin solid red")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
/*
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

};
*/
function onchange2() {
  //var artists = d3.select('select').property('value');
  var att_selec = d3.select('select.select2').property('value');
  //console.log("Selecionado foi ",att_selec);
  //selected_artist_position = data.indexOf(artists);
  var artistInfo = data_json[selected_artist_position];
  //x.domain(dimensions = d3.keys(artistInfo.musics[0]).filter(function(d) {
  //      y[d] = d3.scaleLinear()
  //      .domain(d3.extent(artistInfo.musics, function(p) { return +p[d]; }))
  //      .range([height, 0]);
  //     return d != "name" && d != "id" && (y[d]) && d!="key" && d!= "time_signature" && d!= "mode" && d!="duration_ms";
  //}));

  var color_blue = 0;
  if(att_selec==="none"){
     color_blue = selected_artist_position;
  }else {
    color_blue = -1;
  }
  coordinates(artistInfo,color_blue,att_selec);
  draw(artistInfo,color_blue,att_selec);
  showLegend(artistInfo,color_blue,att_selec);
  drawBars (artistInfo)
};

var atts = ["danceability","energy","loudness","speechiness","acousticness","instrumentalness","liveness","valence","tempo"];
  

d3.json("../../json/Base_Artist_20_Musics_Feature.json", function(error, Base_Artist_20_Musics_Feature){

    for(var i =0;i<Base_Artist_20_Musics_Feature.artists_20_musics.length;i++){
      data_json.push(Base_Artist_20_Musics_Feature.artists_20_musics[i]);
    }


    for(var k =0;k<data_json.length;k++){ //para cada artista
     // console.log("------------------- No for--------------------");
      var data = data_json[k].musics;
    //  console.log("DATA ",data);
      var MaxAtt = [];
      var MinAtt =[];
      for(var j=0;j<atts.length;j++){ //para cada att dessa lista
            var min = Number.MAX_VALUE;
            var max = Number.MIN_VALUE;
            var attActual = atts[j];
            //console.log(attActual);
            for(var i =0;i<data.length;i++){
              var linha = data[i];
             // console.log(" linha ",linha," data atual ",linha[attActual], " max ",max, " min ",min);
              var atual = linha[attActual];
              if(atual>max){
                max = atual;
              }
              if(atual<min){
                min = atual;
              }
              
            }
            MaxAtt.push(max);
            MinAtt.push(min);
          }

       for(var i =0;i<data.length;i++){
          var linha = data[i];
         // console.log("Antes ",linha);
          for (var j=0;j<9;j++){
            var attActual = atts[j];
            linha[attActual] = (linha[attActual] - MinAtt[j])/(MaxAtt[j]-MinAtt[j]);
          }
          //console.log("Depois ",linha);
        }

    }



// Extract the list of dimensions and create a scale for each.
  x.domain(dimensions = d3.keys(Base_Artist_20_Musics_Feature.artists_20_musics[selected_artist_position].musics[0]).filter(function(d) {
        y[d] = d3.scaleLinear()
        .domain(d3.extent(Base_Artist_20_Musics_Feature.artists_20_musics[selected_artist_position].musics, function(p) { return +p[d]; }))
        .range([height, 0]);
    return d != "name" && d != "id" && (y[d]) && d!="key" && d!= "time_signature" && d!= "mode" && d!="duration_ms";
  }));


var artistInfo =  Base_Artist_20_Musics_Feature.artists_20_musics[selected_artist_position];

    coordinates(artistInfo,selected_artist_position,"none");
    draw(artistInfo,selected_artist_position,"none");
    showLegend(artistInfo,selected_artist_position,"none");
    drawBars (artistInfo)
});

function coordinates (artistInfo,position,att_selec){
//var color = d3.scaleOrdinal(d3.schemeCategory10);
  //change artist name on html
  var artist_name_selected = d3.select("text.artist_name");
  artist_name_selected.text(artistInfo.name + ":");

var color = d3.scaleLinear().domain([0,1]).range(["#9fdfbf","#133926"])
  console.log("Entrada ",artistInfo, " position ",position, " att_selec ",att_selec);
  // Add grey background lines for context.
  svg.selectAll("g").remove();

 background = svg.append("g")
        .attr("class", "background")
        .selectAll("path")
          .data(artistInfo.musics)
        .enter().append("path")
          .attr("d", path)
          .attr("fill","none")
          .attr("stroke",function(d,i){
            //console.log(artistInfo.musics[i]);
            if(position==-1){
              var aux = artistInfo.musics[i];
              //console.log("******************** ",color(aux[att_selec]), " valor ",aux[att_selec]);
            return  color(aux[att_selec]);
            }
            return color(1);
          })
          .attr("shape-rendering","crispEdges")
          .attr("opacity",0.2);


    // Add blue foreground lines for focus.
    foreground = svg.append("g")
        .attr("class", "foreground")
      .selectAll("path")
        .data(artistInfo.musics)
      .enter().append("path")
        .attr("d", path)
        .attr("fill","none")
        .attr("stroke",function(d,i){
            if(position==-1){
               var aux = artistInfo.musics[i];
                return  color(aux[att_selec]);
            }
            return color(1);
        });

  // Add a group element for each dimension.
     var g = svg.selectAll(".dimension")
        .data(dimensions)
        .enter().append("g")
        .attr("class", "dimension")
        .attr("transform", function(d) { return "translate(" + x(d) + ")"; });
      /*  .call(d3.drag()
          .subject(function(d) { return {x: x(d)}; })
          .on("start", function(d) {
            dragging[d] = x(d);
            background.attr("visibility", "null");
          })
          .on("drag", function(d) {
            dragging[d] = Math.min(width, Math.max(0, d3.event.x));
            foreground.attr("d", path);
            dimensions.sort(function(a, b) { return position(a) - position(b); });
            x.domain(dimensions);
            g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
          })
          .on("end", function(d) {
            delete dragging[d];
            transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
            transition(foreground).attr("d", path);
            background
                .attr("d", path)
              .transition()
                .delay(500)
                .duration(0)
                .attr("visibility", null);
          }));*/

    // Add an axis and title.
    g.append("g")
        .attr("class", "axis")
        .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
      .append("text")
        .style("text-anchor", "middle")
        .attr("y", -9)
        .text(function(d) { return d; });

    // Add and store a brush for each axis.
    g.append("g")
        .attr("class", "brush")
        .each(function(d) {
          d3.select(this).call(y[d].brush = d3.brushY().extent( [ [-8, y[d].range() [1]], [8, y[d].range() [0]] ] ).on("start", brushstart).on("end", brush));
          //d3.select(this).call(d3.brushY().move, [0, 0])
        })
}

function position(d) {
  var v = dragging[d];
  return v == null ? x(d) : v;
}

function transition(g) {
  return g.transition().duration(500);
}

// Returns the path for a given data point.
function path(d) {
  return line(dimensions.map(function(p) { return [position(p), y[p](d[p])]; }));
}

function brushstart() {
  //d3.event.sourceEvent.stopPropagation();
}

// Handles a brush event, toggling the display of foreground lines.
function brush() {
  var positionParallel = [];
  var actives = dimensions.filter(function(p,i) {
    var allBrushElement = d3.selectAll(".brush");
    var prim = allBrushElement._groups;
    var q = prim[0];

    if(d3.brushSelection(q[i])!=null){
     //console.log("position",i,"retorno foi ",false);
      positionParallel.push(i);
      return true;
    }
      //console.log("position",i,"retorno foi ",true);
      return false;
  });

  var  extents = actives.map(function(p,i) { 
    var allBrushElement = d3.selectAll(".brush");
    var prim = allBrushElement._groups;
    var q = prim[0];
    var position = positionParallel[i];
    var brushActual = d3.brushSelection(q[position]);
    var y0 = y[p].invert(brushActual[0]);
    var y1 = y[p].invert(brushActual[1]);
    return  [y1,y0];  
  });

  music_notSelected = [];
  musics_selected = [];
 foreground.style("display", function(d,j) {
  return actives.every(function(p, i) {
      if(!(extents[i][0] <= d[p] && d[p] <= extents[i][1])){
          music_notSelected.push(j);
      }
      return extents[i][0] <= d[p] && d[p] <= extents[i][1];
    })  ? null : "none";
     return actives;
  });

  for(var i =0 ; i<20 ;i++){
    if(music_notSelected.indexOf(i)<0){
      musics_selected.push(i);
    }
  }

  set_opacity(musics_selected);

}