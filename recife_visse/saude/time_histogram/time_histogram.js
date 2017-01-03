file_name = ""

function formatData(data, granularity, inital_date, final_date) {

  var separator = data[0]['dt_notificacao'].split(' ')[0].indexOf('-') == -1 ? '/' : '-';

  data.forEach(function(d) {
      var date = d['dt_notificacao'].split(' ')[0];
      d['ano'] = date.split(separator)[0];
      d['mes'] = date.split(separator)[1];
      d['dia'] = date.split(separator)[2];
  });


  var monthIntToStr = function(month) {
                      return {1:'Jan', 2:'Feb', 3:'Mar',
                              4:'Apr', 5:'May', 6:'Jun',
                              7:'Jul', 8:'Aug', 9:'Sept',
                              10:'Oct', 11:'Nov', 12:'Dec'}[month];
                    };

  var filtered_data = filter_by_date(data, inital_date, final_date);
  var entry_freq = {};
  var start = inital_date;

  while (start <= final_date) {
    if(granularity == 'Yearly') {
      entry_freq[start.year()] = 0;
    } else {
      entry_freq[(start.month() + 1) + ' ' + start.year()] = 0;
    }
    start.add(1, 'day');
  }

  filtered_data.forEach(function(elem){
    if('Yearly' == granularity){
      entry_freq[elem.ano] += 1;
    } else {
      entry_freq[elem.mes + ' ' + elem.ano] += 1;
    }
  });

  result = [];

  for (var entry in entry_freq) {
      if('Yearly' == granularity){
        var label = entry;
      } else {
        splitted_entry = entry.split(' ');
        var label = splitted_entry[1] + ' ' + monthIntToStr(splitted_entry[0]);
      }

      result.push({'entry': label, 'freq': entry_freq[entry]});
  }

  var i = result.length;
  while(i--)
  {
    if(result[i].freq > 0) break;
    result.splice(i,1);
  }

  return result;
}

function init_time_histogram(locator, inital_date, final_date) {
  var inital_date = moment(inital_date);
  var final_date = moment(final_date);
  d3.json(file_name, function(data) {
    var data = formatData(data, getCheckedRadioButton(), inital_date, final_date);
    create_histogram(data, locator);
  });
}

function deleteHeatmap(map_loc, map_wrapper, inital_date, final_date) {
  var inital_date = moment(inital_date);
  var final_date = moment(final_date);
  $(map_loc).remove();
  $(map_wrapper).append('<div id="' + map_loc.substring(1) + '"></div>');
  init_map(file_name, map_loc, inital_date, final_date);
}

function update(svg_locator, initial_id, final_id) {
  deleteDiagram(svg_locator);
  init_time_histogram(svg_locator, $( initial_id).val(), $(final_id).val());
}

function data_update(data_option, map_wrapper, map_loc, histo_locator, initial_id, final_id) {
  file_name = get_data_option(data_option);
  update_filter_by_date(histo_locator, map_wrapper, map_loc, initial_id, final_id)
}

function update_filter_by_date(histo_locator, map_wrapper, map_locator, initial_id, final_id) {
  deleteDiagram(histo_locator);
  deleteHeatmap(map_locator, map_wrapper, $( initial_id).val(), $( final_id).val());
  init_time_histogram(histo_locator, $( initial_id).val(), $( final_id).val());
}
