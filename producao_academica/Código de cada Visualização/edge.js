function draw_relation_graph() {

    function zeros(dimensions) {
        var array = [];

        for (var i = 0; i < dimensions[0]; ++i) {
            array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
        }

        return array;
    }

    diameter

    var diameter = Math.min($("#vis0").height(), $("#vis0").width()),
        radius = diameter / 2,
        innerRadius = radius - 120;

    var cluster = d3.layout.cluster()
        .size([360, innerRadius])
        .sort(null)
        .value(function(d) {
            return d.size;
        });

    var bundle = d3.layout.bundle();

    var line = d3.svg.line.radial()
        .interpolate("bundle")
        .tension(0.85)
        .radius(function(d) {
            return d.y;
        })
        .angle(function(d) {
            return d.x / 180 * Math.PI;
        });

    var svg = d3.select("#vis0").select("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .append("g")
        .attr("transform", "translate(" + radius + "," + radius + ")");

    var link = svg.append("g").selectAll(".link"),
        node = svg.append("g").selectAll(".node");


    var allData;

    var i = 0;

    var people = []
    var peopleType = []

    var matrix;

    var dataProcessed = []
    var dataProcessed2 = []

    function mouseovered(d) {
        node
            .each(function(n) {
                n.target = n.source = false;
            });

        link
            .classed("link--target", function(l) {
                if (l.target === d) return l.source.source = true;
            })
            .classed("link--source", function(l) {
                if (l.source === d) return l.target.target = true;
            })
            .filter(function(l) {
                return l.target === d || l.source === d;
            })
            .each(function() {
                this.parentNode.appendChild(this);
            });

        node
            .classed("node--target", function(n) {
                return n.target;
            })
            .classed("node--source", function(n) {
                return n.source;
            });
    }

    function mouseouted(d) {
        link
            .classed("link--target", false)
            .classed("link--source", false);

        node
            .classed("node--target", false)
            .classed("node--source", false);
    }

    d3.select(self.frameElement).style("height", diameter + "px");

    // Lazily construct the package hierarchy from class names.
    function packageHierarchy(classes) {
        var map = {};

        function find(name, data) {
            var node = map[name],
                i;
            if (!node) {
                node = map[name] = data || {
                    name: name,
                    children: []
                };
                if (name.length) {
                    node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
                    node.parent.children.push(node);
                    node.key = name.substring(i + 1);
                }
            }
            return node;
        }

        classes.forEach(function(d) {
            find(d.name, d);
        });

        return map[""];
    }

    // Return a list of imports for the given array of nodes.
    function packageImports(nodes) {
        var map = {},
            imports = [];

        // Compute a map from name to node.
        nodes.forEach(function(d) {
            map[d.name] = d;
        });

        // For each import, construct a link from the source to target node.
        nodes.forEach(function(d) {
            if (d.imports) d.imports.forEach(function(i) {
                imports.push({
                    source: map[d.name],
                    target: map[i]
                });
            });
        });

        return imports;
    }

    console.log("Called!")
    d3.csv("teachers.csv", function(dataTeachers) {
        d3.json("producao_academica_CCEC.json", function(data) {

            console.log(data);

            for (var i = 0; i < data.length; i++) {
                //Adding all colaborator

                for (var j = 0; j < data[i].authors.length; j++) {
                    //Verify if exists otherwise add to array

                    if (people.indexOf(data[i].authors[j].name.toLowerCase()) <= -1) {

                        people.push(data[i].authors[j].name.toLowerCase());

                        if (data[i].authors[j].category == "Discente") {
                            peopleType.push(0) //Azul escuro
                        } else if (data[i].authors[j].category == "Docente") {
                            peopleType.push(1) //Azul claro
                        } else if (data[i].authors[j].category == "Participante Externo") {
                            peopleType.push(2) //Laranja
                        } else {
                            peopleType.push(3) //rosinha claro
                        }
                    }
                }
            }


            matrix = zeros([people.length, people.length])

            for (var i = 0; i < data.length; i++) {

                for (var j = 0; j < data[i].authors.length; j++) {

                    for (var k = 0; k < data[i].authors.length; k++) {

                        if (k != j) {

                            indexAuthor1 = people.indexOf(data[i].authors[j].name.toLowerCase())
                            indexAuthor2 = people.indexOf(data[i].authors[k].name.toLowerCase())

                            matrix[indexAuthor1][indexAuthor2] = matrix[indexAuthor1][indexAuthor2] + 1
                        }
                    }
                }
            }


            function formatName(obj) {

                var nameSplit = obj.split(" ")

                return nameSplit[0] + " " + nameSplit[nameSplit.length - 1]
            }

            //Formating name to first and last
            people = people.map(formatName)

            dataTeachers = dataTeachers.map(function(obj) {
                obj.name = formatName(obj.name)
                return obj
            })

            //filling nodes
            for (var i = 0; i < people.length; i++) {

                if (peopleType[i] == 1) {
                    var newObject = {
                        name: people[i],
                        size: 0,
                        imports: []
                    }

                    var researchLine;

                    for (var j = 0; j < dataTeachers.length; j++) {
                        if (dataTeachers[j].name == people[i]) {
                            researchLine = dataTeachers[j].researchLine

                        }
                    }


                    var newObject2 = {
                        name: researchLine + "." + people[i],
                        size: 0,
                        imports: []
                    }

                    for (var j = 0; j < people.length; j++) {

                        if (matrix[i][j] > 0 && peopleType[j] == 1) {
                            newObject.imports.push(people[j]);

                            var researchLineOther;

                            for (var k = 0; k < dataTeachers.length; k++) {
                                if (dataTeachers[k].name == people[j]) {
                                    researchLineOther = dataTeachers[k].researchLine;

                                }
                            }
                            newObject2.imports.push(researchLineOther + "." + people[j]);
                        }
                    }

                    dataProcessed.push(newObject);
                    dataProcessed2.push(newObject2);
                }
            }


            function sortName(a, b) {
                if (a.name < b.name)
                    return -1;
                if (a.name > b.name)
                    return 1;
                return 0;
            };

            dataProcessed.sort(sortName);
            dataProcessed2.sort(sortName);


            var finalData;

            //if(sortType==1){

            //    finalData = dataProcessed;
            //}else{

            finalData = dataProcessed2;
            //}


            var nodes = cluster.nodes(packageHierarchy(finalData)),
                links = packageImports(nodes);

            link = link
                .data(bundle(links))
                .enter().append("path")
                .each(function(d) {
                    d.source = d[0], d.target = d[d.length - 1];
                })
                .attr("class", "link")
                .attr("d", line);

            node = node
                .data(nodes.filter(function(n) {
                    return !n.children;
                }))
                .enter().append("text")
                .attr("class", "node")
                .attr("dy", ".31em")
                .attr("transform", function(d) {
                    return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)");
                })
                .style("text-anchor", function(d) {
                    return d.x < 180 ? "start" : "end";
                })
                .text(function(d) {
                    return d.key;
                })
                .on("mouseover", mouseovered)
                .on("mouseout", mouseouted);
        });
    });
}