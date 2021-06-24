import React, {useEffect} from "react";
import * as d3 from 'd3';
import sendHttpRequest from "./utils";

const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
// const D3Ressources = "https://github.com/d3/d3/blob/master/API.md#axes-d3-axis"
const padding = 40,
    svgHeight = window.innerHeight - 180,
    svgWidth = window.innerWidth;
const ScatterPlot = () => {
    useEffect(() => {
        sendHttpRequest("GET", url).then(responseData => {
            const data = responseData;
            const svg = d3.select('svg');
            let yScale;
            let xScale;
            let xAxisScale;
            let yAxisScale;
            data.forEach((item) => {
                const timeString = item.Time.split(":");
                item.Time = new Date(1970, 0, 1, 0, timeString[0],
                    timeString[1]);
                return item;
            });
            console.log(data);
            console.log(d3.max(data,item => item.Time));
            svg.attr("width", svgWidth);
            svg.attr("height", svgHeight);

            xScale = d3.scaleLinear()
                .domain([d3.min(data,(item) => item.Year - 1), d3.max(data, (item) => item.Year + 1)])
                .range([padding, svgWidth - 10]);
            yScale = d3.scaleTime()
                .domain([d3.min(data,(item) => item.Seconds ), d3.max(data, (item) => item.Seconds)])
                .range([padding, svgHeight - padding]);

            // xAxisScale = d3.scaleLinear()
            //     .domain([d3.min(data,(item) => item.Year), d3.max(data,(item) => item.Year)])
            //     .range([padding, svgWidth - 10])

            yAxisScale = d3.scaleLinear()
                .domain([d3.min(data,(item) => item.Time), d3.max(data,(item) => item.Time)])
                .range([svgHeight - padding, padding])

            let yFormat = d3.timeFormat('%M:%S')
            let xFormat = d3.format('d');

            let xAxis = d3.axisBottom(xScale)
                .tickFormat(xFormat);
            let yAxis = d3.axisLeft(yAxisScale)
                .tickFormat(yFormat);

            svg.append("g")
                .call(xAxis)
                .attr("id", "x-axis")
                .attr("transform", "translate(0," + (svgHeight - padding) + ")")
            svg.append("g")
                .call(yAxis)
                .attr("id", "y-axis")
                .attr("transform", "translate(" + padding + ",0)")

            svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("class", "dot")
                .attr("data-xvalue", (item) => new Date(item.Year))
                .attr("data-yvalue",  (item) => item.Time)
                .attr("cx", (item) => xScale(item.Year))
                .attr("cy", (item) => yScale(item.Seconds))
                .attr("r", 5)

        });
    }, [])
    return (
        <>
            <div id="scatterPlot" className="project">
                <h1>SCATTER PLOT</h1>
                <div className="body">
                    <section  className="svg-container">
                        <svg id="canvas">
                            <text id="title" x="80" y="30">
                                Doping in Professional Bicycle Racing
                            </text>
                        </svg>
                    </section>
                </div>
            </div>
        </>
    )
};

export default ScatterPlot;