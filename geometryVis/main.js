var width = 900;
var height = 500;

var pointradius = 3.5;
var pointcolor = "#FABC3C";

var vectorcolor = "#20a4f3";
var vectorstrokewidth = 2.5;
var arrowsize = 2.3;

var linecolor = "#ff4557";
var linestrokewidth = 2;

var directorvectorcolor = "#f2833e";
var directorvectorstrokewidth = 2.1;

var tooltipcolor = "#0070A0";
var tooltipsize = "15px";

// 100.1 makes the left line appear to close the
var domainx = [0,100.1];
var domainy = [0,(height/width)*100];

var objects = [];

///////////////////////////////

//Create SVG element
var svg = d3.select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("float", "left")
      .attr("margin-bottom", "20px");

var g = svg.append("g")
      .attr("width", width)
      .attr("height", height);

var xScale = d3.scaleLinear().range([0, width]);
var yScale = d3.scaleLinear().range([height, 0]);
// var xScale = d3.scaleLinear().range([-width/2, width/2]);
// var yScale = d3.scaleLinear().range([-height/2, height/2]);

xScale.domain(domainx);
yScale.domain(domainy);

var zoom = d3.zoom()
    .scaleExtent([.2, 50])
    // .translateExtent([[-100, -100], [width + 100, height + 100]])
    .on("zoom", zoomed);

// axis
var xAxis = d3.axisBottom(xScale)
    .ticks((width + 2) / (height + 2) * 8)
    .tickSize(height)
    .tickPadding(8 - height);


var yAxis = d3.axisRight(yScale)
    .ticks(8)
    .tickSize(width)
    .tickPadding(8 - width);


var gX = svg.append("g")
    .attr("class", "axis axis--x")
    .call(xAxis);

var gY = svg.append("g")
    .attr("class", "axis axis--y")
    .call(yAxis);


// //
// // tem que corrigir pq so ta pegando com esses dois retangulos aqui
// //
var view = svg.append("rect")
        .attr("width", width*2)
        .attr("height", height*2)
        .style("fill", "none");
        // .style("pointer-events", "all");

var view = svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width*2)
        .attr("height", height*2)
        .style("fill", "none");
        // .style("pointer-events", "all");


svg.call(zoom);


// fixed axis on zero
g.append("line")
  .attr("x1", xScale(0))
  .attr("y1", yScale(-height))
  .attr("x2", xScale(0))
  .attr("y2", yScale(height))
  .attr("stroke", "black")
  .attr("stroke-width", 2.4);

// fixed axis on zero
g.append("line")
  .attr("x1", xScale(-width))
  .attr("y1", yScale(0))
  .attr("x2", xScale(width))
  .attr("y2", yScale(0))
  .attr("stroke", "black")
  .attr("stroke-width", 2.4);


// define arrow for vectors
svg.append("svg:defs").append("svg:marker")
    .attr("id", "triangle")
    .attr("refX", arrowsize)
    .attr("refY", arrowsize)
    .attr("markerWidth", 5*arrowsize)
    .attr("markerHeight", 5*arrowsize)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 "+ 2*arrowsize +
               " " + arrowsize + " 0 " + 2*arrowsize +
               " " + arrowsize/2 + " " + arrowsize)
    .style("fill", vectorcolor);

// define arrow for director vectors
svg.append("svg:defs").append("svg:marker")
    .attr("id", "triangle2")
    .attr("refX", arrowsize)
    .attr("refY", arrowsize)
    .attr("markerWidth", 5*arrowsize)
    .attr("markerHeight", 5*arrowsize)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 "+ 2*arrowsize +
               " " + arrowsize + " 0 " + 2*arrowsize +
               " " + arrowsize/2 + " " + arrowsize)
    .style("fill", directorvectorcolor);


// tooltip configs
var tooltip = d3.select("body")
  	.append("div")
  	.style("position", "absolute")
  	.style("z-index", "0")
    .style("font-size",tooltipsize)
    // .style("font-weight", "bold")
    .style("background-color", "snow")
    .style("padding", "1px 6px 1px 6px")
    .style("border-radius", "8px")
    .style("color", tooltipcolor)
    .style("font-family", "monospace")
    .style("opacity", ".82")
  	.style("visibility", "hidden");

///////////////////////////////////////////////////

// botoes aqui

///////////////////////////////////////////////////

function zoomed() {
  gX.call(xAxis.scale(d3.event.transform.rescaleX(xScale)));
  gY.call(yAxis.scale(d3.event.transform.rescaleY(yScale)));
  // view.attr("transform", d3.event.transform);
  g.attr("transform", d3.event.transform);
}

function resetzoom() {
  svg.transition()
      .duration(750)
      .call(zoom.transform, d3.zoomIdentity);
}


//////////////////////////////////////////////////
//////////////////////////////////////////////////

