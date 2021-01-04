
function setYear(){
    let semester = this.text;
    let internalName = this.getAttribute("aux");
    //
    d3.select("#title")
	.text("Projetos " + semester);

	//
	d3.select("#contTable")
	    .selectAll("td")
	    .remove();

    //console.log("/data/" + internalName  + ".json");
    d3.json("/data/" + internalName  + ".json").then(function(data){
	let projects = data['projects'];

	let itens = d3.select("#contTable")
	    .selectAll("td")
	    .data(projects)
	    .enter();

	let rows = itens.append("tr");
	let images = rows.append("td");
	images.attr("width","20%")
	    .attr("heigh","175px")
	    .attr("align","center")
	    .attr("valign","middle")
	    .attr("bgcolor","white");
	images.append("img")
	    .attr("height","150px")
	    .attr("src",d=>("figs/"+d.teaser))
	let info   = rows.append("td");
	info.attr("width","70%")
	    .attr("align","left")
	    .attr("valign","middle")
	    .attr("bgcolor","white");
	let fonts = info.append("font")
	    .attr("size",3)
	    .attr("color","black");
	//
	fonts.append("b")
	    .text(d=>{return "Título: " + d.title; })
	//
	fonts.append("br");
	//
	fonts.append("text").text("Autor(es)")
	let authors = fonts.append("ul").selectAll(".authors")
	    .data(d=>d.authors)
	    .enter();
	authors.append("li").text(d=>{return d.name + "  ("+ d.email  +")"} );

	
	//

	fonts.append("text").text("Links:");
	fonts.append("ul").selectAll(".links")
	    .data(d=>d["links"])
	    .enter()
	    .append("li")
	    .append("a")
	    .attr("href",d=>d.a)
	    .attr("target","_blank")
	    .text(d=>d.text);
	
	
    });


}

// set menu
d3.csv("years.csv").then(function(data){
    d3.select("#nav-assignment1")
	.selectAll("text")
	.data(data)
	.enter()
	.append("a")
    //.attr("href",d=>d["file"])
	.text(d=>d["semester"])
	.attr("aux",d=>d["file"])
	.on('click', setYear);
});
