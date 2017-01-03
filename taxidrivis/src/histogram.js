var marginHist = {top: 20, right: 20, bottom: 40, left: 60};
var wHist = 600 - marginHist.left - marginHist.right;
var hHist = 300 - marginHist.top - marginHist.bottom;
var histSvg;

var barWidth = 50;

var pickup_key = "pickups_day_week";
var dropoff_key = "dropoffs_day_week";
var hist_filteredPoints = [];

var histXAxis = false;
var histYAxis = false;

function prettyDay(day) {
    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return days[day];
}

function groupTrips() {
    return hist_filteredPoints.reduce(function(counts, curr) {
                        Object.keys(curr).forEach(function(day) {
                            counts[day] ? counts[day] += curr[day] : counts[day] = curr[day];
                        });
                        return counts;
                    }, {});
}

function renderHistogram() {
    if (loaded) {
        filterPointsByCategory();
        var tripsPerDayHist = groupTrips();
    
        var tripsArray = [];
        Object.keys(tripsPerDayHist).forEach(function(day) {
            tripsArray.push({'day': day, 'count': tripsPerDayHist[day]});
        });
        tripsArray.sort(function(a, b) { return a.day - b.day; });

        var x = d3.scalePoint()
                    .domain(Object.keys(tripsPerDayHist))
                    .range([0, wHist - marginHist.right]);
        
        var y = d3.scaleLinear()
                    .domain([0, d3.max(tripsArray, function(d) { return d.count; })])
                    .range([hHist, 0]);
        
        var histBind = histSvg.selectAll("rect")
                                .data(tripsArray);
        
        // insertion
        histBind.enter()
            .append("rect")
            .attr("x", function(d, i) {
                return x(d.day);
            })
            .attr("y", function(d) {
                return y(d.count);
            })
            .attr("width", barWidth)
            .attr("height", function(d) {
                return hHist - y(d.count);
            })
            .attr("fill", "#9499c4")
            .attr("stroke-width", "1px")
            .attr("stroke","black");

        // removal
        histBind.exit()
                .remove();
        
        // update
        histBind.transition()
            .attr("x", function(d, i) {
                return x(d.day);
            })
            .attr("y", function(d) {
                return y(d.count);
            })
            .attr("width", barWidth)
            .attr("height", function(d) {
                return hHist - y(d.count);
            })
            .attr("fill", "#9499c4")
            .attr("stroke-width", "1px")
            .attr("stroke","black");
        
        var xAxisHist = d3.axisBottom(x).tickFormat(function(d) { return prettyDay(d); });
        
        if (!histXAxis) {
            histSvg.append("g")
                    .attr("id","xAxisHist")
                    .attr("transform","translate(0," + hHist + ")")
                    .call(xAxisHist);
            histXAxis = true;
        }

        histSvg.select("#xAxisHist")
                .transition()
                .call(xAxisHist);

        var yAxisHist = d3.axisLeft(y);

        if (!histYAxis) {
            histSvg.append("g")
                    .attr("id","yAxisHist")
                    .call(yAxisHist);
            histYAxis = true;
        }

        histSvg.select("#yAxisHist")
                .transition()
                .call(yAxisHist);

    } else {
        console.log("Error. data should have been loaded");
    }
}

function filterPointsByCategory() {
    hist_filteredPoints = [];
    selectedData.forEach(function(datum) {
        if (chosenTripCategory === "pickups") {
            if (datum[pickup_key]) {
                hist_filteredPoints.push(datum[pickup_key]);
            }
        } else {
            if (datum[dropoff_key]) {
                hist_filteredPoints.push(datum[dropoff_key]);
            }
        }
    });
}

function readHistData() {
    if (!loaded) {
        d3.json(chosenCabCategory, function(error, data) {
            if (error) throw error;
            loadedData = data.slice();
            selectedData = loadedData.slice();
            loaded = true;
            renderHistogram();
        });
    } else {
        renderHistogram();
    }
}

function initHist() {
    histSvg = d3.select("#histogram")
                .append("svg")
                .attrs({
                    id : "hist",
                    width : wHist + marginHist.left + marginHist.right,
                    height: hHist + marginHist.top + marginHist.bottom,
                    transform : "translate(" + marginHist.left + "," + marginHist.top + ")"
                })
                .attr("class", "hist")
                .append("g")
                    .attr("transform", "translate(" + marginHist.left + "," + marginHist.top + ")");
    
    readHistData();
}