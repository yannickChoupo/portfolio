import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Projects = [
    {
        // id: 1,
        name: "Calculator",
        techStack: ["HTML", "Javascript", "SCSS", "React"],
        description: "calculate",
        status: "available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        // id: 2,
        name: "Quote",
        techStack: ["Javascript", "Ajax", "React", "SCSS"],
        description: "Generate a Random Quote onclick",
        status: "available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        // id: 3,
        name: "Timer",
        techStack: ["Javascript", "React", "HTML", "SCSS", "Ajax"],
        description: "set a timer with Break Time an ring tone at the end of the time",
        status: "available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        // id: 3,
        name: "BarChart",
        techStack: ["Javascript", "D3", "Ajax", "React", "HTML"],
        description: "calculate",
        status: "available",
        link: "/dataviz/BarChart",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        // id: 4,
        name: "ScatterPlot",
        techStack: ["Javascript", "D3", "HTML", "React"],
        description: "description...",
        status: "available",
        link: "/dataviz/ScatterPlot",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        // id: 4,
        name: "Timestamp",
        techStack: ["Express"],
        description: "description .....",
        status: "available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        // id: 4,
        name: "Heatmap",
        techStack: ["Javascript", "Ajax", "React"],
        description: "Description .....",
        status: "available",
        link: "/dataviz/Heatmap",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        // id: 4,
        name: "MarkDownPreviewer",
        techStack: ["Javascript", "HTML", "SCSS", ""],
        description: "Description .....",
        status: "available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        // id: 4,
        name: "Choroploth",
        techStack: ["Javascript", "Ajax", "D3"],
        description: "Description .....",
        status: "available",
        link: "/dataviz/Choroploth",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        // id: 4,
        name: "Treemap",
        techStack: ["Javascript", "Ajax", "D3"],
        description: "Description .....",
        status: "available",
        link: "/dataviz/Treemap",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        // id: 4,
        name: "TributePage",
        techStack: ["Javascript", "Ajax", "React"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        // id: 4,
        name: "Shapes",
        techStack: ["Javascript", "SCSS", "Ajax", "React"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        // id: 4,
        name: "Survey",
        techStack: ["Javascript", "Ajax", "SCSS", "PHP"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        // id: 4,
        name: "PalindromeChecker",
        techStack: ["Javascript", "SCSS"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        // id: 4,
        name: "CashRegister",
        techStack: ["Javascript", "SCSS"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        // id: 4,
        name: "CaeserCypher",
        techStack: ["Javascript", "SCSS"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        // id: 4,
        name: "Ito1Converter",
        techStack: ["Javascript", "SCSS"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        // id: 4,
        name: "TelephoneNumberValidator",
        techStack: ["Javascript", "SCSS"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        // id: 4,
        name: "DrumMachine",
        techStack: ["Javascript", "Ajax", "React"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        // id: 4,
        name: "RequestHeaderParser",
        techStack: ["Express"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        // id: 4,
        name: "URLShortener",
        techStack: ["Express"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        // id: 4,
        name: "FileMataData",
        techStack: ["Express"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        // id: 4,
        name: "ArithmetixFormater",
        techStack: ["Python", "Express"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        // id: 4,
        name: "TimeCalculator",
        techStack: ["Express", "Python"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        // id: 4,
        name: "BudjetApp",
        techStack: ["Express", "Python"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        // id: 4,
        name: "PolygonAreaCalculator",
        techStack: ["Express", "Python"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        // id: 4,
        name: "ProbalityCalculator",
        techStack: ["Javascript", "Ajax", "React"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
]

const Categories = [
    {
        name: "Frontend",
        techStack: ["HTML", "SCSS/CSS", "Javascript", "React", "Bootstrap",]
    },
    {
        name: "Backend",
        techStack: ["Express", "PHP", "SQL", "MySQL", "MongoDB", "Python", "Django"]
    },
    {
        name: "Devops",
        techStack: ["Docker", "Kubernetes", "Git"]
    },
    {
        name: "IOT",
        techStack: ["C/C++", "Esp-idf", "Arduino"]
    }
]
const Works = () => {
    const [curCategories, setcurCategories] = useState(Categories);
    const [curStack, setCurStack] = useState([])

    const updateStack = () => {
        let newStackList = [];
        curCategories.map((curItem, idx) => {
            const { techStack, active } = curItem;
            if (active) {
                techStack.forEach((tech) => {
                    newStackList.push({ tech: tech, active: true })
                    return tech;
                })
            } else {
                techStack.forEach((tech) => {
                    newStackList.push({ tech: tech, active: false })
                    return tech;
                })
            }

            return curItem;
        })
        setCurStack(newStackList);
    }
    const updateCategories = () => {
        let newCategoriesList = [];
        const activeStack = curStack.filter(({ active }) => active);
        const activeStacks = activeStack.map(item => item.tech);

        newCategoriesList = curCategories.map((curItem, idx) => {
            const { techStack } = curItem;
            let match = false;
            techStack.forEach(item => {
                if (activeStacks.some(elem => elem === item)) {
                    match = true;
                }
            })
            if (match) {
                curItem.active = true;
            } else {
                curItem.active = false;
            }
            newCategoriesList.push(curItem);
            return curItem;
        })
        setcurCategories(newCategoriesList);
    }
    useEffect(() => {
        let newStackList = [];
        Categories.map((projectItem, idx) => {
            projectItem.techStack.forEach((tech) => {
                if (idx === 0) {
                    newStackList.push({ tech: tech, active: true })
                } else {
                    newStackList.push({ tech: tech, active: false })
                }
                return tech;
            })
            return projectItem;
        })
        setCurStack(newStackList);

        const newCategoriesList = curCategories.map((item, idx) => {
            if (idx === 0) {
                item.active = true;
            } else {
                item.active = false;
            }
            return item;
        })
        setcurCategories(newCategoriesList);
    }, [curCategories]);

    const handleCategorieChange = (e) => {
        const newCategories = curCategories.map(item => {
            const { active } = item;
            if (item.name === e.target.id) {
                if (active) {
                    item.active = false;
                } else {
                    item.active = true;
                }
            }
            return item;
        })
        setcurCategories(newCategories);
        updateStack();
    }

    const handleTechStackChange = (e) => {
        console.log(e.target.id)
        const newStackList = curStack.map(item => {
            const { tech } = item;
            if (tech === e.target.id) {
                if (item.active) {
                    item.active = false;
                } else {
                    item.active = true;
                }
                return item;
            } else {

                return item;
            }
        });
        setCurStack(newStackList);
        updateCategories();
    }
    return (
        <>
            <div id="work">
				<h2>Work</h2>
				<div className="filters">
					<div id="categorie">
						<h4>Categorie</h4>
						<ul className="filter-list close">
							{
								curCategories.map((curCategorie, idx) => {
									const { active } = curCategorie;
									return (
										<li
											id={curCategorie.name}
											className={active ? "active" : ""}
											onClick={handleCategorieChange}
											key={curCategorie.name + idx}
										>
											{curCategorie.name}
										</li>
									)
								})
							}
						</ul>
					</div>
					<div id="techStack">
						<h4>Tech stack</h4>
						<ul className="filter-list">
							{
								curStack.map((stack, idx) => {
									const { tech, active } = stack;
									return (
										<li
											id={tech}
											className={active ? "active" : ""}
											onClick={handleTechStackChange}
											key={tech + idx}
											>
											{tech}
										</li>
									)
								})
							}
						</ul>
					</div>
				</div>
				<div className="work-list">
					{Projects.map((project, idx) => {
						const {
							name,
							techStack,
							status
						} = project;
						const activeStack = curStack.filter(({ active }) => active);
						const activeStacks = activeStack.map(item => item.tech);
						if (activeStacks.some(elem => project.use(techStack, elem))
							&& status === "available") {
							return (
								<NavLink 
										to={project.link ? project.link : `/works/${name}`}
										className="list-item project-card"
										key={name + techStack + idx}
									>
										{name}
								</NavLink>
							)
						}
                        return null;
					})}
				</div>
			</div>
        </>
    )
}

export default Works;
 