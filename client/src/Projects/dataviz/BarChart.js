import React, { useEffect } from "react";
import * as d3 from 'd3';
import sendHttpRequest from "../../helpers/utils";
// import {BrowserView, MobileView} from 'react-device-detect';


let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
// const padding = 40, svgHeight = 470, svgWidth = 320;
const BarChart = () => {
    useEffect(() => {
        console.log("window size", window.innerWidth)

        sendHttpRequest("GET", url).then(responseData => {
            // setState({data: responseData.data, isFetching: false})
            const data = responseData.data;
            console.log(data[0]);
            let heightScale;
            let xScale;
            let xAxisScale;
            let yAxisScale;
            const padding = 40,
                svgHeight = window.innerHeight - 180,
                svgWidth = window.innerWidth;

            let svg = d3.select('svg');
            svg.attr("width", svgWidth);
            svg.attr("height", svgHeight);

            xScale = d3.scaleLinear()
                .domain([0, data.length - 1])
                .range([padding, svgWidth - 10])

            heightScale = d3.scaleLinear()
                .domain([0, d3.max(data, (item) => item[1])])
                .range([0, svgHeight - 2 * padding])
            svg.append("text")
                .attr("x", svgWidth / 2 - 7)
                .attr("y", 30)
                .text("USA DBP")
                .attr("id", "header")

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
            //
            svg.append("g")
                .call(yAxis)
                .attr("id", "y-axis")
                .attr("transform", "translate(" + padding + ",0)")
            svg.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                // .attr("class", "bar")
                .attr("x", (item, index) => xScale(index))
                .attr("y", (item, index) => (svgHeight - padding) - heightScale(item[1]))
                .attr("width", (svgWidth - (2 * padding)) / data.length)
                .attr("height", (item) => heightScale(item[1]))
            // .attr("fill", "green")
        });
    }, [])
    return (
        <>
            {/*<MobileView>*/}
            <div id="barChart" className="project">
                <h1>BAR CHART</h1>
                <div className="body">
                    <section className="svg-container">
                        <svg id="canvas" className="svg">
                            {/*<text id="title" x="100" y="20">*/}
                            {/*    USA GDP*/}
                            {/*</text>*/}
                        </svg>
                    </section>
                </div>
            </div>
            {/*</MobileView>*/}
            {/*<BrowserView>*/}
            {/*    <h1>not available</h1>*/}
            {/*</BrowserView>*/}
        </>
    )
}

export default BarChart;