// find an object by id
function findobject(id) {
  var v = null;
  for (var i = 0; i < objects.length; i++) {
    if (objects[i].id == id) {
      v = objects[i];
      break;
    }
  }
  return {"object":v, "index":i};
}

// put a new object in memory
function saveobject(x) {
  var fnd = findobject(x.id);
  var p = fnd.object;
  var index = fnd.index;
  if(p) {
    objects.splice(index,1);
  }
  objects.push(x);
}

// reset all objects from memory
function resetmemory() {
  location.reload();
  // objects = [];
  // g.selectAll("line.vector2d").remove();
  // g.selectAll("line.line2d").remove();
  // g.selectAll("circle.point2d").remove();
}

////////////////////////////////////////////////////

function displaypoint2d(p) {
  g.append("circle")
    .attr("class", "point2d")
    .attr("cx", xScale(p.x))
    .attr("cy", yScale(p.y))
    .attr("r", pointradius)
    .attr("fill", pointcolor)
    .on("mouseover", function(d) {
      return tooltip.style("visibility", "visible");
    })
  	.on("mousemove", function(d) {
      return tooltip.style("top", (event.pageY-15)+"px")
                    .style("left",(event.pageX+15)+"px")
                    .text(p.toString());
    })
  	.on("mouseout", function(d) {
      return tooltip.style("visibility", "hidden");
    });

}

///////////////////////////////////////////////////

function newpoint2d(id, xx, yy) {
  p = new Point2d(id, Number(xx), Number(yy));
  saveobject(p);
  displaypoint2d(p);
  return p;
}

// distance between points
function distpoint2d(id1, id2) {
  var p1 = findobject(id1).object;
  var p2 = findobject(id2).object;
  var dist = op_dist(p1,p2);

  console.log("Distancia entre os pontos: ", dist);
  return dist;
}

///////////////////////////////////////////////////

function displayvector2d(v) {
  g.append("line")
    .attr("class", "vector2d")
    .attr("x1", xScale(0))
    .attr("y1", yScale(0))
    .attr("x2", xScale(v.x))
    .attr("y2", yScale(v.y))
    .attr("stroke", vectorcolor)
    .attr("stroke-width", vectorstrokewidth)
    .attr("marker-end", "url(#triangle)")
    .on("mouseover", function(d) {
      return tooltip.style("visibility", "visible");
    })
  	.on("mousemove", function(d) {
      return tooltip.style("top", (event.pageY-15)+"px")
                    .style("left",(event.pageX+15)+"px")
                    .text(v.toString());
    })
  	.on("mouseout", function(d) {
      return tooltip.style("visibility", "hidden");
    });
}

///////////////////////////////////////////////////

function newvector2d(id, xx, yy) {
  v = new Vector2d(id, Number(xx), Number(yy));
  saveobject(v);
  displayvector2d(v);
  return v;
}

// soma de vetores
function sumvector2d(id, id1, id2) {
  var v1 = findobject(id1).object;
  var v2 = findobject(id2).object;

  // returns an object
  var v = op_sum(v1,v2);
  v.set_id(id);

  saveobject(v);
  displayvector2d(v);
  return v;
}

// subtracao de vetores
function diffvector2d(id, id1, id2) {
  var v1 = findobject(id1).object;
  var v2 = findobject(id2).object;

  // returns an object
  var v = op_diff(v1,v2);
  v.set_id(id);

  saveobject(v);
  displayvector2d(v);
  return v;
}

// norma do vetor
function normvector2d(id) {
  var v = findobject(id).object;
  var norm = op_norm(v);

  // tem que trocar aqui pelo console novo
  console.log("Norma do vetor: ", norm)
  return norm;
}

// produto escalar
function dotvector2d(id1, id2) {
  var v1 = findobject(id1).object;
  var v2 = findobject(id2).object;
  var dot = op_dot(v1,v2);

  // tem que trocar aqui pelo console novo
  console.log("Produto escalar dos vetores: ", dot)
  return dot;
}

// multiplicacao por escalar
function multvector2d(id, id1, scalar) {
  var v = findobject(id1).object;

  var vv = op_scalar_mult(v, scalar);
  vv.set_id(id);

  saveobject(vv);
  displayvector2d(vv);
  return vv;
}

// divisao por escalar
function divvector2d(id, id1, scalar) {
  var v = findobject(id1).object;

  var vv = op_scalar_div(v, scalar);
  vv.set_id(id);

  saveobject(vv);
  displayvector2d(vv);
  return vv;
}

// projecao de um vetor no outro
function projvector2d(id, id1, id2) {
  var v1 = findobject(id1).object;
  var v2 = findobject(id2).object;

  // returns an object
  var v = op_projection(v1,v2);
  v.set_id(id);

  saveobject(v);
  displayvector2d(v);
  return v;
}

// cosseno entre dois vetores
function cosvector2d(id1, id2) {
  var v1 = findobject(id1).object;
  var v2 = findobject(id2).object;
  var cos = op_cossine(v1,v2);

  console.log("Cosseno entre os vetores: ", cos);
  return cos;
}

