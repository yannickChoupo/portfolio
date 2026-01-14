import React, { useEffect, useRef, useState } from "react";
import {
	// NavLink,
	Outlet, useParams, useSearchParams
} from "react-router-dom";
import * as d3 from 'd3';
import sendHttpRequest from "../helpers/utils";
import DrawChart from "../Projects/dataviz/DrawBarchart";
import DrawChoroploth from "../Projects/dataviz/DrawChoroploth";
import DrawScatterplot from "../Projects/dataviz/DrawScatterplot";
import DrawHeatmap from "../Projects/dataviz/DrawHeatmap";
import DrawTreemap from "../Projects/dataviz/DrawTreemap";
import { Button, Title1, makeStyles, tokens } from "@fluentui/react-components";
import { ArrowLeft24Regular } from "@fluentui/react-icons";

// interface DatavizData {
// 	title?: string;
// 	data: any;
// 	description?: string;
// }

const useStyles = makeStyles({
	container: {
		padding: "20px",
	},
	backButton: {
		marginBottom: "20px",
	},
	title: {
		marginBottom: "20px",
		textAlign: "center",
	},
	dataviz: {
		display: "flex",
		flexDirection: "column",
		gap: "20px",
	},
	header: {
		textAlign: "center",
	},
	body: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	svgContainer: {
		width: "100%",
		overflow: "auto",
		backgroundColor: tokens.colorNeutralBackground1,
		borderRadius: tokens.borderRadiusMedium,
		padding: "20px",
		boxShadow: tokens.shadow8,
	},
});

const SharedDatavizLayout: React.FC = () => {
	const { projectName } = useParams<{ projectName: string }>();
	const ref = useRef<SVGSVGElement>(null);
	const [curData, setData] = useState<any>();
	const [searchParams] = useSearchParams();
	const styles = useStyles();

	const fetchBarChartData = () => {
		const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
		sendHttpRequest("GET", url).then(responseData => {
			setData(responseData);
		});
	};

	const fetchChoroplothData = () => {
		const url = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
		sendHttpRequest("GET", url).then(responseData => {
			setData(responseData);
		});
	};

	const fetchScatterplotData = () => {
		const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
		sendHttpRequest("GET", url).then(responseData => {
			setData(responseData);
		});
	};

	const fetchHeatmapData = () => {
		const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";
		sendHttpRequest("GET", url).then(responseData => {
			setData(responseData);
		});
	};

	const fetchVideoGames = () => {
		const videoGamesUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";
		sendHttpRequest("GET", videoGamesUrl).then(responseData => {
			setData({
				title: "Video Games Sales",
				data: responseData,
				description: "Top 100 Most Sold Video Games Grouped by Platform"
			});
		});
	};

	const fetchMovies = () => {
		const moviesUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";
		sendHttpRequest("GET", moviesUrl).then(responseData => {
			setData({
				title: "Movies Sales",
				data: responseData,
				description: "Top 100 Highest Grossing Movies Grouped By Genre"
			});
		});
	};

	const fetchKickStarter = () => {
		const kickStarterUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";
		sendHttpRequest("GET", kickStarterUrl).then(responseData => {
			setData({
				title: "Kickstarter Pledges",
				data: responseData,
				description: "Top 100 Most Pledged Kickstarter Campaigns Grouped By Category"
			});
		});
	};

	useEffect(() => {
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
			const query = searchParams.get("q");
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
	}, [projectName, searchParams]);

	useEffect(() => {
		if (curData && ref.current) {
			const svg = d3.select(ref.current);
			svg.selectAll("*").remove();
			d3.select("#dataviz header").selectAll("*").remove();

			switch (projectName) {
				case "BarChart":
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
					// const query = searchParams.get("q");
					DrawTreemap(svg, curData,
						// query
					);
					break;
				default:
					break;
			}
		}
	}, [curData, searchParams, projectName]);

	return (
		<div id="dataviz" className={styles.container}>
			<Button
				// as={NavLink}
				// to='/works'
				className={styles.backButton}
				icon={<ArrowLeft24Regular />}
				appearance="subtle"
			>
				Back Home
			</Button>
			<Title1 className={styles.title}>{projectName}</Title1>
			<div className={styles.dataviz}>
				<header className={styles.header}></header>
				<div className={styles.body}>
					<section className={styles.svgContainer}>
						<svg ref={ref}></svg>
					</section>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default SharedDatavizLayout;
