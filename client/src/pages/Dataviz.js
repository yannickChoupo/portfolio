import React from "react";
import { NavLink, useParams } from "react-router-dom";

const projects = [
    {
        name: "BarChart",
        techStack: ["Javascript", "D3", "Ajax", "React", "HTML"],
        description: "calculate",
        status: "available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        name: "ScatterPlot",
        techStack: ["Javascript", "D3", "HTML", "React"],
        description: "description...",
        status: "available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        name: "Heatmap",
        techStack: ["Javascript", "Ajax", "React"],
        description: "Description .....",
        status: "available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        name: "Choreploth",
        techStack: ["Javascript", "Ajax", "D3"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        name: "Treemap",
        techStack: ["Javascript", "Ajax", "D3"],
        description: "Description .....",
        status: "available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
]

const Dataviz = () => {
    let { projectName } = useParams();
    return (
        <div id="dataviz-home">
            <h1>Dataviz home </h1>
            <div className="dataviz-list">
                {projects.map((project, idx) => {
                    const {
                        name,
                        techStack,
                        status
                    } = project;
                    // const activeStack = curStack.filter(({ active }) => active);
                    // const activeStacks = activeStack.map(item => item.tech);
                    // if (activeStacks.some(elem => project.use(techStack, elem))
                    // 	&& status === "available") {
                    return (
                        <NavLink
                            to={project.link ? project.link : `/works/${name}`}
                            className="list-item project-card"
                            key={name + techStack + idx}
                        >
                            {name}
                        </NavLink>
                    )
                    // }
                })}
            </div>
        </div>
    )
}


export default Dataviz;