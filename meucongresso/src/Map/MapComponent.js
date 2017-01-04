import * as d3 from 'd3'
import Gastos from '../DataHandler/Gastos'
import BrazilGeoJSON from '../DataHandler/BrazilGeoJSON'
import Util from '../Util/Util'
import Event, * as Events from '../Events/Events'
import tip from "d3-tip"

const NUMBER_OF_REGIONS = 27;

const REGION_TO_CODE = {
    'AC': 12,
    'AL': 27,
    'AM': 13,
    'AP': 16,
    'BA': 29,
    'CE': 23,
    'DF': 53,
    'ES': 32,
    'GO': 52,
    'MA': 21,
    'MG': 31,
    'MS': 50,
    'MT': 51,
    'PA': 15,
    'PB': 25,
    'PE': 26,
    'PI': 22,
    'PR': 41,
    'RJ': 33,
    'RN': 24,
    'RO': 11,
    'RR': 14,
    'RS': 43,
    'SC': 42,
    'SE': 28,
    'SP': 35,
    'TO': 17
};

const CODE_TO_REGION = {
    '12': 'AC',
    '27': 'AL',
    '13': 'AM',
    '16': 'AP',
    '29': 'BA',
    '23': 'CE',
    '53': 'DF',
    '32': 'ES',
    '52': 'GO',
    '21': 'MA',
    '31': 'MG',
    '50': 'MS',
    '51': 'MT',
    '15': 'PA',
    '25': 'PB',
    '26': 'PE',
    '22': 'PI',
    '41': 'PR',
    '33': 'RJ',
    '24': 'RN',
    '11': 'RO',
    '14': 'RR',
    '43': 'RS',
    '42': 'SC',
    '28': 'SE',
    '35': 'SP',
    '17': 'TO'
}

