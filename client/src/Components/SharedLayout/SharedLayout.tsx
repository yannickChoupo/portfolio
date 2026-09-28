import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../navigation/navBar";
import Footer from "../footer";
import { VisitorTracker } from "../VisitorTracker/visitorTracker";

const SharedLayout: React.FC = () => {

	return (
		<>
			<VisitorTracker />
			<header>
				<NavBar />
			</header>
			<Outlet />
			<Footer />
		</>
	);
};

export default SharedLayout;

