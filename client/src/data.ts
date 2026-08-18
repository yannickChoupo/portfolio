export interface Project {
	name: string;
	techUsed: string[];
	description: string;
	status: 'available' | 'unavailable';
}

const Projects: Project[] = [
	{
		name: "Calculator",
		techUsed: ["Javascript", "React", "Bootstrap", "Jquery"],
		description: "calculate",
		status: "available"
	},
	{
		name: "Quote",
		techUsed: ["Javascript(Ajax)", "React", "Bootstrap", "Jquery"],
		description: "Generate a Random Quote onclick",
		status: "available"
	},
	{
		name: "Timer",
		techUsed: ["Javascript", "React", "Bootstrap", "Jquery"],
		description: "set a timer with Break Time an ring tone at the end of the time",
		status: "available"
	},
	{
		name: "BarChart",
		techUsed: ["Javascript(D3, Ajax)", "React", "Bootstrap", "Jquery"],
		description: "calculate",
		status: "available"
	},
	{
		name: "ScatterPlot",
		techUsed: ["Javascript(D3, Ajax)", "React", "Bootstrap", "Jquery"],
		description: "calculate",
		status: "available"
	},
	{
		name: "Timestamp",
		techUsed: ["Javascript(Ajax)", "React", "express"],
		description: "Generate a timestamp",
		status: "available"
	},
	{
		name: "Heatmap",
		techUsed: ["Javascript(Ajax)", "React", "express"],
		description: "calculate",
		status: "available"
	}
];

export default Projects;
