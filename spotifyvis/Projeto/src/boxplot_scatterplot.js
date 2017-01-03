// Canvas dimensions varaibles
var marginPlot = {top: 10, right: 30, bottom: 50, left: 30},
    widthPlot = (2*window.innerWidth/3) - marginPlot.left - marginPlot.right,
    heightPlot = 500 - marginPlot.top - marginPlot.bottom;

// Scale variables
var xScale = d3.scaleBand().range([0, widthPlot]).padding(1),
    yScale = d3.scaleLinear().range([heightPlot, 0]),
    colorScale = d3.scaleOrdinal(d3.schemeCategory20);
    format = d3.format(".3f")

var artistWithNoInformation = false;


// Data list variables
var artistsList = ["The Beatles", "Led Zeppelin", "The Clash", "Nirvana", "Michael Jackson", "Madonna", "Pink Floyd", "Metallica", "Radiohead", "Eminem", "2Pac"];
var audioFeaturesList = ["acousticness", "danceability", "energy", "instrumentalness", "liveness", "speechiness", "valence"] 

// Dataset variables
var selectedArtistPosition = 0,
    selectedAudioFeature = "acousticness",
    readData = [],
    albumsByArtist = [],
    tracksByAlbum = [],
    trackList = []

// Read json file
d3.json("../../json/artistsAlbumsAudioFeatures.json", function(artistsAlbumsFeatures) { 
    for(var i = 0; i < artistsAlbumsFeatures.artists.length; i++) {
        readData.push(artistsAlbumsFeatures.artists[i]);
    }

    updateDataset(selectedArtistPosition);
    drawBoxPlot(tracksByAlbum, albumsByArtist);
});

