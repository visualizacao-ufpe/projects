var wFare = 650,
    hFare = 400,
    marginFare = {top: 10, right: 20, bottom: 10, left: 20},
    fareDataset = [],
    fareTipSVG = {},
    selectedFareData = {},
    DAY_OF_WEEK = {
        0: "Mon", 1: "Tue", 2: "Wed", 3: "Thurs", 4: "Fri", 5: "Sat", 6: "Sun"
    };

function initFareTip() {
    fareTipSVG = d3.select("#boxplot")
        .append("svg")
        .attr("id", "fareTipSvg")
        .attr("width", wFare + marginFare.left + marginFare.right)
        .attr("height", hFare + marginFare.top + marginFare.bottom)
        .append("g")
        .attr("transform", "translate(" + marginFare.left + "," + marginFare.top + ")");

    fareTipSVG.append('g')
        .attr('class', 'xAxisFare')
        .attr("transform", "translate(20" + "," + (hFare - margin.bottom) + ")");

    fareTipSVG.append('g')
        .attr('class', 'yAxisFare')
        .attr("transform", "translate(" + (marginFare.left + 20) + "," + (-marginFare.bottom) + ")");

    readFareTipData();
}

function readFareTipData() {
    if (!loaded) {
        d3.json(chosenCabCategory, function(error, data) {
            if (error) throw error;
            loadedData = data.slice();
            selectedData = loadedData.slice();
            loaded = true;
            renderFareChart();
        });
    } else {
        renderFareChart();
    }
}

function getSelectedFareData() {
    selectedFareData = {};
    for (var key in DAY_OF_WEEK) {
        selectedFareData[key] = [];
    }
    for (var i = 0; i < selectedData.length; i++) {
        var curr = selectedData[i];
        for (var key in DAY_OF_WEEK) {
            if (curr.average_price != undefined && curr.average_price[key] != undefined &&
                    curr.average_tip != undefined && curr.average_tip[key] != undefined) {
                var total = curr.average_price[key] + curr.average_tip[key];
                selectedFareData[key].push(total);
            }
        }
    }
}

function renderFareChart() {
    getSelectedFareData();

    var xFareScale = d3.scaleLinear()
        .domain([0, 6])
        .range([marginFare.left + 20, wFare - marginFare.right]);

    var values = Object.values(selectedFareData)
    var yFareScale = d3.scaleLinear()
        .domain([d3.min(values, d=>d3.min(d))-1, d3.max(values,d=>d3.max(d))])
        .range([hFare + marginFare.top - 20, marginFare.bottom + 20]);

    var xAxisFare = d3.axisBottom(xFareScale).tickFormat(d=>DAY_OF_WEEK[d]);
    d3.select('g.xAxisFare').call(xAxisFare);

    var yAxisFare = d3.axisLeft(yFareScale).tickFormat(d => d+"$")
    d3.select('g.yAxisFare').transition().call(yAxisFare);

    fareDataset = [];
    for (var key in DAY_OF_WEEK) {
        var values = selectedFareData[key] == undefined ? [0] : selectedFareData[key];
        fareDataset.push({"key": key, "values": values});
    }

    // // Box plot itself
    fareDataset.forEach(function(val) {
        var key = val['key'];
        var values = val['values'];
        var size = values.length;
        console.log("key: " + key + "\t values.size: " + values.length);
        values.sort();

        // //Step 1: Plot horizontal lines
        var min = d3.min(values);
        var median = d3.median(values);
        var max = d3.max(values);
        var lineData = [min, median, max];

        var lines = d3.select("#fareTipSvg").selectAll('line.a'+key).data(lineData);
        lines.exit().remove();
        if (size > 0) {
            lines.enter()
                .append('line')
                .attr('class', 'l a'+key)
                .attr('x1', function(d){ return xFareScale(key) - (d == median ? 15 : 10)+40; })
                .attr('x2', function(d){ return xFareScale(key) + (d == median ? 15 : 10)+40; })
                .attr('y1', d => yFareScale(d))
                .attr('y2', d => yFareScale(d))

            lines.transition()
                .attr('class', 'l a'+key)
                .attr('x1', function(d){ return xFareScale(key) - (d == median ? 15 : 10)+40; })
                .attr('x2', function(d){ return xFareScale(key) + (d == median ? 15 : 10)+40; })
                .attr('y1', d => yFareScale(d))
                .attr('y2', d => yFareScale(d))

        }

        //Step 2: Plot box
        var q1 = d3.quantile(values, .25)
        var q3 = d3.quantile(values, .75)

        var rects = d3.select("#fareTipSvg").selectAll('rect.b'+key).data([[q1, q3]]);
        rects.exit().remove();
        if (size > 0) {
            rects.enter()
                .append('rect')
                .attr('class', 'box b'+key)
                .attr('x', xFareScale(key)+25)
                .attr('width', 30)
                .attr('y', d => yFareScale(d[1]))
                .attr('height', function(d){
                    var h = -(yFareScale(d[1])-yFareScale(d[0]));
                    return (h <= 0) ? 1 : h;
                });

            rects.transition()
                .attr('class', 'box b'+key)
                .attr('x', xFareScale(key)+25)
                .attr('width', 30)
                .attr('y', d => yFareScale(d[1]))
                .attr('height', function(d){
                    var h = -(yFareScale(d[1])-yFareScale(d[0]));
                    return (h <= 0) ? 1 : h;
                });
        }

        // // Step 3: Plot vertical lines
        var qs = [[q1, min], [q3, max]];
        var verticals = d3.select('#fareTipSvg').selectAll('line.b'+key).data(qs);
        verticals.exit().remove();
        if (size > 0) {
            verticals.enter()
                .append('line')
                .attr('class', 'l b'+key)
                .attr('x1', xFareScale(key)+40)
                .attr('x2', xFareScale(key)+40)
                .attr('y1', d => yFareScale(d[0]))
                .attr('y2', d => yFareScale(d[1]))
                .attr('stroke-dasharray', '2');

            verticals.transition()
                .attr('class', 'l b'+key)
                .attr('x1', xFareScale(key)+40)
                .attr('x2', xFareScale(key)+40)
                .attr('y1', d => yFareScale(d[0]))
                .attr('y2', d => yFareScale(d[1]))
                .attr('stroke-dasharray', '2');
        }

    })
}
