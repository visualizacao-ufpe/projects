import * as d3 from 'd3v3';
import $ from 'jquery';
import Gastos from '../DataHandler/Gastos'

export default class TreemapComponent {
    constructor(container, colorCategory) {
        var self = this;
        self.colorCategory = colorCategory;
        self.WIDTH = 800;
        self.HEIGHT = 856;
        self.MARGIN = { top: 24, right: 10, bottom: 10, left: 10 },
        self.container = container;
        self.defaults = {
            rootname: 'TOP',
            format: ',d',
            title: ''
        };

        self.updateDimensions = () => {
            const innerWidth = document.documentElement.clientWidth || document.body.clientWidth;
            self.WIDTH = innerWidth / 2;
        }

        self.defaultData = () => {
            let tipoPartidoNomeDim = Gastos.crossfilter()
                .dimension((d) => [d.gastoTipo, d.partido, d.nomeParlamentar, d.estado]
                        .join(';'));

            let dataset = tipoPartidoNomeDim.group()
            .reduceSum(d => parseFloat(d.gastoValor))
            .all();

            let res = [];
            for (let d of dataset) {
                let values = d.key.split(';');
                res.push({
                    key: values[0],
                    region: values[1],
                    subregion: values[2],
                    value: d.value
                });
            }

            var data = d3.nest()
                .key(d => d.region)
                .key(d => d.subregion)
                .entries(res);

            return { options: { title: ''}, data: { key: 'Congresso', values: data } };
        }

        self.render = (o, data) => {
            d3.select(`${self.container} > svg`).remove();

            self.updateDimensions();

            if (data === undefined) {
                ({ o, data } = self.defaultData());
            }

            var root,
                opts = $.extend(true, {}, self.defaults, o),
                formatNumber = d3.format(opts.format),
                rname = opts.rootname,
                margin = opts.margin,
                theight = 36 + 16;

            var width = self.WIDTH - self.MARGIN.left - self.MARGIN.right,
                height = self.HEIGHT - self.MARGIN.top - self.MARGIN.bottom - theight,
                transitioning;

            var colorD3 = d3.scale.category20c();

            var color = function(d, titleName) {
                if(titleName.indexOf("/") >= 0) {
                    if(titleName.indexOf("/") != titleName.lastIndexOf("/")) {
                        // TA NO ULTIMO NIVEL
                        return self.colorCategory(d.key);
                    } else {
                        // TA NO NIVEL INTERMEDIARIO
                        // olha se eh parlamentar
                        if(d.parent.parent.key == "Congresso") {
                            return colorD3(d.parent.key);
                        } else {
                            // olha se eh tipo de gasto
                            if(d.parent.parent.parent.key == "Congresso") {
                                return colorD3(d.parent.key);
                            } else {
                                return "rgb(255, 255, 255)";
                            }
                        }
                    }
                } else {
                    // TA NO PRIMEIRO NIVEL
                    // olha se eh partido
                    if(d.parent.key == "Congresso") {
                        return colorD3(d.key);
                    } else {
                        // olha se eh parlamentar
                        if(d.parent.parent.key == "Congresso") {
                            return colorD3(d.parent.key);
                        } else {
                            return "rgb(255, 255, 255)";
                        }
                    }
                }
            };

            var x = d3.scale.linear()
                .domain([0, width])
                .range([0, width]);

            var y = d3.scale.linear()
                .domain([0, height])
                .range([0, height]);

            var treemap = d3.layout.treemap()
                .children((d, depth) => depth ? null : d._children)
                .sort((a, b) => a.value - b.value)
                .ratio(height / width * 0.5 * (1 + Math.sqrt(5)))
                .round(false);

            var svg = d3.select(self.container)
                .append('svg')
                .attr('width', self.WIDTH)
                .attr('height', height + self.MARGIN.bottom + self.MARGIN.top)
                .append('g')
                .attr('transform', 'translate(' + self.MARGIN.left + ', ' + self.MARGIN.top + ')')
                .style('shape-rendering', 'crispEdges');

            var grandparent = svg.append('g')
                .attr('class', 'grandparent');

            grandparent.append('rect')
                .attr('y', -self.MARGIN.top)
                .attr('width', width)
                .attr('height', self.MARGIN.top);

            grandparent.append('text')
                .attr('x', 6)
                .attr('y', 6 - self.MARGIN.top)
                .attr('dy', '.75em');

            if (data instanceof Array) {
                root = { key: rname, values: data };
            } else {
                root = data;
            }

            initialize(root);
            accumulate(root);
            layout(root);
            display(root);

            function initialize(root) {
                root.x = root.y = 0;
                root.dx = width;
                root.dy = height;
                root.depth = 0;
            }

            // Aggregate the values for internal nodes. This is normally done by the
            // treemap layout, but not here because of our custom implementation.
            // We also take a snapshot of the original children (_children) to avoid
            // the children being overwritten when when layout is computed.
            function accumulate(d) {
                //console.log("Accumulate");
                //console.log(d);
                return (d._children = d.values)
                    ? d.value = d.values.reduce((p, v) => p + accumulate(v), 0)
                    : d.value;
            }

            function formatCurrency(value) {
                return Number(value).toLocaleString('br', { style: 'currency', currency: 'BRL', currencyDisplay: 'symbol' })
            }

            // Compute the treemap layout recursively such that each group of siblings
            // uses the same size (1×1) rather than the dimensions of the parent cell.
            // This optimizes the layout for the current zoom state. Note that a wrapper
            // object is created for the parent node for each group of siblings so that
            // the parent’s dimensions are not discarded as we recurse. Since each group
            // of sibling was laid out in 1×1, we must rescale to fit using absolute
            // coordinates. This lets us use a viewport to zoom.
            function layout(d) {
                if (d._children) {
                    treemap.nodes({ _children: d._children });
                    d._children.forEach(function(c) {
                        c.x = d.x + c.x * d.dx;
                        c.y = d.y + c.y * d.dy;
                        c.dx *= d.dx;
                        c.dy *= d.dy;
                        c.parent = d;
                        layout(c);
                    });
                }
            }

            function display(d) {

                var titleName = name(d);

                grandparent.datum(d.parent)
                    .on('click', transition)
                    .select('text')
                    .text(titleName);

                var g1 = svg.insert('g', '.grandparent')
                    .datum(d)
                    .attr('class', 'depth');

                var g = g1.selectAll('g')
                    .data(d._children)
                    .enter()
                    .append('g');

                g.filter(d => d._children)
                    .classed('children', true)
                    .on('click', transition);

                var children = g.selectAll('.child')
                    .data(d => d._children || [d])
                    .enter()
                    .append('g');

                children.append('rect')
                    .attr('class', 'child')
                    .call(rect)
                    .append('title')
                    .text(d => d.key + ' (' + formatCurrency(d.value) + ')');

                children.append('text')
                    .attr('class', 'ctext')
                    .text(d => d.key)
                    .call(text2);

                g.append('rect')
                    .attr('class', 'parent')
                    .call(rect);

                var t = g.append('text')
                    .attr('class', 'ptext')
                    .attr('dy', '.75em');

                t.append('tspan')
                    .text(d => d.key);

                t.append('tspan')
                    .attr('dy', '1.0em')
                    .text(d => formatCurrency(d.value));

                t.call(text);

                g.selectAll('rect')
                    .style('fill', d => color(d, titleName));

                function transition(d) {
                    if (transitioning || !d) return;
                    transitioning = true;

                    var g2 = display(d),
                        t1 = g1.transition().duration(750),
                        t2 = g2.transition().duration(750);

                    // Update the domain only after entering new elements.
                    x.domain([d.x, d.x + d.dx]);
                    y.domain([d.y, d.y + d.dy]);

                    // Enable anti-aliasing during the transition.
                    svg.style('shape-rendering', null);

                    // Draw child nodes on top of parent nodes.
                    svg.selectAll('.depth').sort((a, b) => a.depth - b.depth);

                    // Fade-in entering text.
                    g2.selectAll('text').style('fill-opacity', 0);

                    // Transition to the new view.
                    t1.selectAll('.ptext').call(text).style('fill-opacity', 0);
                    t1.selectAll('.ctext').call(text2).style('fill-opacity', 0);
                    t2.selectAll('.ptext').call(text).style('fill-opacity', 1);
                    t2.selectAll('.ctext').call(text2).style('fill-opacity', 1);
                    t1.selectAll('rect').call(rect);
                    t2.selectAll('rect').call(rect);

                    // Remove the old node when the transition is finished.
                    t1.remove().each('end', function() {
                        svg.style('shape-rendering', 'crispEdges');
                        transitioning = false;
                    });
                }

                return g;
            }

            function text(text) {
                text.selectAll('tspan')
                    .attr('x', d => x(d.x) + 6);

                text.attr('x', d => x(d.x) + 6)
                    .attr('y', d => y(d.y) + 6)
                    .style('opacity', function(d) {
                        return this.getComputedTextLength() < x(d.x + d.dx) - x(d.x) ? 1 : 0;
                    });
            }

            function text2(text) {
                text.attr('x', function(d) { return x(d.x + d.dx) - this.getComputedTextLength() - 6; })
                    .attr('y', d => y(d.y + d.dy) - 6)
                    .style('opacity', function(d) {
                        return this.getComputedTextLength() < x(d.x + d.dx) - x(d.x) ? 1 : 0;
                    });
            }

            function rect(rect) {
                rect.attr('x', d => x(d.x))
                    .attr('y', d => y(d.y))
                    .attr('width', d => x(d.x + d.dx) - x(d.x))
                    .attr('height', d => y(d.y + d.dy) - y(d.y));
            }

            function name(d) {
                return d.parent
                    ? name(d.parent) + ' / ' + d.key + ' ' + formatCurrency(d.value) + ''
                    : d.key + ' ' + formatCurrency(d.value) + '';
            }
        }

        self.normalize = function() {
            let normRes = [];

            for (let d of self.dataset) {
                let normValues = d.key.split(';');
                normRes.push({
                    key: normValues[0],
                    region: normValues[1],
                    subregion: normValues[2],
                    value: d.value
                })
            }

            var normData = d3.nest()
                .key(d => d.region)
                .key(d => d.subregion)
                .entries(newRes);

            self.render({ title: ''}, {
                key: 'Congresso Normalizado' + regionCode,
                values: normData
            });
        }

        self.filterByRegion = (regionCode) => {
            self.render();
        }
    }
}