// Set domain for X and Y scales; render boxplot view
function drawBoxPlot(tracksDataset, albumsDataset) {
    var svgPlot = d3.select("#svgPlot");
    svgPlot.selectAll("g").remove();

    if(tracksDataset === -3 && albumsDataset===-3){
        artistWithNoInformation = true;
        svgPlot.append("g")
        .append("text")
        .text("No album information available for this artist")
        .attr("x", widthPlot/3)
        .attr("y", heightPlot/2)
        .style("font-size", "25px")
        .style("font-family","sans-serif")
        .style("fill","#133926");
    }else {
    artistWithNoInformation = false;
    // Set up scales
    xScale.domain(albumsDataset.map( d => d.name));
    yScale.domain(d3.extent(tracksDataset, function(d) { return d[selectedAudioFeature] }));

    // Create x axis
    var xAxis = d3.axisBottom(xScale);
    var bandwidth = xScale.range()[1]/xScale.domain().length
    var xAxisGroup = svgPlot.append("g")
    .attr("id","xAxis")
    .attr("transform","translate(" + marginPlot.right + "," + (heightPlot + marginPlot.top) + ")")
    .call(xAxis)
    .selectAll(".tick text")
    .call(wrap, bandwidth);

    // Create y axis
    var yAxis = d3.axisLeft(yScale);
    var yAxisGroup = svgPlot.append("g")
    .attr("id","yAxis")
    .attr("transform","translate(" + marginPlot.right + "," + marginPlot.top +")")
    .call(yAxis);

    var tooltipPlotBox = d3.select("body").append("div").attr("class", "toolTipPlotBox");
    // Create boxplot container
    var boxplotContainer = svgPlot.append("g")
    .attr("id","boxplot")
    .attr("transform","translate(" + marginPlot.right + "," + marginPlot.top + ")");

    // Create main line container and selection
    var mainLinesContainer = boxplotContainer.append("g")
    .attr("id","mainLines")
    var mainLinesSelection = mainLinesContainer.selectAll("line").data(albumsDataset);

    // Create main line elements
    var lines = mainLinesSelection.enter().append("line");
    lines
    .attr("x1", function(d) {
        return xScale(d.name);
    })
    .attr("y1", function(d) {
        return yScale(d3.max(d.tracks, function(v) {return v[selectedAudioFeature] }))
    })
    .attr("x2", function(d) {
        return xScale(d.name);
    })
    .attr("y2", function(d) {
        return yScale(d3.min(d.tracks, function(v) {return v[selectedAudioFeature] }))
    })
    .style("stroke", "black")
    .style("stroke-width", 1)
    .style("stroke-dasharray", "5, 5")

    // Create max guard container and selection
    var maxGuardsContainer = boxplotContainer.append("g")
    .attr("id","maxGuards")
    var maxGuardsSelection = maxGuardsContainer.selectAll("line").data(albumsDataset);

    // Create max guard elements
    var maxGuards = maxGuardsSelection.enter().append("line");
    maxGuards
    .attr("x1", function(d) {
        return xScale(d.name) + bandwidth/10;
    })
    .attr("y1", function(d) {
        return yScale(d3.max(d.tracks, function(v) {return v[selectedAudioFeature] }))
    })
    .attr("x2", function(d) {
        return xScale(d.name) - bandwidth/10;
    })
    .attr("y2", function(d) {
        return yScale(d3.max(d.tracks, function(v) {return v[selectedAudioFeature] }))
    })
    .style("stroke", "black")
    .style("stroke-width", 1)

    // Create min guard container and selection
    var minGuardsContainer = boxplotContainer.append("g")
    .attr("id","minGuards")
    var minGuardsSelection = minGuardsContainer.selectAll("line").data(albumsDataset);

    // Create min guard elements
    var minGuards = minGuardsSelection.enter().append("line");
    minGuards
    .attr("x1", function(d) {
        return xScale(d.name) + bandwidth/10;
    })
    .attr("y1", function(d) {
        return yScale(d3.min(d.tracks, function(v) {return v[selectedAudioFeature] }))
    })
    .attr("x2", function(d) {
        return xScale(d.name) - bandwidth/10;
    })
    .attr("y2", function(d) {
        return yScale(d3.min(d.tracks, function(v) {return v[selectedAudioFeature] }))
    })
    .style("stroke", "black")
    .style("stroke-width", 1)

    // Create box container and selection
    var boxesContainer = boxplotContainer.append("g")
    .attr("id","boxes")
    var boxesSelection = boxesContainer.selectAll("rect").data(albumsDataset);

    // Create box elements
    var boxes = boxesSelection.enter().append("rect");
    boxes
    .attr("x", function(d) {
        return (xScale(d.name) - bandwidth/5);
    })
    .attr("y", function(d) {
        var temp = d.tracks.sort(compareNumbers(selectedAudioFeature));
        return yScale(getThirdQuartil(temp, selectedAudioFeature));
    })
    .attr("width", bandwidth/2.5)
    .attr("height", function(d) {
        var temp = d.tracks.sort(compareNumbers(selectedAudioFeature));
        return (yScale(getFirstQuartil(temp, selectedAudioFeature)) - yScale(getThirdQuartil(temp, selectedAudioFeature)));
    })
    .style("stroke", function(d) {
        return colorScale(d.name)
    }) 
    .style("stroke-width", 2)
    .style("fill", "white")
    .on("mousemove", function(d){
        d3.select(this)
        .style("stroke-opacity", 0.6)

        /* máximo ,third quartil, mediana, first quartil, mínimo */
        var max = format(d3.max(d.tracks, function(v) {return v[selectedAudioFeature] }));
        var temp = d.tracks.sort(compareNumbers(selectedAudioFeature));
        var third = format(getThirdQuartil(temp, selectedAudioFeature));
        var med = format(getMedian(temp, selectedAudioFeature));
        var first =  format(getFirstQuartil(temp, selectedAudioFeature));
        var min = format(d3.min(d.tracks, function(v) {return v[selectedAudioFeature] }));
            tooltipPlotBox
              .style("left", d3.event.pageX  + "px")
              .style("top", d3.event.pageY  + "px")
              .style("display", "inline-block")
              .style("background","none repeat scroll 0 0 " + colorScale(d.name))
              //.style("opacity",0.5)
              .html("<b>"+"Maximum: "+"</b>"+max + "<br>"+
                    "<b>"+"Third Quartile: "+"</b>"+third+ "<br>"+
                    "<b>"+"Median: "+"</b>"+ med+ "<br>"+
                    "<b>"+"First Quartile: "+"</b>"+first+ "<br>"+
                   "<b>"+ "Minimun: "+"</b>"+ min
                    );
          })
    .on("mouseout", function(d){ 
        // "Unhighlight"
         d3.select(this)
        .style("stroke-opacity", 1)
        
        tooltipPlotBox.style("display", "none"); 
    });
    
    // Create mean line container and selection
    var medianLinesContainer = boxplotContainer.append("g")
    .attr("id","medianLines");
    var medianLinesSelection = medianLinesContainer.selectAll("line").data(albumsDataset);

    // Create median line elements
    var medianLines = medianLinesSelection.enter().append("line");

    medianLines
    .attr("x1", function(d) { 
        return xScale(d.name) + bandwidth/5
    })
    .attr("y1", function(d) { 
        var temp = d.tracks.sort(compareNumbers(selectedAudioFeature));
        return yScale(getMedian(temp, selectedAudioFeature)) 
    }) 
    .attr("x2", function(d) { 
        return xScale(d.name) - bandwidth/5
    })
    .attr("y2", function(d) {
        var temp = d.tracks.sort(compareNumbers(selectedAudioFeature));
        return yScale(getMedian(temp, selectedAudioFeature))  
    })
    .style("stroke", "black")
    .style("stroke-width", 1);

    /*
    // Create max labels container
    var maxLabelsContainer = boxplotContainer.append("g")
    .attr("id", "maxLabels")
    var maxLabelsSelection = maxLabelsContainer.selectAll("text").data(albumsDataset)

    // Create max labels elements
    var maxLabels = maxLabelsSelection.enter().append("text")

    maxLabels
    .attr("x",function(d) {
        return xScale(d.name) + bandwidth/10;
    })
    .attr("y", function(d) {
        return yScale(d3.max(d.tracks, function(v) {return v[selectedAudioFeature] }))
    })
    .text(function(d) {
        return format(d3.max(d.tracks, function(v) {return v[selectedAudioFeature] }))
    })
    .style("fill", "black")
    .style("font-family", "sans-serif")
    .style("font-size", 12)

    // Create min labels container
    var minLabelsContainer = boxplotContainer.append("g")
    .attr("id", "minLabels")
    var minLabelsSelection = minLabelsContainer.selectAll("text").data(albumsDataset)

    // Create min labels elements
    var minLabels = minLabelsSelection.enter().append("text")

    minLabels
    .attr("x",function(d) {
        return xScale(d.name) + bandwidth/10;
    })
    .attr("y", function(d) {
        return yScale(d3.min(d.tracks, function(v) {return v[selectedAudioFeature] }))
    })
    .text(function(d) {
        return format(d3.min(d.tracks, function(v) {return v[selectedAudioFeature] }))
    })
    .style("fill", "black")
    .style("font-family", "sans-serif")
    .style("font-size", 12)

    // Create third quartil labels container
    var thirdQuartilLabelsContainer = boxplotContainer.append("g")
    .attr("id", "thirdQuartilLabels")
    var thirdQuartilLabelsSelection = thirdQuartilLabelsContainer.selectAll("text").data(albumsDataset)

    // Create third quartil labels elements
    var thirdQuartilLabels = thirdQuartilLabelsSelection.enter().append("text")

    thirdQuartilLabels
    .attr("x",function(d) {
        return xScale(d.name) + bandwidth/4;
    })
    .attr("y", function(d) {
        var temp = d.tracks.sort(compareNumbers(selectedAudioFeature));
        return yScale(getThirdQuartil(temp, selectedAudioFeature));
    })
    .text(function(d) {
        var temp = d.tracks.sort(compareNumbers(selectedAudioFeature));
        return format(getThirdQuartil(temp, selectedAudioFeature));
    })
    .style("fill", "black")
    .style("font-family", "sans-serif")
    .style("font-size", 12)

    // Create first quartil labels container
    var firstQuartilLabelsContainer = boxplotContainer.append("g")
    .attr("id", "firstQuartilLabels")
    var firstQuartilLabelsSelection = firstQuartilLabelsContainer.selectAll("text").data(albumsDataset)

    // Create first quartil labels elements
    var firstQuartilLabels = firstQuartilLabelsSelection.enter().append("text")

    firstQuartilLabels
    .attr("x",function(d) {
        return xScale(d.name) + bandwidth/4;
    })
    .attr("y", function(d) {
        var temp = d.tracks.sort(compareNumbers(selectedAudioFeature));
        return yScale(getFirstQuartil(temp, selectedAudioFeature));
    })
    .text(function(d) {
        var temp = d.tracks.sort(compareNumbers(selectedAudioFeature));
        return format(getFirstQuartil(temp, selectedAudioFeature));
    })
    .style("fill", "black")
    .style("font-family", "sans-serif")
    .style("font-size", 12)

     // Create median labels container
    var medianLabelsContainer = boxplotContainer.append("g")
    .attr("id", "medianLabels")
    var medianLabelsSelection = medianLabelsContainer.selectAll("text").data(albumsDataset)

    // Create first quartil labels elements
    var medianLabels = medianLabelsSelection.enter().append("text")

    medianLabels
    .attr("x",function(d) {
        return xScale(d.name) + bandwidth/4;
    })
    .attr("y", function(d) {
        var temp = d.tracks.sort(compareNumbers(selectedAudioFeature));
        return yScale(getMedian(temp, selectedAudioFeature))
    })
    .text(function(d) {
        var temp = d.tracks.sort(compareNumbers(selectedAudioFeature));
        return format(getMedian(temp, selectedAudioFeature));
    })
    .style("fill", "black")
    .style("font-family", "sans-serif")
    .style("font-size", 12)
    */
    }
}

