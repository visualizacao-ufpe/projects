	var width = 960,
	    height = 500,
	    padding = 1.5, // separation between same-color nodes
	    clusterPadding = 6, // separation between different-color nodes
	    maxRadius = 0;

	var numberClusters = 4;
	var color = ["#80cbc4", "#009688", "#f57f17", "#00695c"]


	d3.json("producao_academica_CCEC.json", function(data) {
	    //Setting new width and height
	    width = $("#vis1").width()
	    height = $("#vis1").height()

	    function zoomed() {
	        container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
	        d3.event.sourceEvent.stopPropagation();
	    }

	    var zoom = d3.behavior.zoom()
	        .scaleExtent([0.5, 5])
	        .on("zoom", zoomed);

	    //Creating clusters

	    // The largest node for each cluster.

	    var clusters = new Array(numberClusters); //It stores the biggest bubble of the cluster

	    var nodes = []

	    //	ADD ON THE OBJECT THE INFORMATION RELATIVE TO THAT WORK -----> TODO
	    for (var j = 0; j < data.length; j++) {

	        var i;
	        if (data[j].subtype_ == "TRABALHO EM ANAIS") {
	            i = 0;
	        } else if (data[j].subtype_ == "ARTIGO EM PERIODICO") {
	            i = 1;
	        } else if (data[j].subtype_ == "LIVRO") {
	            i = 2;
	        } else {
	            i = 3;
	        }

	        var r = Math.sqrt((data[j].authors.length * 25) / 3.14);
	        var nameWork = data[j].name
	        var authors = data[j].authors

	        if (maxRadius < r) {
	            maxRadius = r
	        }

	        var d = {
	            name: nameWork,
	            authors: authors,
	            cluster: i,
	            radius: r
	        };
	        nodes.push(d);
	        if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
	    }

	    // Use the pack layout to initialize node positions.
	    d3.layout.pack()
	        .sort(null)
	        .size([width, height])
	        .children(function(d) {
	            return d.values;
	        })
	        .value(function(d) {
	            return d.radius * d.radius;
	        })
	        .nodes({
	            values: d3.nest()
	                .key(function(d) {
	                    return d.cluster;
	                })
	                .entries(nodes)
	        });

	    var force = d3.layout.force()
	        .nodes(nodes)
	        .size([width, height])
	        .gravity(.0001)
	        .charge(0)
	        .on("tick", tick)
	        .start();

	    var svg = d3.select("#vis1").select("svg")
	        .attr("width", width)
	        .attr("height", height)
	        .on("mousewheel.zoom", function(d){
	        	d3.event.sourceEvent.stopPropagation();
	        })
	        .on("DOMMouseScroll.zoom", function(d){
	        	d3.event.sourceEvent.stopPropagation();
	        })
	        .on("wheel.zoom", function(d){
	        	d3.event.sourceEvent.stopPropagation();
	        });

	    var container = svg.append("g").call(zoom)

	    var node = container.selectAll("circle")
	        .data(nodes)
	        .enter()
	        .append("circle")
	        .style("fill", function(d) {
	            return color[d.cluster];
	        })
	        .call(force.drag)
	        .attr("data-position", "left")
	        .attr("data-delay", "50")
	        .attr("data-tooltip", function(d) {
	            return formatText(d)
	        })
	        .attr("data-html", "true")
	        .attr("class", "tooltipped");

	    function formatText(data) {

	        var text = "<strong>TÍTULO:</strong> " + data.name + "<br/><strong>AUTORES:</strong> "

	        for (var i = 0; i < data.authors.length; i++) {
	            text += data.authors[i].name + "<br/>"
	        }

	        return text;
	    }


	    node.transition()
	        .duration(750)
	        .delay(function(d, i) {
	            return i * 5;
	        })
	        .attrTween("r", function(d) {
	            var i = d3.interpolate(0, d.radius);
	            return function(t) {
	                return d.radius = i(t);
	            };
	        });

	    function tick(e) {
	        node
	            .each(cluster(10 * e.alpha * e.alpha))
	            .each(collide(.5))
	            .attr("cx", function(d) {
	                return d.x;
	            })
	            .attr("cy", function(d) {
	                return d.y;
	            });
	    }

	    // Move d to be adjacent to the cluster node.
	    function cluster(alpha) {
	        return function(d) {
	            var cluster = clusters[d.cluster];
	            if (cluster === d) return;
	            var x = d.x - cluster.x,
	                y = d.y - cluster.y,
	                l = Math.sqrt(x * x + y * y),
	                r = d.radius + cluster.radius;
	            if (l != r) {
	                l = (l - r) / l * alpha;
	                d.x -= x *= l;
	                d.y -= y *= l;
	                cluster.x += x;
	                cluster.y += y;
	            }
	        };
	    }

	    // Resolves collisions between d and all other circles.
	    function collide(alpha) {
	        var quadtree = d3.geom.quadtree(nodes);
	        return function(d) {
	            var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
	                nx1 = d.x - r,
	                nx2 = d.x + r,
	                ny1 = d.y - r,
	                ny2 = d.y + r;
	            quadtree.visit(function(quad, x1, y1, x2, y2) {
	                if (quad.point && (quad.point !== d)) {
	                    var x = d.x - quad.point.x,
	                        y = d.y - quad.point.y,
	                        l = Math.sqrt(x * x + y * y),
	                        r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
	                    if (l < r) {
	                        l = (l - r) / l * alpha;
	                        d.x -= x *= l;
	                        d.y -= y *= l;
	                        quad.point.x += x;
	                        quad.point.y += y;
	                    }
	                }
	                return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
	            });
	        };
	    }
	});