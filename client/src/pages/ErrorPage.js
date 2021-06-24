import React from "react";
import {Link} from "react-router-dom";

const Error = () => {
    return (
        <>
            <div className="page">
                <div className="page-container">
                    <h1>The page couldn't be found</h1>
                    <Link to="/">Home</Link>
                </div>
            </div>
        </>
    );
}

export default Error;