// Calculate median for boxplot view
function getMedian(list, feature) {
    if(list.length % 2 == 0) {
        if (list.length == 2) { return (list[0][feature] + list[1][feature]) / 2}
        else { return (list[(list.length/2) + 1][feature] + list[list.length/2][feature]) / 2 }
    } else {
        if (list.length == 1) { return list[0][feature] }
        else return list[Math.ceil(list.length/2)][feature]
    }
}

// Calculate first quartil for boxplot view
function getFirstQuartil(list, feature) {
    var firstQuartil;
    var size = list.length;
    var firstHalf;
    if(size % 2 == 0) {
        firstHalf = list.slice(0, (size/2) + 1);
        firstQuartil = getMedian(firstHalf, feature);
    } else {
        firstHalf = list.slice(0, Math.floor(size/2));
        firstQuartil = getMedian(firstHalf, feature);
    }
    return firstQuartil;
}

// Calculate third quartil for boxplot view
function getThirdQuartil(list, feature) {
    var thirdQuartil;
    var size = list.length;
    var secondHalf;
    if(size % 2 == 0) {
        secondHalf = list.slice((size/2) + 1);
        thirdQuartil = getMedian(secondHalf, feature);
    } else {
        secondHalf = list.slice(Math.ceil(size/2));
        thirdQuartil = getMedian(secondHalf, feature);
    }
    return thirdQuartil;
}

