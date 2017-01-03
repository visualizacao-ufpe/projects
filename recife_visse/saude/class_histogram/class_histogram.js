file_name = ""

function normalize_nascimento(entry_freq){
  var result = [];
  var normalized = [];
  var maxAge = 0;
  var minAge = Number.MAX_SAFE_INTEGER;

  for(var entry in entry_freq){
    var freq = entry_freq[entry];
    var time = moment(entry);
    var age = moment().diff(time, 'years');
    minAge = age < minAge ? age : minAge;
    maxAge = age > maxAge ? age : maxAge;

    if(!isNaN(age)){
      normalized.push({'entry': age});
    }
  }

  while(minAge < maxAge){
    var interval = [minAge,minAge+9];
    var freq = 0;
    normalized.forEach(function(elem){
      if(elem.entry >= interval[0] && elem.entry < interval[1]){
        freq += 1;
      }
    });


    result.push({'entry': parseInt(interval[0]) + '-' + parseInt(interval[1]),
                'freq': freq});
    minAge += 10;
  }

  return result;
}

function normalize_escolaridade(entry_freq){
  var result = [];

  var escolaridade_mapping = {
    '43':'Analfabeto','1':'EF I Incompleto',
    '2':'EF I Completo','3':'EF II Incompleto',
    '4':'EF II Completo','5':'EM Incompleto',
    '6':'EM Completo','7':'ES Incompleto',
    '8':'ES Completo','9':'Ignorado',
    '10':'Não Se Aplica',
  };

  for(var entry in entry_freq){
    result.push({'entry': escolaridade_mapping[entry], 'freq': entry_freq[entry]});
  }

  return result;
}

function normalize_gestante(entry_freq){
  var result = [];

  var gestante_mapping = {
    '1':'1º Trimestre','2':'2º Trimestre',
    '3':'3º Trimestre','4':'Ignorada',
    '5':'Não Gestante','6':'Não Se Aplica',
    '9':'Ignorada','':'Ignorada'
  };

  for(var entry in entry_freq){
    result.push({'entry': gestante_mapping[entry], 'freq': entry_freq[entry]});
  }

  return result;
}

function normalize_raca_cor(entry_freq){
  var result = [];

  var raca_mapping = {
    '1':'Branca','2':'Preta',
    '3':'Amarela','4':'Parda',
    '5':'Indígena','9':'Ignorada',
    '':'Ignorada'
  };

  for(var entry in entry_freq){
    result.push({'entry': raca_mapping[entry], 'freq': entry_freq[entry]});
  }

  return result;
}

function normalize_sexo(entry_freq){
  var result = [];

  for(var entry in entry_freq){
    result.push({'entry': entry, 'freq': entry_freq[entry]});
  }

  return result;
}

function normalize_columns(entry_freq, column) {
  var normalization_mapping = {
    'dt_nascimento': normalize_nascimento,
    'tp_escolaridade': normalize_escolaridade,
    'tp_gestante': normalize_gestante,
    'tp_raca_cor': normalize_raca_cor,
    'tp_sexo': normalize_sexo
  };

  return normalization_mapping[column](entry_freq);
}


function get_column(type){
  var column_mapping = {
    'Idade': 'dt_nascimento',
    'Escolaridade': 'tp_escolaridade',
    'Gestante': 'tp_gestante',
    'Raça': 'tp_raca_cor',
    'Sexo': 'tp_sexo'
  };

  return column_mapping[type];
}


function get_cases(data, column) {

  var set = new Set()
  data.forEach(function(elem){
    set.add(elem[column]);
  });

  return set;
}

function format_data(data, type) {
  var column = get_column(type)
  var cases = get_cases(data, column);
  var entry_freq = {};

  cases.forEach(function(value) {
    entry_freq[value] = 0;
  });

  data.forEach(function(elem){
   entry_freq[elem[column]] += 1;
  });

  var result = normalize_columns(entry_freq, column);

  return result;
}

function update(svg_locator, type) {
  deleteDiagram(svg_locator); //On helper file
  init_class_histogram(svg_locator, type);
}

function data_update(data_option, svg_locator, type) {
  file_name = get_data_option(data_option);
  update(svg_locator, type);
}

function init_class_histogram(locator, type) {
  d3.json(file_name, function(data) {
    var data = format_data(data,type);
    create_histogram(data, locator);
  });
}
