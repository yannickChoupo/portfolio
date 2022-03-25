import React, { useEffect } from "react";
import * as d3 from 'd3';
import sendHttpRequest from "../../helpers/utils";

const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";
// const D3Ressources = "https://github.com/d3/d3/blob/master/API.md#axes-d3-axis"
const padding = 40,
    svgHeight = window.innerHeight - 180,
    svgWidth = window.innerWidth;

let margin = {
    "left": 60,
    "right": 40,
    "bottom": 40,
    "top": 40
}
const Heatmap = () => {
    // let Title = d3.select("body")
    //     .append("div")
    //     .attr("id", "title")
    //     .html("Monthly Global Land-Surface Temperature")
    // let description = d3.select("body")
    //     .append("div")
    //     .attr("id", "description")
    //     .html("1753 - 2015: base temperature 8.66℃")

    // let svg = d3.select('body')
    //     .append('svg')
    //     .attr("id", "svg")

    // let legend = d3.select("body")
    //     .append("svg")
    //     .attr("id", "legend")
    //     .attr("height", legendHeight)
    //     .attr("width", legendWidth)

    // let tooltip = d3.select('body')
    //     .append('div')
    //     .attr('class', 'tooltip')
    //     .attr('id', 'tooltip')
    //     .style('opacity', 0);

    // let legendColors = [
    //     '#67001f',
    //     '#b2182b',
    //     '#d6604d',
    //     '#f4a582',
    //     '#fddbc7',
    //     '#f7f7f7',
    //     '#d1e5f0',
    //     '#92c5de',
    //     '#4393c3',
    //     '#2166ac',
    //     '#053061'
    // ]
    // let monthArr = ["January", "February", "March", "April", "May", "June", "July",
    //     "August", "September", "October", "November", "December"]

    // var color = d3.scaleOrdinal(d3.schemeCategory10);

    // let drawCanvas = () => {
    //     //svgWidth = margin.left + margin.right + 5*yearsArr.length;
    //     //svgHeight = 500;
    //     svg.attr("width", svgWidth)
    //     svg.attr("height", svgHeight)
    //     svg.append("text")
    //         .attr("id", "legend");
    // }

    // let generatesScale = () => {
    //     yAxisScale = d3.scaleBand().domain(["January", "February", "March", "April", "May",
    //         "June", "July", "August", "September", "October", "November",
    //         "December"])
    //         .range([margin.top, svgHeight - margin.bottom]);
    //     xAxisScale = d3.scaleTime()
    //         .domain([d3.min(values, (item) => item.year), d3.max(values, (item) => item.year)])
    //         .range([margin.left, svgWidth - margin.right]);

    //     xScale = d3.scaleLinear()
    //         .domain([0, yearsArr.length])
    //         .range([margin.left, values.length * svgWidth]);
    //     yScale = d3.scaleLinear()
    //         .domain([0, 12])
    //         .range([margin.top, svgHeight - margin.bottom]);


        //yAxisScale = d3.scaleTime()
        //             .domain([new Date(0,0,0,0,0,0),new Date(0,12,0,0,0,0)])
        //           .range([margin.top, svgHeight - margin.bottom]);

    // }
    // let generatesAxis = () => {
    //     xAxis = d3.axisBottom(xAxisScale)
    //         .tickFormat(d3.timeFormat('%Y'))
    //     yAxis = d3.axisLeft(yAxisScale)



    //     svg.append("g")
    //         .call(xAxis)
    //         .attr("id", "x-axis")
    //         .attr("transform", "translate(0," + (svgHeight - margin.bottom) + ")")

    //     svg.append("g")
    //         .call(yAxis)
    //         .attr("id", "y-axis")
    //         .attr("transform", "translate(" + margin.left + ",0)")
    // }
    // let drawBars = () => {
    //     cellHeight = yAxisScale.bandwidth();
    //     //cellWidth = (window.innerWidth - margin.left - margin.right) / yearsArr.length;
    //     cellWidth = 5;
    //     let tempArr = values.reduce((acc, curData) => {
    //         acc = [...acc, curData.variance]
    //         return acc;
    //     }, []);
    //     let minTemp = 8.66 + Math.min.apply(null, tempArr);
    //     let maxTemp = 8.66 + Math.max.apply(null, tempArr);
    //     console.log(minTemp + "," + maxTemp)

    //     console.log(tempArr)
    //     let legendThreshold = d3.scaleThreshold().domain(((min, max, count) => {
    //         let array = [];
    //         let step = (max - min) / count;
    //         let base = min;
    //         for (let i = 1; i < count; i++) {
    //             array.push(base + i * step);
    //         }
    //         return array;
    //     })(minTemp, maxTemp, legendColors.length)
    //     )
    //         .range(legendColors);
    //     let legendDomain = legendThreshold.domain().reduce((acc, curData) => {
    //         let x = curData;
    //         acc = [...acc, parseFloat(x.toFixed(1))]
    //         return acc;
    //     }, [])
    //     console.log("domain : ", legendDomain)
    //     let legendXScale = d3.scaleLinear()
    //         .domain([d3.min(legendDomain),
    //         d3.max(legendDomain)])
    //         .range([legendMargin.left, legendWidth - legendMargin.right])
    //     let legendXAxis = d3.axisBottom(legendXScale)
    //         .tickValues(legendDomain)
    //         .tickFormat(d3.format('.1f'));
    //     legend.attr("height", legendHeight)
    //         .attr("width", legendWidth)

    //     legend.append("g")
    //         .attr("transform",
    //             "translate(0," + (legendHeight - legendMargin.bottom) + ")")
    //         .call(legendXAxis)
    //         .attr("id", "y-legend")
    //     legendCellWidth = (legendWidth - 2 * margin.right) / legendDomain.length
    //     legend.selectAll("rect")
    //         .data(legendDomain)
    //         .enter()
    //         .append("rect")
    //         .attr("class", "legend")
    //         .attr("height", 50)
    //         .attr("width", legendCellWidth)
    //         .attr("x", (value, index) => legendMargin.left + index * legendCellWidth)
    //         .attr("y", legendHeight - legendMargin.bottom - 50)
    //         .attr("fill", (value) => legendThreshold(value))

    //     console.log(legendThreshold.range())


    //     svg.selectAll("rect")
    //         .data(values)
    //         .enter()
    //         .append("rect")
    //         .attr("class", "rect")
    //         .attr("height", cellHeight)
    //         .attr("width", cellWidth)
    //         .attr("x", (value) => margin.left + value.index * cellWidth)
    //         .attr("y", (value) => yScale(value.month) - yAxisScale.bandwidth())
    //         .attr("class", "cell")
    //         .attr("data-month", (item) => item.month - 1)
    //         .attr("data-year", (item) => item.year.getFullYear() + 1)
    //         .attr("data-temp", (item) => item.temperature)
    //         .attr("fill", (item) => legendThreshold(item.temperature))
    //         .on('mouseover', (event, d) => {
    //             tooltip.style("opacity", 0.9);
    //             tooltip.attr("data-year", d.year.getFullYear() + 1);
    //             tooltip.html(d.year.getFullYear() + " - " + monthArr[d.month - 1] + "</br>"
    //                 + d.temperature + "</br>"
    //                 + d.variance)
    //                 .style('left', event.pageX + 'px')
    //                 .style('top', event.pageY - 40 + 'px');

    //         })
    //         .on('mouseout', function () {
    //             tooltip.style('opacity', 0);
    //         })

    // }
    // useEffect(() => {
    //     sendHttpRequest("GET", url).then(responseData => {
    //         responseData = JSON.parse(rep.responseText);

    //         // sort the Data per year+
    //         // return an arry in Format { "year":[ {"month":..., "variance":...}, {...} ], ...}
    //         let dataPerYearObj = data.monthlyVariance.reduce((acc, item) => {
    //             if (acc[item.year] == null) {
    //                 acc[item.year] = [];
    //             }
    //             acc[item.year].push({ "month": item.month, "variance": item.variance });
    //             return acc
    //         }, {});

    //         // Extract the base Temperature from the the reponse Datas
    //         const { baseTemperature } = responseData;

    //         // format the data object in array of object with the year and the data as keys
    //         let dataPerYearArr = [];
    //         for (const year of Object.keys(dataPerYearObj)) {
    //             let newData = { year: parseInt(year), data: dataPerYearObj[year] };
    //             dataPerYearArr.push(newData);
    //         }

    //         // sort the data object in an ascending order and store it the values 
    //         // use to  generate the visualisation
    //         values = dataPerYearArr.sort((a, b) => a.year - b.year);

    //         // store the year-values as date object
    //         values.forEach((data) => {
    //             data.year = new Date(data.year, 0, 0, 0, 0, 0);
    //             return data;
    //         })

    //         // store the years values in an array
    //         yearsArr = dataPerYearArr.reduce((acc, curValue) => {
    //             acc.push(curValue.year)
    //             return acc;
    //         }, [])

    //         drawCanvas();
    //         generatesScale();

    //         drawBars()
    //         generatesAxis()

    //         const data = responseData;
    //         const svg = d3.select('svg');
    //         let yScale;
    //         let xScale;
    //         // let xAxisScale;
    //         let yAxisScale;
    //         data.forEach((item) => {
    //             const timeString = item.Time.split(":");
    //             item.Time = new Date(1970, 0, 1, 0, timeString[0],
    //                 timeString[1]);
    //             return item;
    //         });
    //         console.log(data);
    //         console.log(d3.max(data, item => item.Time));
    //         svg.attr("width", svgWidth);
    //         svg.attr("height", svgHeight);

    //         xScale = d3.scaleLinear()
    //             .domain([d3.min(data, (item) => item.Year - 1), d3.max(data, (item) => item.Year + 1)])
    //             .range([padding, svgWidth - 10]);
    //         yScale = d3.scaleTime()
    //             .domain([d3.min(data, (item) => item.Seconds), d3.max(data, (item) => item.Seconds)])
    //             .range([padding, svgHeight - padding]);

    //         // xAxisScale = d3.scaleLinear()
    //         //     .domain([d3.min(data,(item) => item.Year), d3.max(data,(item) => item.Year)])
    //         //     .range([padding, svgWidth - 10])

    //         yAxisScale = d3.scaleLinear()
    //             .domain([d3.min(data, (item) => item.Time), d3.max(data, (item) => item.Time)])
    //             .range([svgHeight - padding, padding])

    //         let yFormat = d3.timeFormat('%M:%S')
    //         let xFormat = d3.format('d');

    //         let xAxis = d3.axisBottom(xScale)
    //             .tickFormat(xFormat);
    //         let yAxis = d3.axisLeft(yAxisScale)
    //             .tickFormat(yFormat);

    //         svg.append("g")
    //             .call(xAxis)
    //             .attr("id", "x-axis")
    //             .attr("transform", "translate(0," + (svgHeight - padding) + ")")
    //         svg.append("g")
    //             .call(yAxis)
    //             .attr("id", "y-axis")
    //             .attr("transform", "translate(" + padding + ",0)")

    //         svg.selectAll("circle")
    //             .data(data)
    //             .enter()
    //             .append("circle")
    //             .attr("class", "dot")
    //             .attr("data-xvalue", (item) => new Date(item.Year))
    //             .attr("data-yvalue", (item) => item.Time)
    //             .attr("cx", (item) => xScale(item.Year))
    //             .attr("cy", (item) => yScale(item.Seconds))
    //             .attr("r", 5)

    //     });
    // }, [])
    return (
        <>
            <div id="scatterPlot" className="project">
                <h1>Heat map</h1>
                {/* <div className="body">
                    <section className="svg-container">
                        <svg id="canvas">
                            <text id="title" x="80" y="30">
                                Doping in Professional Bicycle Racing
                            </text>
                        </svg>
                    </section>
                </div> */}
            </div>
        </>
    )
};

export default Heatmap;