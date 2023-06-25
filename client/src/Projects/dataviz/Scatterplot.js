import React, { useEffect } from "react";
import * as d3 from 'd3';
import sendHttpRequest from "../../helpers/utils";


const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
// const D3Ressources = "https://github.com/d3/d3/blob/master/API.md#axes-d3-axis"
// const padding = 40
// svgHeight = window.innerHeight - 180;
// svgWidth = window.innerWidth;
const ScatterPlot = () => {
    useEffect(() => {
        sendHttpRequest("GET", url).then(responseData => {
            const data = responseData;
            const svg = d3.select('svg');
            let yScale;
            let xScale;
            // let xAxisScale;
            let yAxisScale;
            data.forEach((item) => {
                const timeString = item.Time.split(":");
                item.Time = new Date(1970, 0, 1, 0, timeString[0],
                    timeString[1]);
                return item;
            });
            console.log(data);
            console.log(d3.max(data, item => item.Time));
            const svgWidth = window.getComputedStyle(document.querySelector("#scatterPlot")).getPropertyValue("width").replace("px", "");
            const svgHeight = window.innerHeight - 180;
            const padding = 40;
            const noDopingColor = "rgb(31, 119, 180)"
            const dopingColor = "rgb(255, 127, 14)"


            console.log("width : ", svgWidth);
            const body = d3.select(".body");
            body.style("position", "absolute");

            const tooltip = body.append("div");
            tooltip.attr("id", "tooltip")
                .style("position", "relative")
                .style("color", "black")
                .style("background-color", "lightsteelblue")
                .style("width", "fit-content")
                .style("padding", ".5em")
                .style("border-radius", "6px")
                .style("box-shadow", "1px 1px 10px")
                .style("font-size", ".7em")
                .style("display", "none")

                svg.append("text")
                .style("font-size", ".8em")
                .attr("transform", "rotate(-90)")
                .style("font-family", "roboto")
                .style("fill", "black")
                .attr("x", -svgHeight / 2 + "px")
                .attr("y", padding + "px")
                .style("text-anchor", "middle")
                .text("Time in Minutes")


            svg.attr("width", svgWidth)
                .attr("height", svgHeight)
                .style("background-color", "white")
                .style("color", "black")

            xScale = d3.scaleLinear()
                .domain([d3.min(data, (item) => item.Year - 1), d3.max(data, (item) => item.Year + 1)])
                .range([2 * padding, svgWidth - 10]);
            yScale = d3.scaleTime()
                .domain([d3.min(data, (item) => item.Seconds), d3.max(data, (item) => item.Seconds)])
                .range([2 * padding, svgHeight - padding]);


            yAxisScale = d3.scaleLinear()
                .domain([d3.min(data, (item) => item.Time), d3.max(data, (item) => item.Time)])
                .range([svgHeight - padding, 2 * padding])

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
                .attr("transform", "translate(" + 2 * padding + ",0)")

            const legendContainer = svg.append("g")
                .attr("id", "legend")
                .attr("transform", "translate(" + (svgWidth - padding) + "," + svgHeight / 2 + ")")

            let rectsize = 20;

            legendContainer.append("rect")
                .attr("width", rectsize)
                .attr("height", rectsize)
                .attr("fill", dopingColor)
            legendContainer.append("text")
                .text("No doping allegations")
                .attr("text-anchor", "end")
                .style("font-size", ".7em")
                .attr("dx", -5)
                .attr("dy", rectsize / 2 + 4)

                legendContainer.append("text")
                .text("Riders with doping allegations")
                .attr("text-anchor", "end")
                .style("font-size", ".7em")
                .attr("dx", -5)
                .attr("dy", ((2*rectsize + 25) / 2) + 4)


            legendContainer.append("rect")
                .attr("width", rectsize)
                .attr("height", rectsize)
                .attr("y", 25)
                .attr("fill", noDopingColor)

            svg.append("text")
                .text("Doping in Professional Bicycle Racing")
                .attr("x", svgWidth / 2)
                .attr("y", "3ch")
                .attr("text-anchor", "middle")
                .style("font-size", "1.1em")

            svg.append("text")
                .text("35 Fastest times up Alpe d'Huez")
                .attr("x", svgWidth / 2)
                .attr("y", "6ch")
                .attr("text-anchor", "middle")
                .style("font-size", ".9em")



            svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("class", "dot")
                .attr("data-xvalue", (item) => new Date(item.Year))
                .attr("data-yvalue", (item) => item.Time)
                .attr("cx", (item) => xScale(item.Year))
                .attr("cy", (item) => yScale(item.Seconds))
                .attr("r", ".3em")
                .style("cursor", "pointer")
                .attr("fill", (d) => d.Doping ? noDopingColor : dopingColor)
                .on("mouseover", function (event, d) {
                    console.log("Event : ", event, d);
                    let pointer = d3.pointer(event);
                    console.log("Pointer : ", pointer);
                    let date = new Date(d.Time);
                    let time = date.toISOString().substring(14, 19)
                    console.log("Time ; ", date.toISOString().substring(14, 19));
                    tooltip.style("display", "block")
                        .style("top", -svgHeight + pointer[1] + "px")
                        .style("left", function (params) {
                            if (pointer[0] > (svgWidth - 150)) {
                                return (pointer[0] - 150) + "px"
                            } else {
                                return pointer[0] + 5 + "px"
                            }

                        })

                        .html("<div><div>" + d.Name + ": " + d.Nationality + "</div><div>Year: " + d.Year + ", Time: " + time + "</div>" + (d.Doping ? "</br><div>" + d.Doping + "</div>" : "") + "</div>")
                })
                .on("mouseout", function (e, d) {

                })
        });
    }, [])
    return (
        <>
            <div id="scatterPlot">
                <h6>SCATTER PLOT</h6>
                <div className="body">
                    <section className="svg-container">
                        <svg id="canvas">
                        </svg>
                    </section>
                </div>
            </div>
        </>
    )
};

export default ScatterPlot;