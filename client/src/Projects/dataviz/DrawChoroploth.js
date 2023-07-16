import * as d3 from 'd3';
import geoData from "./custom.geo";


const DrawChoroploth = (svg, curData) => {
    const header = d3.select("#dataviz header");
    header.style("background-color", "white")
    .style("color", "black")
    .style("text-align", "center")

    header.append("h1").style("margin-bottom", "0").text("United States Educational Attainment")
    header.append("h6")
    .style("margin-bottom", "0")
    .style("font-size", ".7em")
    .text("Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)")

    let educationData, percentageArr;
    let svgWidth, svgHeight
    educationData = [...curData];
    percentageArr = educationData.reduce((acc, curValue) => {
        let perc = curValue['bachelorsOrHigher'];
        acc.push(perc);
        return acc;
    }, [])
    let minPercentage = Math.min.apply(null, percentageArr);
    let maxiPercentage = Math.max.apply(null, percentageArr);

    let legendColors = [
        '#e5f5e0',
        '#c7e9c0',
        '#a1d99b',
        '#74c476',
        '#41ab5d',
        '#238b45',
        '#006d2c'
    ]

    const windowWidth = window.getComputedStyle(document.querySelector(".dataviz")).getPropertyValue("width").replace("px", "");
    // if (windowWidth < 600) {
    //     d3.select('svg-container').style("overflow", "auto")
        svgWidth = 960
    // } else {
        // svgWidth = windowWidth;
    // }

    svgHeight = 600;
    svg
    // .attr("width", svgWidth + "px")
    // .attr("height", svgHeight + "px")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 " + svgWidth + " " + svgHeight)
    .style("max-width", "100%")
    .style("height", "auto")
    .style("height", "intrinsic")
    .style("background-color", "white")
    .style("color", "black")

    let legendThreshold = d3.scaleLinear()
        .domain(d3.range(minPercentage,
            maxiPercentage,
            (maxiPercentage - minPercentage) / 8))
        .range(legendColors);

    const projection = d3.geoMercator()
    const pathgenerator = d3.geoPath().projection(projection);

    const body = d3.select(".body")

    var path = d3.geoPath()
    const paths = svg.append("g").attr("id", "paths")
    
    const tooltipGroup = svg.append("g").attr("id", "tooltip-group");
    const tootlipContainer = tooltipGroup.append("rect").attr("id", "tooltip-container").attr("rx", 6).attr("ry", 6)
    const tooltipText = tooltipGroup.append("text").attr("id", "tooltip-text").attr("x", "2ch").attr("y", "-1ch").style("display", "none");
    let margin = {
        "left": 60,
        "right": 40,
        "bottom": 40,
        "top": 40
    }

    let legendWidth = 300, legendHeight = 70;
    let legendMargin = {
        "top": 30,
        "bottom": 30,
        "left": 40,
        "right": 40
    }

    let legendCellWidth;


    let legendDomain = d3.range(minPercentage, maxiPercentage, (maxiPercentage - minPercentage) / 8)
    let legend = svg.append("g")
        .attr("id", "legend")
        .attr("height", legendHeight)
        .attr("width", legendWidth)

    let legendXScale = d3.scaleLinear()
        .domain([d3.min(legendDomain), d3.max(legendDomain)])
        .range([legendMargin.left, legendWidth - legendMargin.right])
    let legendXAxis = d3.axisBottom(legendXScale)
        .tickValues(legendDomain)
        .tickFormat(d3.format('.1f'));
    legend.append("g")
        .attr("transform",
            "translate(" + svgWidth/2 + "," + (legendHeight - legendMargin.bottom) + ")")
        .call(legendXAxis)
        .attr("id", "y-legend")
    legendCellWidth = (legendWidth - 2 * margin.right) / legendDomain.length
    legend.selectAll("rect")
        .data(legendDomain)
        .enter()
        .append("rect")
        .attr("class", "legend")
        .attr("height", 20)
        .attr("width", legendCellWidth)
        .attr("x", (value, index) => (svgWidth/2 ) + legendMargin.left + index * legendCellWidth)
        .attr("y", legendHeight - legendMargin.bottom - 20)
        .attr("fill", (value) => legendThreshold(value))

    paths.selectAll('path')
        .data(geoData)
        .enter()
        .append('path')
        .attr('d', path)
        .style("cursor", "pointer")
        .attr('class', 'paths')
        .attr('fill', (dataItem) => {
            let id = dataItem['id'];
            let county = educationData.find((item) => item['fips'] === id);
            let percentage = county['bachelorsOrHigher'];
            return legendThreshold(percentage);
        })
        .attr('data-fips', (dataItem) => dataItem['id'])
        .attr('data-area', (dataItem) => dataItem['area_name'])

        .attr('data-education', (dataItem) => {
            let id = dataItem['id'];
            let county = educationData.find((item) => item['fips'] === id);
            let percentage = county['bachelorsOrHigher'];
            return percentage;
        })
        .on('mouseover', function (Event, dataItem) {
            let id = dataItem['id'];
            let county = educationData.find((item) => item['fips'] === id);

            let countyName = county['area_name'];
            let state = county['state'];
            let percentage = county['bachelorsOrHigher'];
            let pointer = d3.pointer(Event);

            tooltipGroup
            .style("display", "block")
            .attr("transform", `translate(${pointer[0]} , ${pointer[1]})`)

            
            let tooltipTextLength;
            let tooltipContent = countyName + ", " + state + ": " + percentage + "%";
            tooltipText
                .style("display", "block")
                .text(tooltipContent)
                .each(function (params) {
                    var self = d3.select(this),
                        textLength = self.node().getComputedTextLength(), text = self.text();
                    tooltipTextLength = self.node().getComputedTextLength();
                })


            tootlipContainer
                .attr("width", (tooltipTextLength + 16) + "px")
                .attr("height", "3ch")
                .attr("x", "1ch")
                .attr("y", "-3ch")
                .attr("fill", "rgba(255, 255, 204, 0.9)")

        })
        .on('mouseout', function () {
            tooltipGroup.style("display", "none")
        })
}


export default DrawChoroploth;