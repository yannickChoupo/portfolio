import React, { useEffect, useState } from "react";
import {
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";
// import { MobileView, BrowserView } from 'react-device-detect';
// import history from "../helpers/history";

// import Projects from "../data";
import RandomQuote from "../Projects/algorithm/RamdomQuote";
import Calculator from "../Projects/algorithm/calculator";
import Timer from "../Projects/algorithm/Timer.js";
import BarChart from "../Projects/dataviz/BarChart";
import ScatterPlot from "../Projects/dataviz/Scatterplot";
import TimesTamp from "../Projects/backend/timesTamp";
import Heatmap from "../Projects/dataviz/Heatmap";
import MarkDownPreviewer from "../Projects/algorithm/markDownPreviewer";



import { useDispatch, useSelector } from "react-redux";
import { launchDemo, stopDemo } from "../redux/actions/demo"
// import DemoLauncher from "../Components/DemoLauncher";
// import { active, curveStepAfter } from "d3";

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
        name: "Choreploth",
        techStack: ["Javascript", "Ajax", "D3"],
        description: "Description .....",
        status: "not available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        // id: 4,
        name: "Treemap",
        techStack: ["Javascript", "Ajax", "D3"],
        description: "Description .....",
        status: "not available",
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

const Project = () => {
    let { projectName } = useParams();
    console.log(projectName);
    if (projectName === "Calculator") {
        return <Calculator />
    } else if (projectName === "Quote") {
        return <RandomQuote />
    } else if (projectName === "Timer") {
        return <Timer />
    } else if (projectName === "BarChart") {
        return <BarChart />
    } else if (projectName === "ScatterPlot") {
        return <ScatterPlot />
    } else if (projectName === "Timestamp") {
        return <TimesTamp />
    } else if (projectName === "MarkDownPreviewer") {
        return <MarkDownPreviewer />
    } else if (projectName === "Heatmap") {
        return <Heatmap />
    } else {
        return (
            <h4>Project not jet available here</h4>
        );
    }
}

// const Categorie = () => {
//     let { categorieName } = useParams();
//     // console.log(categorieName);
//     if (categorieName === "Responsive") {
//         return <h1>Responsive</h1>;
//     } else if (categorieName === "Algorithm") {
//         return <h1>Algorithm</h1>;
//     } else if (categorieName === "Dataviz") {
//         return <h1>Dataviz</h1>;
//     } else if (categorieName === "Libraries") {
//         return <h1>Libraries</h1>;
//     } else if (categorieName === "Backend") {
//         return <h1>Backend</h1>;
//     } else {
//         return (
//             <h4>Project not jet available here</h4>
//         );
//     }
// }

const Works = () => {
    // const [curProjects, setCurProjects] = useState(Projects);
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
    }, []);



    const dispatch = useDispatch();
    const { demoIsLaunch } = useSelector(state => state.demo);

    let { url } = useRouteMatch();

    // const [projectName, setProjectName] = useState("")
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
            <div id="work" className="page">
                <Route exact path={url}>
                    <div className="page-container">
                        <h2>Work</h2>
                        <div className="filters">
                            <div id="categorie">
                                <h4>Categorie</h4>
                                <ul className="filterList close">
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
                                <ul className="filterList">
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
                        <ul className="work-list">
                            {Projects.map((project, idx) => {
                                const {
                                    name,
                                    techStack,
                                    status
                                } = project;
                                // console.log(project.use(techStack, "React"));
                                const activeStack = curStack.filter(({ active }) => active);
                                const activeStacks = activeStack.map(item => item.tech);
                                if (activeStacks.some(elem => project.use(techStack, elem))
                                    && status === "available") {
                                    return (
                                        <li className="list-item project-card" key={idx}>
                                            <div className="title">
                                                <h3>{name}</h3>
                                                <div className="techList">
                                                    {
                                                        techStack.map((tech, idx) => {
                                                            if (idx === techStack.length - 1) {
                                                                return (<span key={tech}>{tech}</span>)
                                                            }
                                                            return (<span key={tech}>{tech},</span>)
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className="item-link">
                                                <Link to={`${url}/${name}`}
                                                    className="work-link"
                                                    onClick={() => dispatch(launchDemo())}>
                                                    Demo
                                                </Link>
                                            </div>
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                    </div>
                </Route>
                <Route exact path={`${url}/:projectName`}>
                    {demoIsLaunch && <Link to={url} className="backHome-btn"
                        onClick={() => dispatch(stopDemo())}> Back Home </Link>
                    }
                    <Project />
                </Route>
            </div>
        </>
    )
}

export default Works;
