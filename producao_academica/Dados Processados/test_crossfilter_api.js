
d3.json("data.json", function(data) {

  var cf = crossfilter(data);

  var researchLineDimension        = cf.dimension(function(d) {return d.researchLine;}),
  worksByResearchLine = researchLineDimension.group().reduceCount();
  console.log(researchLineDimension.top(4))
  console.log(worksByResearchLine.size())
  // Create dimension by year
  var byYear = cf.dimension(function(p) {return p.year;});

  byYear.filter("2014");
  console.log("Trabalhos do ano de 2014: "+byYear.top(Infinity).length);

  // Clear filter
  byYear.filterAll();

  // Create dimension by researchLine
  var byResearchLine = cf.dimension(function(p) {return p.researchLine})

  byResearchLine.filter("ENGENHARIA DE SOFTWARE")
  console.log("Projetos de ENGENHARIA DE SOFTWARE: "+byResearchLine.top(Infinity).length)

  // Clear filter
  byResearchLine.filterAll();

  byResearchLine.filter("M\u00CDDIA E INTERA\u00C7\u00C3O")
  console.log("Trabalhos de MÍDIA E INTERAÇÃO: "+byResearchLine.top(Infinity).length)

  byResearchLine.filterAll();

  // Create dimension by author
  var byAuthor = cf.dimension(function(p) {
    console.log(p.authors);
    return p.authors;
  });

  function filterAlter(values) {
    return function(v) {
      return values.indexOf(v) !== -1;
    }
  }

  byAuthor.filterFunction(filterAuthor("BERNARDO FONSECA REIS DE SOUZA"))

  byAuthor.filterFunction(function(d) {
    for (var author in d){
      if(author.name == "BERNARDO FONSECA REIS DE SOUZA"){

      }
    }
    return d % 2;
  });
  console.log("Trabalhos de BERNARDO FONSECA REIS DE SOUZA: ")
  console.log(byAuthor.top(Infinity))

})