// Compare two values for .sort() function
function compareNumbers(feature) {
    return function(a,b) {
        return a[feature] - b[feature];
    }
}

// Set domain for X and Y scales; render scatterplot view
function drawScatterplot(tracksDataset, albumsDataset) {
    var svgPlot = d3.select("#svgPlot");
    svgPlot.selectAll("g").remove();

    if(tracksDataset === -3 && albumsDataset===-3) {
        artistWithNoInformation = true;
        svgPlot.append("g")
        .append("text")
        .text("No album information available for this artist")
        .attr("x", widthPlot/3)
        .attr("y", heightPlot/2)
        .style("font-size", "25px")
        .style("font-family","sans-serif")
        .style("fill","#133926");
    } else {
    artistWithNoInformation = false;
    // Set up scales
    xScale.domain(albumsDataset.map( d => d.name));
    yScale.domain(d3.extent(tracksDataset, function(d) { return d[selectedAudioFeature] }));

    // Create x axis
    var xAxis = d3.axisBottom(xScale);
    var bandwidth = xScale.range()[1]/xScale.domain().length
    var xAxisGroup = svgPlot.append("g")
    .attr("id","xAxis")
    .attr("transform","translate(" + marginPlot.right + "," + (heightPlot + marginPlot.top) + ")")
    .call(xAxis)
    .selectAll(".tick text")
    .call(wrap, bandwidth);

    // Create y axis
    var yAxis = d3.axisLeft(yScale);
    var yAxisGroup = svgPlot.append("g")
    .attr("id","yAxis")
    .attr("transform","translate(" + marginPlot.right + "," + marginPlot.top +")")
    .call(yAxis);

    var tooltipPlotScatter = d3.select("body").append("div").attr("class", "toolTipPlotScatter");

    // Create circle elements
    // Create main line container and selection
    var circlesContainer = svgPlot.append("g")
    .attr("id","circles")
    .attr("transform","translate(" + marginPlot.right + "," + marginPlot.top + ")");

    var circlesSelection = circlesContainer.selectAll("circle").data(tracksDataset);

    // Create circle elements
    var circles = circlesSelection.enter().append("circle");
    circles
    .attr("cx", function(d) {
        if (d.track_number % 2 == 0) { return xScale(d.album_name) + 8}
        else { return xScale(d.album_name) - 8 };
    })
    .attr("cy", function(d) {
        return yScale(d[selectedAudioFeature])
    })
    .attr("r", function(d) {
        return 1;
    })
    .style("fill", "transparent")
    .on('mouseover', function(d) {
        // Highlight hovered circle
        d3.select(this)
        .style("stroke-opacity", 0.6)

        tooltipPlotScatter
        .style("left", d3.event.pageX  + "px")
        .style("top", d3.event.pageY  + "px")
        .style("display", "inline-block")
        .style("background","none repeat scroll 0 0 " + colorScale(d.album_name))
        .html(d.track_name + " - " + format(d[selectedAudioFeature]))

        /*
        // Add label group
        d3.select("#circles")
        .append("g")
        .attr("id", "circleLabel")
        
        // Add label text
        d3.select("#circleLabel")
        .append("text")
        .attr("id", "textLabel")
        .text(d.track_name + " - " + format(d[selectedAudioFeature]))
        .attr("x",  xScale(d.album_name))
        .attr("y", yScale(d[selectedAudioFeature]))
        .style("font-family", "sans-serif")
        .style("font-size", 12)
        .style("fill", "black")
        .attr("text-anchor", function() {
            if(xScale(d.album_name) > widthPlot/2) {return "end"}
            else return "start"
        })
        */
    
    })
    .on('mouseout', function(d) {
        // "Unhighlight"
         d3.select(this)
        .style("stroke-opacity", 1)

        tooltipPlotScatter.style("display", "none");
        /*
        // Remove label group
        d3.select("#circleLabel").remove();
        */
    })
    .style("stroke-width", 16)
    .style("stroke", function(d) {
        return colorScale(d.album_name)
    }) 
    //.style("stroke-opacity", function(d) {
    //    return d[selectedAudioFeature];
    //})
    }
}

