import * as d3 from 'd3'

const GEOJSON_PATH = '../../data/brazil.geojson';
const GEOJSON_DATA = {};

export default class BrazilGeoJSON {
    static loadData() {
        return new Promise(function(fulfill, reject) {
            d3.json(GEOJSON_PATH, function(json) {
                Object.assign(GEOJSON_DATA, json);
                fulfill();
            });
        })
    }

    static getGeoJSON() {
        return GEOJSON_DATA;
    }
}
