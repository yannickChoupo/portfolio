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
}

export default DemoLauncher;