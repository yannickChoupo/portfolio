import React, { useEffect, useRef, useState } from "react";
import {
	NavLink,
	Outlet, useParams, useSearchParams
} from "react-router-dom";
import * as d3 from 'd3';
import DrawChart from "../../Projects/dataviz/DrawBarchart"
import DrawChoroploth from "../../Projects/dataviz/DrawChoroplothJs";
// import DrawScatterplot from "../../Projects/dataviz/DrawScatterplot";
// import DrawHeatmap from "../../Projects/dataviz/DrawHeatmap";
// import DrawTreemap from "../../Projects/dataviz/DrawTreemap";
import { makeStyles, tokens } from "@fluentui/react-components";
import sendHttpRequest from "../helpers/utils";

const useStyles = makeStyles({
	container: {
		padding: "0px",
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
		width: "100%",
		flexDirection: "column",
		// gap: "20px",
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
		overflowX: "auto",
		overflowY: "hidden",
		backgroundColor: tokens.colorNeutralBackground1,
		borderRadius: tokens.borderRadiusMedium,
		// padding: "10px",
		boxShadow: tokens.shadow8,
	},

	svg: {
		minWidth: "1000px",
		display: "block",
	},
});

const SharedDatavizLayout: React.FC = () => {
	const { projectName } = useParams<{ projectName: string }>();

	const ref = useRef<SVGSVGElement>(null);

	const [curData, setData] = useState<any>(null);

	const [searchParams] = useSearchParams();

	const styles = useStyles();

	/**
	 * Load public JSON data.
	 *
	 * Do NOT use the authenticated AXIOS instance here.
	 * sendHttpRequest() does not send credentials.
	 */
	const loadData = async (url: string): Promise<any> => {
		try {
			const responseData = await sendHttpRequest(
				"GET",
				url
			);

			return responseData;
		} catch (error) {
			console.error(
				"Failed to load dataviz data:",
				error
			);

			throw error;
		}
	};

	/**
	 * Load data depending on the selected project.
	 */
	useEffect(() => {
		if (!projectName) {
			d3.select(".svg-container")
				.style("display", "none");

			setData(null);

			return;
		}

		const loadProjectData = async () => {
			try {
				setData(null);

				switch (projectName) {
					case "BarChart": {
						const url =
							"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
						const data = await loadData(url);
						setData(data);
						break;
					}

					case "Choroploth": {
						const url =
							"https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
						const data = await loadData(url);
						setData(data);

						break;
					}

					case "ScatterPlot": {
						const url =
							"https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

						const data = await loadData(url);

						setData(data);

						break;
					}

					case "Heatmap": {
						const url =
							"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

						const data = await loadData(url);

						setData(data);

						break;
					}

					case "Treemap": {
						const query =
							searchParams.get("q");

						let url: string;
						let title: string;
						let description: string;

						if (query === "movie") {
							url =
								"https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";

							title = "Movies Sales";

							description =
								"Top 100 Highest Grossing Movies Grouped By Genre";
						} else if (
							query === "kickstarter"
						) {
							url =
								"https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";

							title =
								"Kickstarter Pledges";

							description =
								"Top 100 Most Pledged Kickstarter Campaigns Grouped By Category";
						} else {
							url =
								"https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

							title =
								"Video Games Sales";

							description =
								"Top 100 Most Sold Video Games Grouped By Platform";
						}

						const data =
							await loadData(url);

						setData({
							title,
							data,
							description
						});

						break;
					}

					default:
						console.warn(
							"Unknown project:",
							projectName
						);

						setData(null);

						break;
				}
			} catch (error) {
				console.error(
					`Failed to load ${projectName} data:`,
					error
				);

				setData(null);
			}
		};

		loadProjectData();
	}, [projectName, searchParams]);

	/**
	 * Draw the D3 visualization whenever the data changes.
	 */
	useEffect(() => {
		if (!curData || !ref.current) {
			return;
		}

		const svg = d3.select(ref.current);

		// Clear previous visualization
		svg.selectAll("*").remove();

		// Clear previous header
		d3.select("#dataviz header")
			.selectAll("*")
			.remove();

		switch (projectName) {
			case "BarChart":
				DrawChart(
					svg,
					curData
				);
				break;

			case "Choroploth":
				DrawChoroploth(
					svg,
					curData
				);
				break;

			// case "ScatterPlot":
			// 	DrawScatterplot(
			// 		svg,
			// 		curData
			// 	);
			// 	break;

			// case "Heatmap":
			// 	DrawHeatmap(
			// 		svg,
			// 		curData
			// 	);
			// 	break;

			// case "Treemap":
			// 	DrawTreemap(
			// 		svg,
			// 		curData
			// 	);
			// 	break;

			default:
				break;
		}
	}, [curData, projectName]);

	return (
		<div
			id="dataviz"
			className={styles.container}
		>
			<div className="home-btn">
				<NavLink
					to="/works"
					className="backHome-btn"
				>
					Back Home
				</NavLink>
			</div>

			<div className={styles.dataviz}>
				<header
					className={styles.header}
				/>

				<div className={styles.body}>
					<section
						className={styles.svgContainer}
					>
						<svg
							ref={ref}
							className={styles.svg}
						/>
					</section>

					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default SharedDatavizLayout;
