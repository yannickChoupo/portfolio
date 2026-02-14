import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

interface Project {
    name: string;
    techStack: string[];
    description: string;
    status: string;
    link?: string;
    use: (techStack: string[], tech: string) => boolean;
}

interface Category {
    name: string;
    techStack: string[];
    active?: boolean;
}

interface TechStack {
    tech: string;
    active: boolean;
}

const Projects: Project[] = [
    {
        name: "Calculator",
        techStack: ["HTML", "Javascript", "SCSS", "React"],
        description: "calculate",
        status: "available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        name: "Quote",
        techStack: ["Javascript", "Ajax", "React", "SCSS"],
        description: "Generate a Random Quote onclick",
        status: "available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        name: "Timer",
        techStack: ["Javascript", "React", "HTML", "SCSS", "Ajax"],
        description: "set a timer with Break Time an ring tone at the end of the time",
        status: "available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        name: "BarChart",
        techStack: ["Javascript", "D3", "Ajax", "React", "HTML"],
        description: "calculate",
        status: "not available",
        link: "/dataviz/BarChart",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
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
        name: "Timestamp",
        techStack: ["Express"],
        description: "Timestamp Microservice - Convert dates between Unix timestamp and UTC ISO-8601 formats. FreeCodeCamp API certification project.",
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
        link: "/dataviz/Heatmap",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        name: "MarkDownPreviewer",
        techStack: ["Javascript", "HTML", "SCSS", "React"],
        description: "Markdown Previewer - Live markdown editor with real-time preview using marked.js. Supports code blocks, tables, lists, and more.",
        status: "available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
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
        name: "TributePage",
        techStack: ["Javascript", "Ajax", "React"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        name: "Shapes",
        techStack: ["Javascript", "SCSS", "Ajax", "React"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        name: "Survey",
        techStack: ["Javascript", "Ajax", "SCSS", "PHP"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        name: "PalindromeChecker",
        techStack: ["Javascript", "SCSS"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        name: "CashRegister",
        techStack: ["Javascript", "SCSS"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        name: "CaeserCypher",
        techStack: ["Javascript", "SCSS"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        name: "Ito1Converter",
        techStack: ["Javascript", "SCSS"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        name: "TelephoneNumberValidator",
        techStack: ["Javascript", "SCSS"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        name: "DrumMachine",
        techStack: ["Javascript", "Ajax", "React"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        name: "RequestHeaderParser",
        techStack: ["Express"],
        description: "Request Header Parser Microservice - Parse HTTP request headers to extract client IP, language, and software information. FreeCodeCamp API certification project.",
        status: "available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        name: "URLShortener",
        techStack: ["Express", "MongoDB"],
        description: "URL Shortener Microservice - Create short URLs that redirect to original long URLs. Includes URL validation and database storage. FreeCodeCamp API certification project.",
        status: "available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        name: "FileMetadata",
        techStack: ["Express", "Multer"],
        description: "File Metadata Microservice - Upload files and receive metadata including file name, type, and size. Uses multer for file handling. FreeCodeCamp API certification project.",
        status: "available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        name: "ExerciseTracker",
        techStack: ["Express", "MongoDB"],
        description: "Exercise Tracker Microservice - Create users, add exercises, and retrieve exercise logs. Full CRUD functionality with MongoDB. FreeCodeCamp API certification project.",
        status: "available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        name: "TodoManager",
        techStack: ["Express", "MongoDB"],
        description: "Todo Manager API - Create, read, update, and delete tasks with full CRUD functionality. Manage your tasks with MongoDB storage.",
        status: "available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        name: "ArithmetixFormater",
        techStack: ["Python", "Express"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        name: "TimeCalculator",
        techStack: ["Express", "Python"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        name: "BudjetApp",
        techStack: ["Express", "Python"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        name: "PolygonAreaCalculator",
        techStack: ["Express", "Python"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        name: "ProbalityCalculator",
        techStack: ["Javascript", "Ajax", "React"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        name: "ProjectArchitecture",
        techStack: ["Docker"],
        description: "Description .....",
        status: "available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
]

const Categories: Category[] = [
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

const Works: React.FC = () => {
    const [curCategories, setcurCategories] = useState<Category[]>(Categories);
    const [curStack, setCurStack] = useState<TechStack[]>([])
    
    useEffect(() => {
        let newStackList: TechStack[] = [];
        Categories.forEach((projectItem, idx) => {
            projectItem.techStack.forEach((tech) => {
                if (idx === 0) {
                    newStackList.push({ tech: tech, active: true })
                } else {
                    newStackList.push({ tech: tech, active: false })
                }
            })
        })
        setCurStack(newStackList);

        const newCategoriesList = Categories.map((item, idx) => {
            return {
                ...item,
                active: idx === 0
            }
        })
        setcurCategories(newCategoriesList);
    }, []);

    const updateStack = (categories: Category[]): void => {
        let newStackList: TechStack[] = [];
        categories.forEach((curItem) => {
            const { techStack, active } = curItem;
            if (active) {
                techStack.forEach((tech) => {
                    newStackList.push({ tech: tech, active: true })
                })
            } else {
                techStack.forEach((tech) => {
                    newStackList.push({ tech: tech, active: false })
                })
            }
        })
        setCurStack(newStackList);
    }

    const updateCategories = (stack: TechStack[]): void => {
        const activeStack = stack.filter(({ active }) => active);
        const activeStacks = activeStack.map(item => item.tech);

        const newCategoriesList = Categories.map((curItem) => {
            const { techStack } = curItem;
            let match = false;
            techStack.forEach(item => {
                if (activeStacks.some(elem => elem === item)) {
                    match = true;
                }
            })
            return {
                ...curItem,
                active: match
            }
        })
        setcurCategories(newCategoriesList);
    }

    const handleCategorieChange = (e: React.MouseEvent<HTMLLIElement>): void => {
        const target = e.currentTarget;
        const categoryName = target.id;
        
        const newCategories = curCategories.map(item => {
            if (item.name === categoryName) {
                return {
                    ...item,
                    active: !item.active
                }
            }
            return item;
        })
        setcurCategories(newCategories);
        updateStack(newCategories);
    }

    const handleTechStackChange = (e: React.MouseEvent<HTMLLIElement>): void => {
        const target = e.currentTarget;
        const techName = target.id;
        
        const newStackList = curStack.map(item => {
            if (item.tech === techName) {
                return {
                    ...item,
                    active: !item.active
                }
            }
            return item;
        });
        setCurStack(newStackList);
        updateCategories(newStackList);
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
