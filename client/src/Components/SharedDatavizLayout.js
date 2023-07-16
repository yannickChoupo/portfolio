import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useParams, useSearchParams } from "react-router-dom";
import * as d3 from 'd3';
import sendHttpRequest from "../helpers/utils";
import DrawChart from "../Projects/dataviz/DrawBarchart";
import DrawChoroploth from "../Projects/dataviz/DrawChoroploth";
import DrawScatterplot from "../Projects/dataviz/DrawScatterplot";
import DrawHeatmap from "../Projects/dataviz/DrawHeatmap";
import DrawTreemap from "../Projects/dataviz/DrawTreemap";


const SharedDatavizLayout = () => {
    let { projectName } = useParams();
    const ref = useRef();
    const [curData, setData] = useState();

    const [searchParams] = useSearchParams();
    searchParams.get("q")


    const fetchBarChartData = () => {
        let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
        sendHttpRequest("GET", url).then(responseData => {
            setData(responseData);
        })
    }

    const fetchChoroplothData = () => {
        let url = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
        sendHttpRequest("GET", url).then(responseData => {
            console.log("Data : ", responseData);
            setData(responseData);
        })
    }

    const fetchScatterplotData = () => {
        let url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
        sendHttpRequest("GET", url).then(responseData => {
            console.log("Data : ", responseData);
            setData(responseData);
        })
    }

    const fetchHeatmapData = () => {
        const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";
        sendHttpRequest("GET", url).then(responseData => {
            setData(responseData);
        })
    }


    const fetchVideoGames = () => {
        const videoGamesUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";
        sendHttpRequest("GET", videoGamesUrl).then(responseData => {
            setData(
                {
                    "title": "Video Games Sales",
                    data: responseData,
                    description: "Top 100 Most Sold Video Games Grouped by Platform"
                });
        });
    }

    const fetchMovies = () => {
        const moviesUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";
        sendHttpRequest("GET", moviesUrl).then(responseData => {
            setData(
                {
                    "title": "Movies Sales",
                    data: responseData,
                    description: "Top 100 Highest Grossing Movies Grouped By Genre"
                });
        });
    }

    const fetchKickStarter = () => {
        const kickStarterUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";
        sendHttpRequest("GET", kickStarterUrl).then(responseData => {
            setData(
                {
                    "title": "Kickstarter Pledges",
                    data: responseData,
                    description: "Top 100 Most Pledged Kickstarter Campaigns Grouped By Category"
                });
        });
    }
    // const fetchTreemapData = () => {
    //     let query = searchParams.get("q");
    //     if (query === "video" || !query) {
    //         fetchVideoGames();
    //     }
    //     if (query === "movie") {
    //         fetchMovies();
    //     }
    //     if (query === "kickstarter") {
    //         fetchKickStarter();
    //     }
    // }
    useEffect(() => {
        console.log("Dtataviz project name : ", projectName);
        if (projectName === "BarChart") {
            fetchBarChartData();
        }

        if (projectName === "Choroploth") {
            fetchChoroplothData();
        }

        if (projectName === "ScatterPlot") {
            fetchScatterplotData();
        }
        if (projectName === "Heatmap") {
            fetchHeatmapData();
        }

        if (projectName === "Treemap") {
            // get the queryor set the query
            // fetchTreemapData();
            let query = searchParams.get("q");
            if (query === "video" || !query) {
                fetchVideoGames();
            }
            if (query === "movie") {
                fetchMovies();
            }
            if (query === "kickstarter") {
                fetchKickStarter();
            }
        }

        if (!projectName) {
            d3.select(".svg-container").style("display", "none");
        }
    }, [projectName, searchParams])
    useEffect(() => {
        if (curData) {
            const svg = d3.select(ref.current);
            svg.selectAll("*").remove();
            d3.select("#dataviz header").selectAll("*").remove();
            switch (projectName) {
                case "BarChart":
                    console.log("curData : ", curData);
                    DrawChart(svg, curData);
                    break;
                case "Choroploth":
                    DrawChoroploth(svg, curData);
                    break;
                case "ScatterPlot":
                    DrawScatterplot(svg, curData);
                    break;
                case "Heatmap":
                    DrawHeatmap(svg, curData);
                    break;
                case "Treemap":
                    let query = searchParams.get("q");
                    DrawTreemap(svg, curData, query);
                    break;
                default:
                    break;
            }
        }
    }, [curData, searchParams, projectName])
    return (
        <div id="dataviz">
            <NavLink
                to='/works'
                className="backHome-btn">Back Home</NavLink>
            <h1>{projectName}</h1>
            <div className="dataviz">
                <header className="header"></header>
                <div className="body">
                    <section className="svg-container">
                        <svg ref={ref}></svg>
                    </section>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default SharedDatavizLayout;