// Update datatset (for both boxplot and scatterplot)
// according to selected artist and audio feature
function updateDataset(artistPosition) {
    albumsByArtist = [];
    tracksByAlbum = [];
    readData[artistPosition].albums.forEach(function(a) {
        var album = {
            'name' : a.name,
            'release_date' : a.release_date,
            'tracks' : a.tracks
        }
        albumsByArtist.push(a);
        a.tracks.forEach(function(t) {
             var track = {
                'album_name' : a.name,
                'release_date' : a.release_date,
                'track_name' : t.name,
                'disc_number' : t.disc_number,
                'track_number' : t.track_number,
                'danceability': t.danceability,
                'energy': t.energy,
                'key': t.key,
                'loudness': t.loudness,
                'mode': t.mode,
                'speechiness': t.speechiness,
                'acousticness': t.acousticness,
                'instrumentalness': t.instrumentalness,
                'liveness': t.liveness,
                'valence': t.valence,
                'tempo': t.tempo,
                'duration_ms': t.duration_ms,
                'time_signature': t.time_signature
            }
            tracksByAlbum.push(track);
        })
    })    
}
/*
// Change displayed albums accordingly to selected artist
function onChangeArtist(artistName) {
    //var artist = d3.select('#selectArtist').property('value')
    selectedArtistPosition = artistsList.indexOf(artistName);

    updateDataset(selectedArtistPosition);

    if(d3.select("#boxplotRadio").property("checked")){
        drawBoxPlot(tracksByAlbum, albumsByArtist);
    } else {
        drawScatterplot(tracksByAlbum, albumsByArtist);
    }
}
*/
// Change displayed values according to selected audio feature
function onChangeFeature() {
    selectedAudioFeature = d3.select('#selectAudioFeature').property('value')
    if(!artistWithNoInformation){
        if(d3.select("#boxplotRadio").property("checked")){
            drawBoxPlot(tracksByAlbum, albumsByArtist);
        } else {
            drawScatterplot(tracksByAlbum, albumsByArtist);
        }
    }
}

