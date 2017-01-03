// soma de vetores (vetor, vetor)
function op_sum(v1, v2) {
  return new Vector2d(null, v1.x + v2.x, v1.y + v2.y);
}

// diferenca de vetors (vetor, vetor)
function op_diff(v1, v2) {
  return new Vector2d(null, v1.x - v2.x, v1.y - v2.y);
}

// norma de um vetor (vetor)
function op_norm(v) {
  var norm = Math.sqrt((v.x * v.x) + (v.y * v.y))
  if (isFloat(norm))
  	norm = norm.toFixed(4)
  return norm
}

function _op_norm(x,y) {
  // funcao auxiliar para uso interno
  var sqrt = Math.sqrt(x*x + y*y)
  if (isFloat(sqrt))
  	sqrt = sqrt.toFixed(4)
  return sqrt
}

// produto escalar (vetor, vetor)
function op_dot(v1, v2) {
  return v1.x*v2.x + v1.y*v2.y;
}

// multiplicacao por escalar (vetor, number)
function op_scalar_mult(v, esc) {
  var vx = (v.x * esc);
  var vy = (v.y * esc);
  if(isFloat(vx)){
  	vx = vx.toFixed(4)
  	vy = vy.toFixed(4)
  }
  return new Vector2d(null, vx, vy)
}

// divisao por escalar (vetor, number)
function op_scalar_div(v, esc) {
  var vx = (v.x / esc);
  var vy = (v.y / esc);
  if(isFloat(vx)){
  	vx = vx.toFixed(4)
  	vy = vy.toFixed(4)
  }
  return new Vector2d(null, vx, vy)
}

// projecao de um vetor em outro (vetor, vetor)
function op_projection(v1, v2) {
  var temp = op_dot(v1,v2)/op_dot(v2,v2);
  return op_scalar_mult(v2, temp)
}

// cosseno entre vetores (vetor, vetor)
function op_cossine(v1, v2) {
  var num = op_dot(v1,v2);
  var den = op_norm(v1) * op_norm(v2);
  var raz = num/den;
  if (isFloat(raz)){
    raz = raz.toFixed(4)
  }
  return raz;
}

// angle entre vetores in radians (vetor, vetor)
function op_angle(v1, v2) {
  var cos = op_cossine(v1,v2);
  var acos = Math.acos(cos)
  if (isFloat(acos)){
  	acos = acos.toFixed(4)
  }
  return acos;
}

// distancia entre pontos (point, point)
function op_dist(p1, p2) {
  return op_norm(op_diff(p1,p2))
}

// posicao relativa entre duas retas (linha, linha)
function op_relative_position(l1, l2) {
  var position = "";
  var slope1 = l1.opts.m;
  var slope2 = l2.opts.m;
  if (slope1 == slope2) {
    if (l1.opts.b == l2.opts.b) {
      position = "Paralelas coincidentes";
    } else {
      position = "Paralelas";
    }
  } else if (slope1*slope2 == -1) {
    position = "Concorrentes e ortogonais";
  } else {
    position = "Concorrentes";
  }

  return position;
}

// angulo em radianos entre duas linhas (linha, linha)
function op_angle_line(l1, l2) {
  var num = l2.opts.m - l1.opts.m;
  var den = 1 + l2.opts.m * l1.opts.m;
  return Math.atan(Math.abs(num/den));
}

