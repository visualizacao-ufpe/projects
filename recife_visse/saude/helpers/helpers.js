var margin = {top: 20, right: 20, bottom: 30, left: 40};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

function createSvg(locator) {
  return d3.select(locator)
          .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");
}

function create_histogram(data, svg_locator) {
  var xScale = d3.scaleBand()
            .range([0, width])
            .padding(0.1);

  var yScale = d3.scaleLinear()
            .range([height, 0]);

  var svg = createSvg(svg_locator);

  xScale.domain(data.map(function(d) { return d.entry; }));
  yScale.domain([0, d3.max(data, function(d) { return d.freq; })]);

  svg.selectAll(".bar")
     .data(data)
     .enter().append("rect")
     .attr("class", "bar")
     .attr("x", function(d) { return xScale(d.entry); })
     .attr("width", xScale.bandwidth())
     .attr("y", function(d) { return yScale(d.freq); })
     .attr("height", function(d) { return height - yScale(d.freq); });

  svg.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(xScale));

  svg.append("g")
     .call(d3.axisLeft(yScale));
}

function deleteDiagram(loc) {
  d3.selectAll(loc + " svg").remove();
}

function filter_by_date(data, inital_date, final_date) {
  console.log(data[0])
  return data.filter(function(elem) {
    var elem_date = moment(elem.mes + '/' + elem.dia + '/' + elem.ano);
    return elem_date >= moment(inital_date) && elem_date <= moment(final_date);
  });
};

function get_data_option(option) {
  var data_mapping = {
    'Chikungunya':'chikungunya.json',
    'Zika':'zika.json',
    'Dengue':'dengue.json'
  };
  return data_mapping[option];
}

function get_data_option_reverse(option) {
  var data_mapping = {
    'chikungunya.json':'Chikungunya',
    'zika.json':'Zika',
    'dengue.json':'Dengue'
  };
  return data_mapping[option];
}
