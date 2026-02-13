import React from "react";
import { NavLink, useParams } from "react-router-dom";

import RandomQuote from "../Projects/algorithm/RamdomQuote";
import Calculator from "../Projects/algorithm/calculator";
import Timer from "../Projects/algorithm/Timer.js";
import TimesTamp from "../Projects/backend/timesTamp";
import MarkDownPreviewer from "../Projects/algorithm/markDownPreviewer";
import RequestHeaderParser from "../Projects/backend/requestHeaderParser";
import UrlShortener from "../Projects/backend/urlShortener";
import FileMetadata from "../Projects/backend/fileMetadata";
import ExerciseTracker from "../Projects/backend/exerciseTracker";
import TodoManager from "../Projects/backend/todoManager";
import ProjectArchitecture from "../Projects/docker/projectarchitecture";


const Project: React.FC = () => {
    const { projectName } = useParams();

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
                            : projectName === "Timestamp" ? <TimesTamp />
                                : projectName === "MarkDownPreviewer" ? <MarkDownPreviewer />
                                    : projectName === "RequestHeaderParser" ? <RequestHeaderParser />
                                        : projectName === "URLShortener" ? <UrlShortener />
                                            : projectName === "FileMetadata" ? <FileMetadata />
                                                : projectName === "ExerciseTracker" ? <ExerciseTracker />
                                                    : projectName === "TodoManager" ? <TodoManager /> 
                                                        : projectName === "ProjectArchitecture" ? <ProjectArchitecture /> :

                                                        (<h4> the project {projectName} not jet available here</h4>)
            }
        </>
    )
}

export default Project;
