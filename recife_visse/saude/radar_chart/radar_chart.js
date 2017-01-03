file_name = ""

function radar_input(result, classes, filters, treat_column) {
    var input = [];
    classes.forEach(function(elem_class) {
        // Performance improvement: Do the filtering in the calculate_result function
        if (filters.indexOf(treat_column(elem_class)) != -1) {
            input.push({
                className: treat_column(elem_class),
                axes: [{
                    axis: "mialgia",
                    value: result[elem_class].mialgia
                }, {
                    axis: "febre",
                    value: result[elem_class].febre,
                    xOffset: -10
                }, {
                    axis: "cefaleia",
                    value: result[elem_class].cefaleia
                }, {
                    axis: "vomito",
                    value: result[elem_class].vomito
                }, {
                    axis: "nausea",
                    value: result[elem_class].nausea,
                    xOffset: 20
                }]
            });
        }
    });
    return input;
}

function calculate_result(classes, data, column) {

  var result = {};

  classes.forEach(function(c){
      result[c] = {
            'mialgia': 0,
            'febre': 0,
            'cefaleia': 0,
            'vomito': 0,
            'nausea': 0
      };
    }
  );
  data.forEach(function(elem) {
      var elem_class = elem[column];
      if (classes.indexOf(elem_class) != -1) {
          result[elem_class].mialgia = elem.mialgia != NaN && elem.mialgia != 1 ? result[elem_class].mialgia + 1 : result[elem_class].mialgia;
          result[elem_class].febre = elem.febre != NaN && elem.febre != 1 ? result[elem_class].febre + 1 : result[elem_class].febre;
          result[elem_class].cefaleia = elem.cefaleia != NaN && elem.cefaleia != 1 ? result[elem_class].cefaleia + 1 : result[elem_class].cefaleia;
          result[elem_class].vomito = elem.vomito != NaN && elem.vomito != 1 ? result[elem_class].vomito + 1 : result[elem_class].vomito;
          result[elem_class].nausea = elem.nausea != NaN && elem.nausea != 1 ? result[elem_class].nausea + 1 : result[elem_class].nausea;
      }
  });
  return result;
}

function sexo_radar(data, filters) {

    var classes = ['M','F'];

    return radar_input(calculate_result(classes, data, 'tp_sexo'), classes, filters, function(e){return e;});
}

function idade_radar(data) {

}

function escolaridade_radar(data, filters) {
  var classes = ['43','1','2','3','4','5','6','7','8','9','10'];

  var treat_column = function(e){
    var escolaridade_mapping = get_mapping_option('Escolaridade');
    return escolaridade_mapping[e];
  };

  return radar_input(calculate_result(classes, data, 'tp_escolaridade'), classes, filters, treat_column);

}

function gestante_radar(data, filters) {

  var classes = ['1','2','3','4','5','6','7','8','9'];

  var treat_column = function(e){
    var escolaridade_mapping = get_mapping_option('Gestante');
    return escolaridade_mapping[e];
  };

  return radar_input(calculate_result(classes, data, 'tp_gestante'), classes, filters, treat_column);


}

function raca_radar(data, filters) {

  var classes = ['1','2','3','4','5','9'];

  var treat_column = function(e){
    var raca_mapping = get_mapping_option('Raça');
    return raca_mapping[e];
  };

  return radar_input(calculate_result(classes, data, 'tp_raca_cor'), classes, filters, treat_column);

}

function get_radar_function(type) {
    var function_mapping = {
        'Sexo': sexo_radar,
        'Idade': idade_radar,
        'Escolaridade': escolaridade_radar,
        'Gestante': gestante_radar,
        'Raça': raca_radar,
    };
    return function_mapping[type];
}

function create_radar(data, locator) {
    RadarChart.defaultConfig.levelTick = true;
    RadarChart.draw(locator, data);
}

function update(svg_locator, option_locator_1, option_locator_2, type) {
    deleteDiagram(svg_locator); //On helper file
    init_radar_histogram(svg_locator, option_locator_1, option_locator_2, type);
}

function update_data(option, svg_locator, option_locator_1, option_locator_2, type){
  file_name = get_data_option(option);
  update(svg_locator, option_locator_1, option_locator_2, type);
}

function get_filters(filter_1, filter_2) {
    var filters = [];
    filters.push($(filter_1 + ' option:selected').text());
    filters.push($(filter_2 + ' option:selected').text());
    return filters;
}

function init_radar_histogram(select_locator, option_locator_1, option_locator_2, type) {
    d3.json(file_name, function(data) {
        var radar_data_foo = get_radar_function(type);
        var filters = get_filters(option_locator_1, option_locator_2);
        create_radar(radar_data_foo(data, filters), select_locator);
    });
}
