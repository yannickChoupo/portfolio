import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { Title1, makeStyles, tokens } from "@fluentui/react-components";

interface Project {
	name: string;
	techStack: string[];
	description: string;
	status: 'available' | 'not available';
	link?: string;
}

const projects: Project[] = [
	{
		name: "BarChart",
		techStack: ["Javascript", "D3", "Ajax", "React", "HTML"],
		description: "calculate",
		status: "available",
	},
	{
		name: "ScatterPlot",
		techStack: ["Javascript", "D3", "HTML", "React"],
		description: "description...",
		status: "available",
	},
	{
		name: "Heatmap",
		techStack: ["Javascript", "Ajax", "React"],
		description: "Description .....",
		status: "available",
	},
	{
		name: "Choreploth",
		techStack: ["Javascript", "Ajax", "D3"],
		description: "Description .....",
		status: "not available",
	},
	{
		name: "Treemap",
		techStack: ["Javascript", "Ajax", "D3"],
		description: "Description .....",
		status: "available",
	},
];

const useStyles = makeStyles({
	container: {
		padding: "20px",
	},
	title: {
		textAlign: "center",
		marginBottom: "30px",
	},
	datavizList: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
		gap: "20px",
		padding: "20px",
	},
	projectCard: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		minHeight: "150px",
		textDecoration: "none",
		color: tokens.colorNeutralForeground1,
		backgroundColor: tokens.colorNeutralBackground1,
		border: `2px solid ${tokens.colorNeutralStroke1}`,
		borderRadius: tokens.borderRadiusMedium,
		fontSize: "18px",
		fontWeight: "600",
		transition: "all 0.3s ease",
		":hover": {
			backgroundColor: tokens.colorBrandBackground,
			color: tokens.colorNeutralForegroundOnBrand,
			transform: "translateY(-4px)",
			boxShadow: tokens.shadow16,
		},
	},
});

const Dataviz: React.FC = () => {
	const { projectName } = useParams<{ projectName?: string }>();
	const styles = useStyles();

	if (projectName) {
		return null;
	}

	return (
		<div id="dataviz-home" className={styles.container}>
			<Title1 className={styles.title}>Dataviz Home</Title1>
			<div className={styles.datavizList}>
				{projects.map((project, idx) => {
					const { name } = project;
					return (
						<NavLink
							to={project.link || `/dataviz/${name}`}
							className={styles.projectCard}
							key={`${name}-${idx}`}
						>
							{name}
						</NavLink>
					);
				})}
			</div>
		</div>
	);
};

export default Dataviz;
