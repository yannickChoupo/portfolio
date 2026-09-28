import React from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

const SharedProjectLayout: React.FC = () => {

	return (
		<>
			<section id="project-heading">
				<div className="home-btn home-heading">
					<NavLink
						to='/works'
						className="backHome-btn"
					>
						Back Home
					</NavLink>
				</div>
			</section>
			<Outlet />
		</>
	);
};

export default SharedProjectLayout;
