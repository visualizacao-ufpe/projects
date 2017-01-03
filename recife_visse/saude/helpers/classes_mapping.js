function escolaridade_mapping() {
  return {
    '43':'Analfabeto','1':'EF I Incompleto',
    '2':'EF I Completo','3':'EF II Incompleto',
    '4':'EF II Completo','5':'EM Incompleto',
    '6':'EM Completo','7':'ES Incompleto',
    '8':'ES Completo','9':'Ignorado',
    '10':'Não Se Aplica'
  };
}

function gestante_mapping() {
  return {
    '1':'1º Trimestre','2':'2º Trimestre',
    '3':'3º Trimestre','4':'Ignorada',
    '5':'Não Gestante','6':'Não Se Aplica',
    '9':'Ignorado'
  };
}

function raca_mapping() {
  return {
    '1':'Branca','2':'Preta',
    '3':'Amarela','4':'Parda',
    '5':'Indígena','9':'Ignorada',
    '':'Ignorada'
  };
}

function sexo_mapping() {
  return {'M': 'M', 'F' : 'F'};
}

function idade_mapping() {

}

function get_mapping_option(option) {
  var class_mapping = {
    'Sexo': sexo_mapping,
    'Escolaridade': escolaridade_mapping,
    'Gestante': gestante_mapping,
    'Raça': raca_mapping,
    'Idade': idade_mapping,
  };
  return class_mapping[option]();
}
