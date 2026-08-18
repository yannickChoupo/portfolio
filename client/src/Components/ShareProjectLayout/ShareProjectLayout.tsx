import React from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

const SharedProjectLayout: React.FC = () => {
	return (
		<div className="project">
			<div className="home-btn">
				<NavLink
					to='/works'
					className="backHome-btn"
				>
					Back Home
				</NavLink>
			</div>
			<Outlet />
		</div>
	);
};

export default SharedProjectLayout;
