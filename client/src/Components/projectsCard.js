import React from "react";
import { Link } from 'react-router-dom';

const ProjectsCard = ({project}) => {
    const {
        idx,
        name,
        // techUsed,
        url
    } = project;
    console.log(url);
    return (
        <>
            <li className="work-card" key={idx}>
                <div className="work-card-content">
                    <span className="work-card-header">{name}</span>
                </div>
                <div className="work-card-body">
                    {/*<ul >*/}
                    {/*    {techUsed.map((tech, idx) => (<li key={idx}>{tech}</li>))}*/}
                    {/*</ul>*/}
                </div>
                <div className="work-card-footer">
                    <Link to={`${url}/${name}`}
                          className="link">
                        Demo
                    </Link>
                </div>
            </li>
        </>
    );
}

export default ProjectsCard;