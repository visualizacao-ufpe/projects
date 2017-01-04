import { parse } from 'papaparse';
import * as crossfilter from 'crossfilter';

const PATH = "../../data/politicodw_2015_recente.csv";
const CROSSFILTER = crossfilter.default();

export default class Gastos {
    static loadData() {
        return new Promise(function(fulfill, reject) {
            let options = {
                delimiter: ";",
                header: true,
                download: true,
                complete: fulfill,
                skipEmptyLines: true,
                dynamicTyping: true
            }
            parse(PATH, options);
        }).then(function(results) {
            CROSSFILTER.add(results.data);
            return;
        });
    }

    static crossfilter() {
        return CROSSFILTER;
    }
}