function op_line_intersection(l1,l2) {
  var position = op_relative_position(l1,l2);
  var ret;

  switch(position) {
    case "Paralelas coincidentes":
      ret = {"status":1, "point":null};
      break;
    case "Paralelas":
      ret = {"status":-1, "point":null};
      break;
    case "Concorrentes e ortogonais":
      var x = (l2.opts.b - l1.opts.b) / (l1.opts.m - l2.opts.m);
      var y = l1.opts.m * x + l1.opts.b;
      if (isFloat(x)){
      	x = x.toFixed(4)
      }
      if (isFloat(y)){
      	y = y.toFixed(4)
      }
      var p = new Point2d(null, x, y);
      ret = {"status":0, "point":p};
      break;
    case "Concorrentes":
      var x = (l2.opts.b - l1.opts.b) / (l1.opts.m - l2.opts.m);
      var y = l1.opts.m * x + l1.opts.b;
      if (isFloat(x)){
      	x = x.toFixed(4)
      }
      if (isFloat(y)){
      	y = y.toFixed(4)
      }
      var p = new Point2d(null, x, y);
      ret = {"status":0, "point":p};
      break;
  }

  return ret;
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

/////////////////////////////////////////////////////
//		DISPLAYING ON OUR CONSOLE                   //
/////////////////////////////////////////////////////

var counter = 0;
function insertInMemory(funct, a, b, c, d, e){
	var memory = document.getElementById("memory");
	var row = document.createElement("tr");
	// Append Number
	var cell = document.createElement("td");
	var textnode = document.createTextNode(counter);
	cell.appendChild(textnode);
	row.appendChild(cell);
	counter++;
	// Creating the column`s cells
	var cell_1 = document.createElement("td");
	var cell_2 = document.createElement("td");
	var cell_3 = document.createElement("td");
	var cell_4 = document.createElement("td");
	var cell_5 = document.createElement("td");

	switch (funct){
		case 'vector':
			// Append Nome
			textnode_1 = document.createTextNode(a);
			textnode_2 = document.createTextNode("v(" + b + ", " + c + ")");
			textnode_3 = document.createTextNode(a + " = (" + b + ", " + c + ")");
			break;

		case 'point':
			// Append Nome
			textnode_1 = document.createTextNode(a);
			textnode_2 = document.createTextNode("p(" + b + ", " + c + ")");
			textnode_3 = document.createTextNode(a + " = (" + b + ", " + c + ")");
			break;

		case 'line':
		    if (a == "parametric") {
			    // Append Nome
			    textnode_1 = document.createTextNode(b.id);
			    textnode_2 = document.createTextNode("(x, y) = ("+c.x+", "+c.y + ") + ("+d.x+", "+d.y + ")t");
			    textnode_3 = document.createTextNode("Paramétrica:  (x, y) = (xp, yp) + (xv, yv)t");
			} else if (a == "cartesian") {
			    // Append Nome
			    textnode_1 = document.createTextNode(b.id);
			    textnode_2 = document.createTextNode("y = "+ c + "x + " + d);
			    textnode_3 = document.createTextNode("Cartesiana:  y = ax + b");
			} else if (a == "general") {
			    // Append Nome
			    textnode_1 = document.createTextNode(b.id);
			    textnode_2 = document.createTextNode(c + "x + " + d + "y + " + e + " = 0");
			    textnode_3 = document.createTextNode("Geral: Ax + By + C = 0");
			}
			break;

		case 'sum':
			textnode_1 = document.createTextNode(a.id);
			textnode_2 = document.createTextNode("("+a.x+", "+a.y+ ") = ("+b.x+" + "+c.x+", "+b.y+" + "+c.y+")");
			textnode_3 = document.createTextNode(a.id + " = " + b.id + " + " + c.id);
			break;

		case 'diff':
			textnode_1 = document.createTextNode(a.id);
			textnode_2 = document.createTextNode("("+a.x+", "+a.y+ ") = ("+b.x+" - "+c.x+", "+b.y+" - "+c.y+")");
			textnode_3 = document.createTextNode(a.id + " = " + b.id + " + " + c.id);
			break;

		case 'norm':
			textnode_1 = document.createTextNode(a);
			textnode_2 = document.createTextNode("||" + a + "|| = "+ c);
			textnode_3 = document.createTextNode("||" + a + "||" + " = √("+b.x+"² + "+b.y+"²)");
			break;

		case 'dist':
			textnode_1 = document.createTextNode(a);
			textnode_2 = document.createTextNode(d+" = √("+b.x+" - "+c.x+")² + ("+b.y+" - "+c.y+")²)");
			textnode_3 = document.createTextNode("d = √(x1 - x2)² + (y1 - y2)²)");
			break;

		case 'dot':
			textnode_1 = document.createTextNode(a);
			textnode_2 = document.createTextNode(d+" = "+"("+b.x+"*"+b.y+") + ("+c.x+"*"+c.y+")");
			textnode_3 = document.createTextNode("<(x1, y1),(x2, y2)> = (x1 * x2) + (y1 * y2)");
			break;

		case 'proj':
			textnode_1 = document.createTextNode(a);
			textnode_2 = document.createTextNode("("+a.x+","+a.y+") = ("+b.x+","+b.y+") * ((("+b.x+","+b.y+")*("+c.x+","+c.y+"))/("+c.x+","+c.y+")*("+c.x+","+c.y+")))");
			textnode_3 = document.createTextNode("proj(u, v) = u * ((u*v)/(v*v))");
			break;

		case 'cos':
			textnode_1 = document.createTextNode(d);
			textnode_2 = document.createTextNode(c+" = <("+a.x+", "+a.y+").("+b.x+", "+b.y+")> / (||"+a.x+", "+a.y+"||.||"+b.x+", "+b.y+"||)");
			textnode_3 = document.createTextNode("cos = <u.v> / ||u||.||v||");
			break;

		case 'angle':
			    textnode_1 = document.createTextNode(d);
			    textnode_2 = document.createTextNode(c+" = (<("+a.x+", "+a.y+").("+b.x+", "+b.y+")> / (||"+a.x+", "+a.y+"||.||"+b.x+", "+b.y+"||))^-1");
			    textnode_3 = document.createTextNode("angle = (<u.v> / ||u||.||v||)^-1");
			break;

		case 'mult':
			textnode_1 = document.createTextNode(c.id);
			textnode_2 = document.createTextNode("("+c.x+", "+c.y+" =  ("+a.x+"*"+b+", "+a.y+"*"+b+")");
			textnode_3 = document.createTextNode("mult = (x, y)*n");
			break;

		case 'div':
			textnode_1 = document.createTextNode(c.id);
			textnode_2 = document.createTextNode("("+c.x+", "+c.y+" =  ("+a.x+"/"+b+", "+a.y+"/"+b+")");
			textnode_3 = document.createTextNode("div = (x, y)/n");
			break;

		case 'inter':
			textnode_1 = document.createTextNode(a);
			if (b instanceof Point2d){
				textnode_2 = document.createTextNode("("+b.x+","+b.y+")");
			} else {
				textnode_2 = document.createTextNode(b);
			}
			textnode_3 = document.createTextNode(c+"  =  "+d);
			break;

		case 'relpos':
			textnode_1 = document.createTextNode(a);
			textnode_2 = document.createTextNode(b);
			textnode_3 = document.createTextNode(c+"  =  "+d);
			break;

		default:
			alert("Oh oh, I don't see this function here to insert it in the memory. Find me at utils.js")
		}

	cell_1.appendChild(textnode_1);
	cell_2.appendChild(textnode_2);
	cell_3.appendChild(textnode_3);
	row.appendChild(cell_1);
	row.appendChild(cell_2);
	row.appendChild(cell_3);
	memory.appendChild(row);
}
