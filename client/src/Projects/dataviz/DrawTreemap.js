import * as d3 from 'd3';

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
let legendWidth = 1000, legendHeight = 180;
let legendMargin = {
    "top": 30,
    "bottom": 30,
    "left": 40,
    "right": 40
}

const ajustVideoGamesText = (texts, itemName) => {
    return texts.reduce(
        (accumulator, currentValue) => {
            if (/\d|of|II|I|V|X|Skyrim|Duty|Legend|Ocarina|Age|Training|Minutes/.test(currentValue) && (itemName !== "Call of Duty: Black Ops 3")) {
                accumulator[accumulator.length - 1] += " " + currentValue;
            } else {
                accumulator.push(currentValue);
            }
            return accumulator;
        }, []);
}

const ajustMoviesText = (texts, itemName) => {
    return texts.reduce(
        (accumulator, currentValue) => {
            if (/\d|V|of|Pearl|Part|Curse|Justice|Grinch|the|Winter|Soldier|Revenge|Sith|II|Twilight/.test(currentValue)) {
                accumulator[accumulator.length - 1] += " " + currentValue;
            } else {
                accumulator.push(currentValue);
            }
            return accumulator;
        }, []);
}

const ajustKickStarterText = (texts, itemName) => {
    return texts.reduce(
        (accumulator, currentValue) => {
            if (/\d|of|Duty|Legend|Ocarina|Age|Training|Minutes/.test(currentValue)) {
                accumulator[accumulator.length - 1] += " " + currentValue;
            } else {
                accumulator.push(currentValue);
            }
            return accumulator;
        }, []);
}
const DrawTreemap = (svg, curData) => {
    const { data, title, description } = curData;
    const header = d3.select("#dataviz header");
    header.html(
        `<ul>
            <li class="video">
                <a href='/dataviz/Treemap?q=video'>Video Game Data Set</a>
            </li>
            <li class="movie">
                <a href='/dataviz/Treemap?q=movie'>Movies Data Set</a>
            </li>
            <li class="kickstarter">
                <a href='/dataviz/Treemap?q=kickstarter'> Kickstater Data Set</a>
            </li>
            </ul>
            <h4 className="current-header">${title}</h4>
            <h6 className="current-description">${description}</h6>`
    )

    d3.select('.current-header').text(title);
    d3.select('.current-description').text(description);

    let svgWidth = window.getComputedStyle(document.querySelector("#dataviz")).getPropertyValue("width").replace("px", "");
    let svgHeight = 570 + legendHeight;

    svg.attr("width", svgWidth)
        .attr("height", svgHeight)
        .style("background-color", "white")
        .style("color", "black")

    let legendDomain = data.children.reduce((acc, curValue) => {
        acc.push(curValue.name);
        return acc;
    }, []);

    let hierarchy = d3.hierarchy(data, (node) => node['children'])
        .sum((node) => node['value'])
        .sort((node1, node2) => node2['value'] - node1['value'])

    var categories = new Set(hierarchy.leaves().map(item => item.data.category));
    let legendData = [];

    let legendScale = d3.scaleOrdinal().domain(legendDomain)
        .range(legendColors)

    categories.forEach(category => {
        legendData.push(
            {
                category,
                color: legendScale(category)
            }
        )
    })

    let createTreeMap = d3.treemap()
        .size([svgWidth, svgHeight - legendHeight - margin.bottom])

    createTreeMap(hierarchy);
    let tiles = hierarchy.leaves();
    const block = svg.append("g")
        .attr("id", "block")
        .selectAll('g')
        .data(tiles)
        .enter()
        .append('g')
        .attr('transform', (item) => 'translate(' + item['x0'] + ',' + item['y0'] + ')')

    const tooltipText = svg.append("text").attr("id", "tooltip-text").attr("x", "2ch").attr("y", "-1ch").style("display", "none");
    d3.select('.svg-container')
        .style("width", svgWidth)
        .style("heigth", svgHeight)
        .style("position", "relative")


    const tooltip = d3.select(".svg-container").append("div").attr("id", "tooltip")
    tooltip
        .style("position", "absolute")
        .style("width", "fit-content")
        .style("padding", ".5em")
        .style("border-radius", "6px")
        .style("background-color", "rgba(255, 255, 204, 0.95)")
        .style("color", "black")
        .style("box-shadow", "1px 1px 10px rgba(128, 128, 128, 0.6)")
        .style("display", "none")

    // svg.style('position', "absolute");


    block.append('rect')
        .attr('class', 'tile')
        .attr('fill', (item) => legendScale(item.data.category))
        .attr("stroke", "white")
        .style("cursor", "pointer")
        .attr('stroke-width', '1')
        .attr('data-name', (item) => item.data.name)
        .attr('data-category', (item) => item.data.category)
        .attr('data-value', (item) => item.data.value)
        .attr('width', (item) => item['x1'] - item['x0'])
        .attr('height', (item) => item['y1'] - item['y0'])

    block.on('mousemove', function (Event, dataItem) {
        console.log("DTA : ", dataItem);
        let name = dataItem.data.name
        let category = dataItem.data.category;
        let value = dataItem.data.value;
        let tooltipTextLength;
        let tooltipContent = "name : " + name
        tooltipText
            .style("display", "block")
            .text(tooltipContent)
            .each(function () {
                var self = d3.select(this);
                tooltipTextLength = self.node().getComputedTextLength();
            })

        tooltip.style("display", "block")
            .style('left', function () {
                if ((dataItem.x0 - margin.left + 20) > (svgWidth - tooltipTextLength)) {
                    return (dataItem.x0 - tooltipTextLength) + "px"

                } else {
                    return (dataItem.x0) + "px"
                }
            })
            .style('top', function () {
                // return dataItem.y1;
                return Event.pageY - 7 * margin.bottom - legendHeight + 'px';
            })

        tooltip.style("opacity", 0.9)
            .attr("data-value", value);

        tooltip.html("name : " + name + "<br>" +
            "category : " + category + "<br>" +
            "value : " + value + "<br>")
    })
    .on('mouseout', function () {
        tooltip.style("display", "none")
    })



    block.append('text')
        .attr('class', 'tile-text')
        .style("font-size", ".5em")
        .html(function (item) {
            let result = "";
            console.log(d3.select("parent"));
            let texts = item.data.name.split(" ");
            let reducedText;
            if (title === "Video Games Sales") {
                reducedText = ajustVideoGamesText(texts, item.data.name);
            } else if (title === "Movies Sales") {
                reducedText = ajustMoviesText(texts, item.data.name)
            } else if (title === "Kickstarter Pledges") {
                reducedText = ajustKickStarterText(texts, item.data.name)
            } else {
                reducedText = texts
            }
            reducedText.forEach((element, idx) => {
                if(idx < 2) {
                    result += ("<tspan x=0 y=2ch dy=" + 2 * idx + "ch dx=.5ch style='cursor: pointer'>" + element + "</tspan>")
                }
            });
            return result;
        })

    const legend = svg.append("g")
        .attr("id", "legend")
        .attr("transform", `translate(${svgWidth / 2 - (3 * 100 / 2)}, ${svgHeight - legendHeight - margin.bottom / 2})`)

    legend.selectAll("*").remove()

    let legendCellWidth = 20
    let countx = -1;
    let rowCount = 0;

    const legendGroups = legend.selectAll("g")
        .data(legendData)
        .enter()
        .append("g")
        .attr("class", "legend-item")
        .attr("transform", function (value, index) {
            let x, y;
            if (countx >= 2) {
                countx = 0;
            } else {
                countx++;
            }
            if (countx === 0) {
                rowCount++;
            }
            y = rowCount * 25;
            x = countx * 100;
            return `translate(${x}, ${y})`
        });
    legendGroups.append("rect")
        .attr("height", legendCellWidth)
        .attr("width", legendCellWidth)
        .attr("fill", (value) => {
            return legendScale(value)
        })

    let legendFontSize = 13
    legendGroups.append("text")
        .text((d) => {
            return d.category;
        })
        .style("font-size", legendFontSize)
        .attr("x", legendCellWidth + 5)
        .attr("y", legendCellWidth - ((legendCellWidth - legendFontSize) / 2))
}

export default DrawTreemap