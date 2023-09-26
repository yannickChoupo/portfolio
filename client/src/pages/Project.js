import React  from "react";
import { NavLink, useParams } from "react-router-dom";

import RandomQuote from "../Projects/algorithm/RamdomQuote";
import Calculator from "../Projects/algorithm/calculator";
import Timer from "../Projects/algorithm/Timer.js";
<<<<<<< HEAD
import TimesTamp from "../Projects/backend/api/timesTamp";
import MarkDownPreviewer from "../Projects/algorithm/markDownPreviewer";
import URLShortener from "../Projects/backend/api/urlShortener";
import RequestHeaderParser from "../Projects/backend/api/requestHeaderParser";
import FileMetaData from "../Projects/backend/api/fileMetaData";
import ExerciseTracker from "../Projects/backend/api/exerciseTracker";
// import Heatmap from "../Projects/dataviz/heatmap";
// import Choroploth from "../Projects/dataviz/Choroploth";
// import Treemap from "../Projects/dataviz/treemap";

const projects = [
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
        status: "available",
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
        status: "available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
    {
        // id: 4,
        name: "URLShortener",
        techStack: ["Express"],
        description: "Description .....",
        status: "available",
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
    {
        // id: 4,
        name: "ExerciseTracker",
        techStack: ["Express", "MongoDB"],
        description: "Description .....",
        status: "available",
        use: (techStack, tech) => {
            return techStack.some(elem => elem === tech);
        }
    },
]
=======
import TimesTamp from "../Projects/backend/timesTamp";
import MarkDownPreviewer from "../Projects/algorithm/markDownPreviewer";

// const projects = [
//     {
//         // id: 1,
//         name: "Calculator",
//         techStack: ["HTML", "Javascript", "SCSS", "React"],
//         description: "calculate",
//         status: "available",
//         use: (techStack, tech) => {
//             return techStack.some(elem => elem === tech);
//         }
//     },
//     {
//         // id: 2,
//         name: "Quote",
//         techStack: ["Javascript", "Ajax", "React", "SCSS"],
//         description: "Generate a Random Quote onclick",
//         status: "available",
//         use: (techStack, tech) => {
//             return techStack.some(elem => elem === tech);
//         }
//     },
//     {
//         // id: 3,
//         name: "Timer",
//         techStack: ["Javascript", "React", "HTML", "SCSS", "Ajax"],
//         description: "set a timer with Break Time an ring tone at the end of the time",
//         status: "available",
//         use: (techStack, tech) => {
//             return techStack.some(elem => elem === tech);
//         }
//     },
//     {
//         // id: 3,
//         name: "BarChart",
//         techStack: ["Javascript", "D3", "Ajax", "React", "HTML"],
//         description: "calculate",
//         status: "available",
//         use: (techStack, tech) => {
//             return techStack.some(elem => elem === tech);
//         }
//     },
//     {
//         // id: 4,
//         name: "ScatterPlot",
//         techStack: ["Javascript", "D3", "HTML", "React"],
//         description: "description...",
//         status: "available",
//         use: (techStack, tech) => {
//             return techStack.some(elem => elem === tech);
//         }
//     },
//     {
//         // id: 4,
//         name: "Timestamp",
//         techStack: ["Express"],
//         description: "description .....",
//         status: "available",
//         use: (techStack, tech) => {
//             return techStack.some(elem => elem === tech);
//         }
//     },
//     {
//         // id: 4,
//         name: "Heatmap",
//         techStack: ["Javascript", "Ajax", "React"],
//         description: "Description .....",
//         status: "available",
//         use: (techStack, tech) => {
//             return techStack.some(elem => elem === tech);
//         }
//     },
//     {
//         // id: 4,
//         name: "MarkDownPreviewer",
//         techStack: ["Javascript", "HTML", "SCSS", ""],
//         description: "Description .....",
//         status: "available",
//         use: (techStack, tech) => {
//             return techStack.some(elem => elem === tech);
//         }
//     },
//     {
//         // id: 4,
//         name: "Choreploth",
//         techStack: ["Javascript", "Ajax", "D3"],
//         description: "Description .....",
//         status: "not available",
//         use: (techStack, tech) => {
//             return techStack.some(elem => elem === tech);
//         }
//     },
//     {
//         // id: 4,
//         name: "Treemap",
//         techStack: ["Javascript", "Ajax", "D3"],
//         description: "Description .....",
//         status: "available",
//         use: (techStack, tech) => {
//             return techStack.some(elem => elem === tech);
//         }
//     },
//     {
//         // id: 4,
//         name: "TributePage",
//         techStack: ["Javascript", "Ajax", "React"],
//         description: "Description .....",
//         status: "not available",
//         use: (techStack, tech) => {
//             return techStack.some(elem => elem === tech);
//         }
//     },
//     {
//         // id: 4,
//         name: "Shapes",
//         techStack: ["Javascript", "SCSS", "Ajax", "React"],
//         description: "Description .....",
//         status: "not available",
//         use: (techStack, tech) => {
//             return techStack.some(elem => elem === tech);
//         }
//     },
//     {
//         // id: 4,
//         name: "Survey",
//         techStack: ["Javascript", "Ajax", "SCSS", "PHP"],
//         description: "Description .....",
//         status: "not available",
//         use: (techStack, tech) => {
//             return techStack.some(elem => elem === tech);
//         }
//     },
//     {
//         // id: 4,
//         name: "PalindromeChecker",
//         techStack: ["Javascript", "SCSS"],
//         description: "Description .....",
//         status: "not available",
//         use: (techStack, tech) => {
//             return techStack.some(elem => elem === tech);
//         }
//     },
//     {
//         // id: 4,
//         name: "CashRegister",
//         techStack: ["Javascript", "SCSS"],
//         description: "Description .....",
//         status: "not available",
//         use: (techStack, tech) => {
//             return techStack.some(elem => elem === tech);
//         }
//     },
//     {
//         // id: 4,
//         name: "CaeserCypher",
//         techStack: ["Javascript", "SCSS"],
//         description: "Description .....",
//         status: "not available",
//         use: (techStack, tech) => {
//             return techStack.some(elem => elem === tech);
//         }
//     },
//     {
//         // id: 4,
//         name: "Ito1Converter",
//         techStack: ["Javascript", "SCSS"],
//         description: "Description .....",
//         status: "not available",
//         use: (techStack, tech) => {
//             return techStack.some(elem => elem === tech);
//         }
//     },
//     {
//         // id: 4,
//         name: "TelephoneNumberValidator",
//         techStack: ["Javascript", "SCSS"],
//         description: "Description .....",
//         status: "not available",
//         use: (techStack, tech) => {
//             return techStack.some(elem => elem === tech);
//         }
//     },
//     {
//         // id: 4,
//         name: "DrumMachine",
//         techStack: ["Javascript", "Ajax", "React"],
//         description: "Description .....",
//         status: "not available",
//         use: (techStack, tech) => {
//             return techStack.some(elem => elem === tech);
//         }
//     },
//     {
//         // id: 4,
//         name: "RequestHeaderParser",
//         techStack: ["Express"],
//         description: "Description .....",
//         status: "not available",
//         use: (techStack, tech) => {
//             return techStack.some(elem => elem === tech);
//         }
//     },
//     {
//         // id: 4,
//         name: "URLShortener",
//         techStack: ["Express"],
//         description: "Description .....",
//         status: "not available",
//         use: (techStack, tech) => {
//             return techStack.some(elem => elem === tech);
//         }
//     },
//     {
//         // id: 4,
//         name: "FileMataData",
//         techStack: ["Express"],
//         description: "Description .....",
//         status: "not available",
//         use: (techStack, tech) => {
//             return techStack.some(elem => elem === tech);
//         }
//     },
//     {
//         // id: 4,
//         name: "ArithmetixFormater",
//         techStack: ["Python", "Express"],
//         description: "Description .....",
//         status: "not available",
//         use: (techStack, tech) => {
//             return techStack.some(elem => elem === tech);
//         }
//     },
//     {
//         // id: 4,
//         name: "TimeCalculator",
//         techStack: ["Express", "Python"],
//         description: "Description .....",
//         status: "not available",
//         use: (techStack, tech) => {
//             return techStack.some(elem => elem === tech);
//         }
//     },
//     {
//         // id: 4,
//         name: "BudjetApp",
//         techStack: ["Express", "Python"],
//         description: "Description .....",
//         status: "not available",
//         use: (techStack, tech) => {
//             return techStack.some(elem => elem === tech);
//         }
//     },
//     {
//         // id: 4,
//         name: "PolygonAreaCalculator",
//         techStack: ["Express", "Python"],
//         description: "Description .....",
//         status: "not available",
//         use: (techStack, tech) => {
//             return techStack.some(elem => elem === tech);
//         }
//     },
//     {
//         // id: 4,
//         name: "ProbalityCalculator",
//         techStack: ["Javascript", "Ajax", "React"],
//         description: "Description .....",
//         status: "not available",
//         use: (techStack, tech) => {
//             return techStack.some(elem => elem === tech);
//         }
//     },
//     {
//         // id: 4,
//         name: "Visuals",
//         techStack: ["Javascript", "d3"],
//         description: "Description .....",
//         status: "not available",
//         use: (techStack, tech) => {
//             return techStack.some(elem => elem === tech);
//         }
//     },
// ]
>>>>>>> master

const Project = () => {
    let { projectName } = useParams();
    return (
        <>
            <div className="home-btn">
                <NavLink
                    to='/works'
                    className="backHome-btn"
                >
                    Back Home
                </NavLink>
            </div>
            {
                projectName === "Calculator" ? <Calculator />
                    : projectName === "Quote" ? <RandomQuote />
                        : projectName === "Timer" ? <Timer />
<<<<<<< HEAD
                            : projectName === "URLShortener" ? <URLShortener />
                                : projectName === "RequestHeaderParser" ? <RequestHeaderParser />
                                    : projectName === "FileMetaData" ? <FileMetaData />
                                        : projectName === "ExerciseTracker" ? <ExerciseTracker />
                                            : projectName === "Timestamp" ? <TimesTamp />
                                                : projectName === "MarkDownPreviewer" ? <MarkDownPreviewer /> :
                                                    // : projectName === "Treemap" ?  <Treemap /> :
                                                    (<h4> the project {projectName} not jet available here</h4>)
=======
                            : projectName === "Timestamp" ? <TimesTamp />
                                : projectName === "MarkDownPreviewer" ? <MarkDownPreviewer /> :

                                    (<h4> the project {projectName} not jet available here</h4>)
>>>>>>> master
            }
        </>
    )
}


export default Project;