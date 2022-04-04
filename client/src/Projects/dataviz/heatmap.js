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
    return (
        <>
            <div id="scatterPlot" className="project">
                <h1>Heatmap</h1>
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