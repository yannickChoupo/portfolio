let dataURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";
let Data;
let canvas = d3.select("#canvas");
let tooltip = d3
    .select('body')
    .append('div')
    .attr('class', 'tooltip')
    .attr('id', 'tooltip')
    .style('opacity', 0);

let minPercentage, maxiPercentage;
/*let legendColors = [
    '#C9F0C3',
    '#9CF09C',
    '#7AF080',
    '#5BF063',
    '#3CF048',
    '#20F02C',
    '#00F001'
  ]'*/
let legendColors = [
    '#1f77b4',
    '#aec7e8',
    '#ff7f0e',
    '#ffbb78',
    '#2ca02c',
    '#98df8a',
    '#d62728',
    '#ff9896',
    '#9467bd',
    '#c5b0d5',
    '#8c564b',
    '#c49c94',
    '#e377c2',
    '#f7b6d2',
    '#7f7f7f',
    '#c7c7c7',
    '#bcbd22',
    '#dbdb8d'
]
let margin = {
    "left": 60,
    "right": 40,
    "bottom": 40,
    "top": 40
}
let legendWidth = 1000, legendHeight = 100;
let legendMargin = {
    "top": 30,
    "bottom": 30,
    "left": 40,
    "right": 40
}

let drawMap = () => {
    let legendDomain = Data.children.reduce((acc, curValue) => {
        acc.push(curValue.name);
        return acc;
    }, []);
    console.log(legendColors.length, legendDomain.length);
    legendScale = d3.scaleOrdinal()
        .domain(legendDomain)
        .range(legendColors)
    let hierarchy = d3.hierarchy(Data, (node) => node['children'])
        .sum((node) => node['value'])
        .sort((node1, node2) => node2['value'] - node1['value'])


    let createTreeMap = d3.treemap()
        .size([1000, 600])

    createTreeMap(hierarchy);


    let tiles = hierarchy.leaves();
    let block = canvas.selectAll('g')
        .data(tiles)
        .enter()
        .append('g')

    block.append('rect')
        .attr('class', 'tile')
        .attr('fill', (item) => legendScale(item.data.category))
        .attr('data-name', (item) => item.data.name)
        .attr('data-category', (item) => item.data.category)
        .attr('data-value', (item) => item.data.value)
        .attr('transform', (item) => 'translate(' + item['x0'] + ',' + item['y0'] + ')')
        .attr('width', (item) => item['x1'] - item['x0'])
        .attr('height', (item) => item['y1'] - item['y0'])
        .on('mousemove', (Event, dataItem) => {

            let name = dataItem.data.name
            let category = dataItem.data.category;
            let value = dataItem.data.value;
            tooltip.style("opacity", 0.9)
                .attr("data-value", value);
            tooltip.transition()
                .style("opacity", "0.9");

            tooltip.html("name : " + name + "<br>" +
                "category : " + category + "<br>" +
                "value : " + value + "<br>")
                .style('left', Event.pageX + 'px')
                .style('top', Event.pageY - 40 + 'px');
        })
        .on('mouseout', function () {
            tooltip.style('opacity', 0);
        })



    block.append('text')
        .attr('class', 'tile-text')
        .attr('x', (item) => item['x0'] + 5)
        .attr('y', (item) => item['y0'] + 10)
        .text((item) => item.data.name)

    console.log(tiles);
    let legend = d3.select("body")
        .append("svg")
        .attr("id", "legend")
        .attr("height", legendHeight)
        .attr("width", legendWidth)


    legendCellWidth = (legendWidth - 2 * margin.right) / legendDomain.length
    legend.selectAll("rect")
        .data(legendDomain)
        .enter()
        .append("rect")
        .attr("class", "legend-item")
        .attr("height", 50)
        .attr("width", 50)
        .attr("x", (value, index) => legendMargin.left + index * 50)
        .attr("y", legendHeight - legendMargin.bottom - 50)
        .attr("fill", (value) => legendScale(value))

}

d3.json(dataURL).then((data, error) => {
    if (error) {
        console.log(error);
    } else {
        Data = data;
        console.log("Data");
        console.log(Data);
        drawMap();
    }
})
