import React from "react";
import {CSSTransition} from 'react-transition-group';
import Calculator from "./Projects/Calculator/calculator";
import RandomQuote from "./Projects/RamdomQuote/RamdomQuote";
import Timer from "./Projects/Timer/Timer";
import BarChart from "./Projects/DataVisualisation/BarChart";
import ScatterPlot from "./Projects/DataVisualisation/Scatterplot";
import {useSelector} from "react-redux";

const Project = ({projectName}) => {
    // let {projectName} = useParams();
    console.log(projectName);
    // let Project;
    if (projectName === "Calculator") {
        return <Calculator/>
    } else if (projectName === "Quote") {
        return <RandomQuote/>
    } else if (projectName === "Timer") {
        return <Timer/>
    } else if (projectName === "BarChart") {
        return <BarChart/>
    } else if (projectName === "ScatterPlot") {
        return <ScatterPlot/>
    } else {
        return null;
    }
}
const DemoLauncher = ({unMountProject, projectName}) => {
    const {demoIsLaunch} = useSelector(state => state.demo);
    console.log("new project*************", projectName);
    return (
        <>
            {
                // demoIsLaunch
                <CSSTransition
                    in={demoIsLaunch}
                    classNames="launch"
                    timeout={200}
                    unmountOnExit>
                    <div className="work-wrapper page-container">
                        <Project projectName={projectName}/>
                        <div className="button" onClick={unMountProject}>
                            &#9746;
                        </div>
                    </div>
                </CSSTransition>
            }
        </>
    )
    // } else {
    //     return (
    //         <div className="project-wrapper">
    //             <h1> Not available</h1>
    //         </div>
    //     )
    // }

    // }
    // }else{
    //     return (
    //             <>
    //                 <CSSTransition
    //                     in={demoIsLaunch}
    //                     classNames="launch"
    //                     timeout={500}
    //                     unmountOnExit>
    //                     {/*<Calculator/>*/}
    //                     <div className="work-wrapper">
    //                         <h1>Project launch</h1>
    //                         <span className="btn btn-close" onClick={unMountProject}>Unmount</span>
    //                     </div>
    //                 </CSSTransition>
    //             </>
    //
    //         )
    // }
    // if (demoIsLaunch) {
    //     return (
    //         <>
    //             <CSSTransition
    //                 in={demoIsLaunch}
    //                 classNames="launch"
    //                 timeout={500}
    //                 unmountOnExit>
    //                 {/*<Calculator/>*/}
    //                 <div className="work-wrapper">
    //                     <h1>Project launch</h1>
    //                     <span className="btn btn-close" onClick={unMountProject}>Unmount</span>
    //                 </div>
    //             </CSSTransition>
    //         </>
    //
    //     )
    // } else {
    //     return (
    //         <>
    //             <div className="work-wrapper">
    //                 <h1 className="bg-danger">
    //                     Project not launch
    //                 </h1>
    //                 <span className="btn" onClick={unMountProject}>Unmount</span>
    //             </div>
    //
    //         </>
    //
    //     )
    // }
}
// } else if (projectName === "RandomQuote") {
//     return <RandomQuote/>
// } else if (projectName === "Timer") {
//     return <Timer/>
// } else if (projectName === "BarChart") {
//     return <BarChart/>
// } else if (projectName === "ScatterPlot") {
//     return <ScatterPlot/>
// } else {
//     return (
//         <h4>Project not jet here available but on my account</h4>
//     );
// }

export default DemoLauncher;