// Calls boxplot render function when
// respective radio button is checked
function onCheckBoxplot() {
    if(!artistWithNoInformation){
        drawBoxPlot(tracksByAlbum, albumsByArtist);
    }
    
}

// Calls scatterplot render function when
// respective radio button is checked
function onCheckScatterplot() {
    if(!artistWithNoInformation){
        drawScatterplot(tracksByAlbum, albumsByArtist);
    }
}

// Wrap text labels on x axis
function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1,
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}

function init() {
    // Create div for select and form elements
    var div = d3.select("body")
    .append("div")
    .append("text")
    .text("View by ")
    .style("font-family","sans-serif")

    /*
    // Create selected artist element
    var selectArtist = div.append("select")
    .attr("class","select")
    .attr("id", "selectArtist")
    .on("change", onChangeArtist);

    // Create options for select artist
    var artistOptions = selectArtist
    .selectAll('option')
    .data(artistsList).enter()
    .append('option')
    .text(function (d) { return d; });
    */

    // Create selected audio feature element
    var selectAudioFeature = div.append("select")
    .attr("class","select")
    .attr("id", "selectAudioFeature")
    .on("change", onChangeFeature);

    // Create options for select audio feature
    var audioFeatureOptions = selectAudioFeature
    .selectAll('option')
    .data(audioFeaturesList).enter()
    .append('option')
    .text(function (d) { return d; })
    .style("font-family","sans-serif")

    // Create form element
    var form = div.append("form")

    // Create radio button for boxplot option
    form.append("label")
    .text("Boxplot")
    .style("font-family","sans-serif")
    .append("input")
    .attr("id", "boxplotRadio")
    .attr("type", "radio")
    .attr("checked", true)
    .on("change",function() {
        d3.select("#scatterplotRadio").property("checked", false)
        onCheckBoxplot();
    });

    // Create radio button for scatterplot option
    form.append("label")
    .text("Scatterplot")
    .style("font-family","sans-serif")
    .append("input")
    .attr("id", "scatterplotRadio")
    .attr("type", "radio")
    .attr("checked", null)
    .on("change", function(){
        d3.select("#boxplotRadio").property("checked", false)
        onCheckScatterplot();
    })

    // Create crude SVG
    var crudeSVG = d3.select("body").append("svg").attr("id","svgPlot");

    // Set up svg dimensions
    var svgPlot = crudeSVG
        .attr("width", widthPlot + marginPlot.left + marginPlot.right)
	    .attr("height", heightPlot + marginPlot.top + marginPlot.bottom)
}

var svgPlot = init();