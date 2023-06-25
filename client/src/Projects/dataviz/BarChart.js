import React, { useEffect, useState } from "react";
import * as d3 from 'd3';
import sendHttpRequest from "../../helpers/utils";


let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
const BarChart = () => {
    const [state, setState] = useState({})
    useEffect(() => {
        sendHttpRequest("GET", url).then(responseData => {
            const data = responseData.data;
            setState(responseData)
            let heightScale;
            let xScale;
            let xAxisScale;
            let yAxisScale;
            const padding = 40;
            const svgHeight = window.innerHeight - 180;
            const svgWidth = window.getComputedStyle(document.querySelector("#barChart")).getPropertyValue("width").replace("px", "");

            const body = d3.select(".body")

            let svg = d3.select('svg');
            svg.attr("width", svgWidth)
                .attr("height", svgHeight)
                .style("background-color", "white")
                .style("color", "black")

            xScale = d3.scaleLinear()
                .domain([0, data.length - 1])
                .range([padding, svgWidth - 10])

            heightScale = d3.scaleLinear()
                .domain([0, d3.max(data, (item) => item[1])])
                .range([0, svgHeight - 2 * padding])

            svg.append("text")
                .style("font-size", "1.3em")
                .style("fill", "black")
                .attr("x", svgWidth / 2 - 50)
                .attr("y", 30)
                .text("United States GDP")
                .attr("id", "header")

            svg.append("text")
                .style("font-size", ".5em")
                .style("fill", "black")
                .attr("x", svgWidth - 6 * padding)
                .attr("y", svgHeight - padding / 4)
                .text("More Information: http://www.bea.gov/national/pdf/nipaguid.pdf")

            svg.append("text")
                .style("font-size", ".7em")
                .attr("transform", "rotate(-90)")
                .style("font-family", "roboto")
                .style("fill", "black")
                .attr("x", -svgHeight / 2 + "px")
                .attr("y", padding + 16 + "px")
                .style("text-anchor", "middle")
                .text("Gross Domestic Product")

            //*************************************************************
            let datesArray = data.map((item) => new Date(item[0]))
            //***************************************************************


            xAxisScale = d3.scaleTime()
                .domain([d3.min(datesArray), d3.max(datesArray)])
                .range([padding, svgWidth - 10])

            yAxisScale = d3.scaleLinear()
                .domain([0, d3.max(data, (item) => item[1])])
                .range([svgHeight - padding, padding])
            //****************************************************************

            let xAxis = d3.axisBottom(xAxisScale)
            let yAxis = d3.axisLeft(yAxisScale)

            svg.append("g")
                .call(xAxis)
                .attr("id", "x-axis")
                .attr("transform", "translate(0," + (svgHeight - padding) + ")")

            svg.append("g")
                .call(yAxis)
                .attr("id", "y-axis")
                .attr("transform", "translate(" + padding + ",0)")


            body.style("position", "absolute")

            const tooltip = body.append("div");
            tooltip.attr("id", "tooltip")
                .style("position", "relative")
                .style("color", "black")
                .style("background-color", "lightsteelblue")
                .style("width", "fit-content")
                .style("padding", ".5em")
                .style("border-radius", "6px")
                .style("box-shadow", "1px 1px 10px")
                .style("display", "none")


            const rect = svg.append("g")
                .attr("id", "rects")
                .attr("fill", "rgb(51, 173, 255)")

            const getGuartal = (mount) => {
                if (mount <= 3) {
                    return "Q1";
                } else if ((mount > 3) && (mount <= 6)) {
                    return "Q2";
                } else if ((mount > 6) && (mount <= 9)) {
                    return "Q3";
                } else {
                    return "Q4";
                }
            }

            rect.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", (item, index) => xScale(index))
                .attr("y", (item, index) => (svgHeight - padding) - heightScale(item[1]))
                .attr("width", (svgWidth - (2 * padding)) / data.length)
                .attr("height", (item) => heightScale(item[1]))
                .style("cursor", "pointer")
                .on("mouseover", function (event, d) {
                    d3.select(this)
                        .attr("fill", "white")

                    let pointer = d3.pointer(event);
                    let year = d[0].split("-")[0];
                    let mount = d[0].split("-")[1];

                    let quartal = getGuartal(mount);

                    let yearString = d[1].toString();
                    let gdp = yearString.slice(0, yearString.length - 5) + "," + yearString.slice(yearString.length - 5)
                    tooltip.style("display", "block")
                        .style("top", -svgHeight / 2 + "px")
                        .style("left", function (params) {
                            if (pointer[0] > (svgWidth - 150)) {
                                return (pointer[0] - 150) + "px"

                            } else {
                                return pointer[0] + "px"
                            }

                        })
                        .html("<div class='tootlip'><div>" + year + "  " + quartal + "</div><div>$" + gdp + " Billion</div></div>")
                        .selectAll("div")
                        .style("text-align", "center")
                })
                .on("mouseout", function (event, d) {
                    tooltip.style("display", "none")
                    d3.select(this).attr("fill", "rgb(51, 173, 255)")

                })

        });
    }, [])
    return (
        <>
            <div id="barChart">
                <h3>BAR CHART</h3>
                <div className="body">
                    <section className="svg-container">
                        <svg id="canvas" className="svg">
                        </svg>
                    </section>
                </div>
            </div>
        </>
    )
}

export default BarChart;