export default class MapComponent {
    constructor(container) {
        var self = this;
        self.WIDTH = 400;
        self.HEIGHT = 400;
        self.SCALE = 580;
        self.MARGIN = { top: 20, right: 20, bottom: 20, left: 20 }

        self.container = container;

        self.updateDimensions = () => {
            const innerWidth = document.documentElement.clientWidth || document.body.clientWidth;
            self.WIDTH = innerWidth / 2;
        }

        $("#select-skb-exhi").change(function(){
            self.render()
        });

        self.render = () => {
            d3.select(`${self.container} > svg`).remove();

            self.updateDimensions();

            self.SVG = d3.select(self.container)
                .append('svg')
                .attr('id', 'map')
                .attr('width', self.WIDTH)
                .attr('height', self.HEIGHT)
                .append('g')
                .attr('transform', 'translate(' + self.MARGIN.left + ', ' + self.MARGIN.top + ')');

            const normalizedValues = $("#select-skb-exhi").val() == 2;

            self.drawMap(normalizedValues);
            self.drawLegend(normalizedValues);
        }

        self.drawMap = (normalizedValues) => {
            let data = BrazilGeoJSON.getGeoJSON();
            var centroid = d3.geoCentroid(data);

            var projection = d3.geoMercator()
                .scale([self.SCALE])
                .translate([self.WIDTH / 2, self.HEIGHT / 2])
                .center(centroid);

            var path = d3.geoPath()
                .projection(projection);

            var bounds = path.bounds(data);

            var width = self.WIDTH - self.MARGIN.left - self.MARGIN.right,
                height = self.HEIGHT - self.MARGIN.top - self.MARGIN.bottom;

            var offset = [
                width + 60 - (bounds[0][0] + bounds[1][0]) / 2,
                height + 30 - (bounds[0][1] + bounds[1][1]) / 2
            ];

            projection.translate(offset);

            let mapTip = tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              .html(function(d) {
                  const region = CODE_TO_REGION[d.properties.ADMINCODE];
                  const expense = self.expensesByRegion[region];
                  let meanValue = expense;
                  if (normalizedValues) {
                      const politicians = self.politiciansByRegion[region];
                      meanValue = expense / politicians;
                  }

                  return "<strong style='color:#EFD469'>"+ region +"</strong><br /><span>" + Number(meanValue).toLocaleString('br', { style: 'currency', currency: 'BRL', currencyDisplay: 'symbol' }) + "</span></div>";
            });
            self.SVG.call(mapTip);

            self.SVG.selectAll('path')
                .data(data.features)
                .enter()
                .append('path')
                .attr('fill', '#FFF7F9')
                .attr('d', path)
                .attr('data-regionCode', d => d.properties.ADMINCODE)
                .call(selection => self.paintRegions(selection, normalizedValues))
                .call(self.setupMapRegion)
                .on('mouseover', mapTip.show)
                .on('mouseout', mapTip.hide);
        }

        self.drawLegend = (normalizedValues) => {
            const INITIAL_X = 60;
            const INITIAL_Y = 230;
            const MARGIN = 10;
            const SIZE = 20;

            const meanExpenseByRegion = (index) => {
                const region = self.orderedExpensesOfRegions[index].key;
                if (normalizedValues) {
                    return self.expensesByRegion[region] / self.politiciansByRegion[region];
                } else {
                    return self.expensesByRegion[region];
                }
            }

            self.SVG.selectAll('rect')
                .data([0, 6, 12, 18, 26])
                .enter()
                .append('rect')
                .attr('stroke', 'gray')
                .attr('stroke-width', '0.02em')
                .attr('fill', d => self.colorScale(meanExpenseByRegion(d)))
                .attr('x', INITIAL_X)
                .attr('y', d => INITIAL_Y + (Math.floor(d / 6)) * (MARGIN + SIZE))
                .attr('height', SIZE)
                .attr('width', SIZE);

            self.SVG.selectAll('text')
                .data([0, 6, 12, 18, 26])
                .enter()
                .append('text')
                .attr('x', INITIAL_X + SIZE + MARGIN)
                .attr('y', d => INITIAL_Y + (Math.floor(d / 6)) * (MARGIN + SIZE) + 17)
                .text(d => self.formatCurrency(meanExpenseByRegion(d).toFixed(2)));
        }

        self.formatCurrency = (value) => {
            return Number(value).toLocaleString('br', { style: 'currency', currency: 'BRL', currencyDisplay: 'symbol' })
        }

        self.paintRegions = (selection, normalizedValues) => {
            const expensesByRegionVector = Gastos.crossfilter()
                .dimension(d => d.estado)
                .group()
                .reduceSum(d => parseFloat(d.gastoValor))
                .all();

            let counters = {};

            if (normalizedValues) {
                const politiciansByRegionVector = Gastos.crossfilter()
                    .dimension(d => d.estado)
                    .group()
                    .reduce((p, d) => {
                        if (!(d.politicoId in counters)) {
                            counters[d.politicoId] = true;
                            return p + 1;
                        }

                        return p;
                    }, (p, d) => p, d => 0)
                    .all();

                self.politiciansByRegion = Util.fromArray(politiciansByRegionVector,
                        e => e.key,
                        e => e.value);
            }

            if (normalizedValues) {
                expensesByRegionVector.sort((a, b) => {
                    const A = a.value / self.politiciansByRegion[a.key];
                    const B = b.value / self.politiciansByRegion[b.key];
                    return A - B;
                });
            } else {
                expensesByRegionVector.sort((a, b) => a.value - b.value);
            }

            self.orderedExpensesOfRegions = expensesByRegionVector;

            const leastSpendingState = expensesByRegionVector[0].key;
            const mostSpendingSate = expensesByRegionVector[expensesByRegionVector.length - 1].key;

            self.expensesByRegion = Util.fromArray(expensesByRegionVector,
                    e => e.key,
                    e => e.value);

            let start, end;
            if (normalizedValues) {
                start = self.expensesByRegion[leastSpendingState]
                    / self.politiciansByRegion[leastSpendingState];

                end = self.expensesByRegion[mostSpendingSate]
                    / self.politiciansByRegion[mostSpendingSate];
            } else {
                start = self.expensesByRegion[leastSpendingState];
                end = self.expensesByRegion[mostSpendingSate];
            }

            self.colorScale = d3.scaleLinear()
                .range(['#fff7bc', '#662506'])
                .domain([start, end]);

            selection.attr('fill', function(d) {
                const region = CODE_TO_REGION[d.properties.ADMINCODE];
                if (normalizedValues) {
                    const politicians = self.politiciansByRegion[region];
                    const expense = self.expensesByRegion[region];
                    return self.colorScale(expense / politicians);
                } else {
                    return self.colorScale(self.expensesByRegion[region]);
                }
            });
        }

        self.filterRegionByCode = (regionCode) => {
            self.regionDimension = self.regionDimension || Gastos.crossfilter()
                .dimension(d => d.estado);

            self.regionDimension.filter(regionCode);
        }

        self.setupMapRegion = (regions) => {
            regions.each(function(region) {
                let code = region.properties.ADMINCODE;
                let el = d3.select(this);

                el.on('click', _ => {
                    const selected = el.classed('map-region-selected');
                    const codeToSend = !selected ? CODE_TO_REGION[code] : null;

                    self.filterRegionByCode(codeToSend);
                    Event.trigger(Events.REGION_SELECTED, self, codeToSend);

                    self.SVG.select('path.map-region-selected')
                        .classed('map-region-selected', false);
                    el.classed('map-region-selected', !selected);
                });

                el.on('mouseover', _ => {
                    el.classed('map-region-hover', true);
                });

                el.on('mouseout', _ => {
                    el.classed('map-region-hover', false);
                });
            })
        }
    }
}
