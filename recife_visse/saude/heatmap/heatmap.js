function getColor(d) {

    return d > 180 ? '#67000d' :
        d > 150 ? '#a50f15' :
        d > 130 ? '#cb181d' :
        d > 100 ? '#ef3b2c' :
        d > 50 ? '#fb6a4a' :
        d > 20 ? '#fc9272' :
        d > 10 ? '#fcbba1' :
        '#fee0d2';

}


function style(feature) {

    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColor(result[feature.properties.bairro_nome_ca])
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);

}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

var result = [];
var geojson;
var info;

function init_map(file_name, map_loc, inital_date, final_date) {
    d3.json("bairros.json", function(data1) {
        d3.json(file_name, function(data2) {
            data1.forEach(
                function(d) {
                    result[d['Nome Localidade']] = 0;
                }
            );
            var separator = data2[0]['dt_notificacao'].split(' ')[0].indexOf('-') == -1 ? '/' : '-';
            data2.forEach(function(d) {
                var date = d['dt_notificacao'].split(' ')[0];
                d['ano'] = date.split(separator)[0];
                d['mes'] = date.split(separator)[1];
                d['dia'] = date.split(separator)[2];
            });

            var filtered_data = filter_by_date(data2, inital_date, final_date);
            filtered_data.forEach(function(d) {
                result[d['no_bairro_residencia']] += 1;
            });
            var map = L.map('map').setView([-8.05596, -34.87986], 12);

            L.tileLayer(
                'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {}).addTo(map);

            info = L.control();

            info.onAdd = function(map) {
                this._div = L.DomUtil.create('div', 'info');
                this.update();
                return this._div;
            };

            info.update = function(props) {

                this._div.innerHTML = '<h4>Casos ' + get_data_option_reverse(file_name) +'</h4>' + (props ?
                    '<b>' + props.bairro_nome_ca + '</b><br />' +
                    " \n Quantidade Casos:" + result[props.bairro_nome_ca] :
                    'Passe por um bairro');
            };

            info.addTo(map);

            geojson = L.geoJson(stateData, {
                style: style,
                onEachFeature: onEachFeature
            }).addTo(map);



            var legend = L.control({
                position: 'bottomright'
            });

            legend.onAdd = function(map) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0, 10, 20, 50, 100, 130, 150, 180],
                    labels = [],
                    from, to;

                for (var i = 0; i < grades.length; i++) {
                    from = grades[i];
                    to = grades[i + 1];

                    labels.push(
                        '<i style="background:' + getColor(from + 1) + '"></i> ' +
                        from + (to ? '&ndash;' + to : '+'));
                }

                div.innerHTML = labels.join('<br>');
                return div;
            };

            legend.addTo(map);


        })
    })
}
