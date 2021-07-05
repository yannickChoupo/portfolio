import React, {useState} from "react";
import $ from "jquery";
import {
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";
import {MobileView, BrowserView} from 'react-device-detect'

import Projects from "../data";
import RandomQuote from "../Components/Projects/RamdomQuote/RamdomQuote";
import Calculator from "../Components/Projects/Calculator/calculator";
import Timer from "../Components/Projects/Timer/Timer.js";
import BarChart from "../Components/Projects/DataVisualisation/BarChart";
import ScatterPlot from "../Components/Projects/DataVisualisation/Scatterplot"


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
        $("body").css("overflow", "hidden");
        setProjectName(projectName);
        dispatch(launchDemo());
    }
    const unMountProject = () => {
        console.log("unmount project");
        $("body").css("overflow", "auto");
        dispatch(stopDemo());
    }
    return (
        <>
            <MobileView>
                <div id="work" className="page">
                    <div className="page-container">
                        <section className="work-home">
                            <h2>Work</h2>
                            <ul className="work-list">
                                {Projects.map((project, idx) => {
                                    const {
                                        name
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
                        </section>
                        <DemoLauncher unMountProject={unMountProject} projectName={projectName}/>
                    </div>
                </div>
            </MobileView>
            <BrowserView>
                <div id="work" className="page">
                    {demoIsLaunch &&
                        <Link to={url}
                              className="backHome-btn"
                              onClick={() => dispatch(stopDemo())}>
                            Back Home
                        </Link>
                    }
                    <Route path={`${url}/:projectName`}>
                        <Project/>
                    </Route>
                    <Route exact path={url}>
                        <div className="page-container">
                            <h2>Work</h2>
                            <ul className="work-list">
                                {Projects.map((project, idx) => {
                                    const {
                                        name
                                    } = project;
                                    return (
                                        <li className="list-item project-card" key={idx}>
                                            <div className="title">
                                                {name}
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
                                })}
                            </ul>
                        </div>
                    </Route>
                </div>
                {/*<Route path={`${url}/:projectName`}>*/}
                {/*    <Project/>*/}
                {/*</Route>*/}
                {/*<Route exact path={url}>*/}
                {/*    <h2>Work</h2>*/}
                {/*    <ul>*/}
                {/*        {Projects.map((project, idx) => {*/}
                {/*            const {*/}
                {/*                name,*/}
                {/*                techUsed,*/}
                {/*                url*/}
                {/*            } = project;*/}
                {/*            return (*/}
                {/*                <li className="list-item project-card" key={idx}>*/}
                {/*                    <div className="title">*/}
                {/*                        {name}*/}
                {/*                    </div>*/}
                {/*                    <div className="item-link">*/}
                {/*                        <Link to={`${url}/${name}`} className="link">Demo</Link>*/}
                {/*                    </div>*/}
                {/*                </li>*/}
                {/*            )*/}
                {/*        })}*/}
                {/*    </ul>*/}
                {/*</Route>*/}
            </BrowserView>
        </>
    )
}
const Project = () => {
    let {projectName} = useParams();
    console.log(projectName);
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
        return (
            <h4>Project not jet available here</h4>
        );
    }
}
export default Works;