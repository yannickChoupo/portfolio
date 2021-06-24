import React, {useState} from "react";
import {
    // Route,
    Link,
    // useParams,
    useRouteMatch
} from "react-router-dom";

import Projects from "../data";
// import RandomQuote from "../Components/Projects/RamdomQuote/RamdomQuote";
// import Calculator from "../Components/Projects/Calculator/calculator";
// import Timer from "../Components/Projects/Timer/Timer.js";
// import BarChart from "../Components/Projects/DataVisualisation/BarChart";
// import ScatterPlot from "../Components/Projects/DataVisualisation/Scatterplot"


import {useDispatch, useSelector} from "react-redux";
import {launchDemo, stopDemo} from "../redux/actions/demo"
import DemoLauncher from "../Components/DemoLauncher";

const Works = () => {
    const dispatch = useDispatch();
    const {demoIsLaunch} = useSelector(state => state.demo);
    let {url} = useRouteMatch();
    const [projectName, setProjectName] = useState("")
    console.log(url);
    const mountProject = (projectName) => {
        console.log("Load : ", projectName);
        setProjectName(projectName);
        dispatch(launchDemo());
    }
    const unMountProject = () => {
        console.log("unmount project")
        dispatch(stopDemo());
    }
    return (
        <>
            {/*<MobileView>*/}
                <div id="work" className="page">
                    <div className="page-container">
                        <section className="work-home">
                            <h2>Work</h2>
                            {/*<section className="body">*/}
                                <ul className="work-list">
                                    {Projects.map((project, idx) => {
                                        const {
                                            name,
                                            techUsed,
                                            url
                                        } = project;
                                        return (
                                            <li className="list-item project-card" key={idx}>
                                                <div className="title">
                                                    {name}
                                                </div>
                                                <div className="item-link">
                                                <span className="work-link" onClick={() => mountProject(name)}>
                                                    Demo
                                                </span>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            {/*</section>*/}
                        </section>
                        <DemoLauncher unMountProject={unMountProject} projectName={projectName}/>
                    </div>
                </div>
            {/*</MobileView>*/}
            {/*<BrowserView>*/}
            {/*    <h1>*/}
            {/*        not jet available*/}
            {/*    </h1>*/}
            {/*</BrowserView>*/}
        </>
    )
}
// const Project = (projectName) => {
//     // let {projectName} = useParams();
//     console.log(projectName);
//     let Project;
//     if (projectName === "Calculator") {
//         return <Calculator/>
//     } else if (projectName === "RandomQuote") {
//         return <RandomQuote/>
//     } else if (projectName === "Timer") {
//         return <Timer/>
//     } else if (projectName === "BarChart") {
//         return <BarChart/>
//     } else if (projectName === "ScatterPlot") {
//         return <ScatterPlot/>
//     } else {
//         return null;
//     }
// }
export default Works;