// angulo em radianos entre dois vetores
function anglevector2d(id1, id2) {
  var v1 = findobject(id1).object;
  var v2 = findobject(id2).object;
  var ang = op_angle(v1,v2);

  console.log("Angulo (em radianos) entre os vetores: ", ang);
  return ang;
}

///////////////////////////////////////////

function displaydirectionvector2d(line) {
  var x2,y2;
  // tem que fazer ainda
  g.append("line")
    .attr("class", "vector2d")
    .attr("x1", xScale(0))
    .attr("y1", yScale(0))
    .attr("x2", xScale(x2))
    .attr("y2", yScale(y2))
    .attr("stroke", directorvectorcolor)
    .attr("stroke-width", directorvectorstrokewidth)
    .attr("marker-end", "url(#triangle2)");
}

function displayline2d(line) {
  var x1,x2,y2,y2;
  x1 = -1000;
  x2 = 1000;
  y1 = line.opts.m * x1 + line.opts.b;
  y2 = line.opts.m * x2 + line.opts.b;

  g.append("line")
    .attr("class", "line2d")
    .attr("x1", xScale(x1))
    .attr("y1", yScale(y1))
    .attr("x2", xScale(x2))
    .attr("y2", yScale(y2))
    .attr("stroke", linecolor)
    .attr("stroke-width", linestrokewidth)
    .on("mouseover", function(d) {
      return tooltip.style("visibility", "visible");
    })
  	.on("mousemove", function(d) {
      return tooltip.style("top", (event.pageY-15)+"px")
                    .style("left",(event.pageX+15)+"px")
                    .text(line.toString());
    })
  	.on("mouseout", function(d) {
      return tooltip.style("visibility", "hidden");
    });

    // displaydirectionvector2d(xline)
}


///////////////////////////////////////////

function newline2d(id, type, opts) {
  // this opts are m, b, v, p, A, B, C in a dictionary
  if (type == "parametric") {
    p = findobject(opts.p).object;
    v = findobject(opts.v).object;
    if ((p instanceof Point2d) && (v instanceof Vector2d)) {
      opts.p = p;
      opts.v = v;
    } else {
      // erro
      console.log("ERROR: you need a point and a vector ids")
    }
  }
  l = new Line2d(id, type, opts);
  saveobject(l);
  displayline2d(l);
  return l;
}

// returns a string with the relative position of the lines
function positionline2d(id1, id2) {
  var l1 = findobject(id1).object;
  var l2 = findobject(id2).object;
  var pos = op_relative_position(l1, l2);

  console.log("The lines are: ", pos);
  return pos;
}

// returns a string with the angle between the lines in radians
function angleline2d(id1, id2) {
  var l1 = findobject(id1).object;
  var l2 = findobject(id2).object;
  var angle = op_angle_line(l1, l2);

  console.log("Angle between the lines: ", angle);
  return angle;
}

// returns the intersection between the lines, if exists
function intersectionline2d(id1, id2) {
  var l1 = findobject(id1).object;
  var l2 = findobject(id2).object;
  var ans = op_line_intersection(l1, l2);
  var p;

  switch(ans.status) {
    case 0: // the intersection is a point
      p = ans.point;
      console.log("As retas se intersectam em [", p.x, ", ", p.y, "].");
      break;
    case 1: // the lines are coincidents
      console.log("As retas são coincidentes. Todos os pontos são interseções.");
      p = "0 = 0";
      break;
    case -1: // there's no intersection
      console.log("Não há interseções. As retas são paralelas.");
      p = "Absurdo"
      break;
    default:
      console.log("entrou no default");
  }

  return p;
}

///////////////////////////////////////////////////



// newpoint2d("p",4,5)
// newvector2d("v", 1,1)
// newline2d("y", "parametric",{p:"p",v:"v"})
// newpoint2d("p0", 45, 30)
// newpoint2d("p2", 5, 12)
// newpoint2d("p3", 35, 7)
// newpoint2d("p4", 18, 2)
// newpoint2d("p5", 0, 10)
// newvector2d("v1", 4,16)
// newvector2d("v2", 17,14)
// newvector2d("v3", 5,36)
// newline2d("y1", "parametric",{p:"p0",v:"v1"})
// newline2d("l", "general", {"A":1,"B":4, "C":-17})
// newline2d("l1", "general", {"A":2,"B":-3, "C":-5})
// newline2d("r1", "cartesian", {"m":2,"b":-14})
// newline2d("r2", "cartesian", {"m":3/5,"b":8})

//newpoint2d("p1",0,0);
//newvector2d("v1", 1,1);
//newline2d("l1", "parametric", {"v":"v1", "p":"p1"});
//newvector2d("v2", -1,1);
//newline2d("l2", "parametric", {"v":"v2", "p":"p1"});
//newpoint2d("p2",4,4);
//newline2d("l3", "parametric", {"v":"v2", "p":"p2"});
