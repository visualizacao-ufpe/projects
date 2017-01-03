var Point2d = function(id, x, y) {
    this.x = x;
    this.y = y;
    this.id = id;
};

Point2d.prototype.set_id = function(id) {
  this.id = id;
}

Point2d.prototype.toString = function() {
  return this.id + ": (" + this.x + ", " + this.y + ")";
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////

var Vector2d = function(id, x, y) {
    this.x = x;
    this.y = y;
    this.id = id;
};

Vector2d.prototype.set_id = function(id) {
  this.id = id;
};

Vector2d.prototype.toString = function() {
  return this.id + ": [" + this.x + ", " + this.y + "]";
}

///////////////////////////////////////////////
/////////////////////////////////////////////////

// the lines are stored as y = mx + b
// opts are: m, b, v, p, A, B, C (for canonical and parametric representations)

// cartesian form
// y = mx + b

// parametric form
// p + vt (p is a point and v is the director vector)

// general form
// Ax + By + C = 0

// you dont have to pass the opts you're not using

var Line2d = function(id, type, opts) {
  this.id = id;
  this.opts = opts;
  this.type = type;

  if (type == "parametric") {
    if (typeof(opts.m)=='undefined' || typeof(opts.b)=='undefined') {
      // converting parametric to cartesian
      opts.m = opts.v.x/opts.v.y;
      opts.b = - (opts.m * opts.p.x) + opts.p.y;
    }
  } else if (type == "general") {
    if (typeof(opts.m)=='undefined' || typeof(opts.b)=='undefined') {
      // converting general to cartesian
      opts.m = - opts.A/opts.B;
      opts.b = - opts.C/opts.B;
    }
  }

};

Line2d.prototype.set_id = function(id) {
  this.id = id;
};

Line2d.prototype.toString = function() {
  line = this.id + ": ";
  if (this.type == "cartesian") {
    line += "y = " + this.opts.m + "x + " + this.opts.b;
  } else if (this.type == "parametric") {
    line += "(x,y) = (" + this.opts.p.x + ", " + this.opts.p.y + ") + [" + this.opts.v.x + ", " + this.opts.v.y + "]t";
  } else if (this.type == "general") {
    line += this.opts.A + "x + " + this.opts.B + "y + " + this.opts.C + " = 0";
  }
  return line;
}
