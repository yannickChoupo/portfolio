import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./navBar";
import SideBar from "./sidebar";
import {
	CSSTransition,
	TransitionGroup,
} from "react-transition-group";

const SharedLayout = () => {
	const location = useLocation();
	const page = React.useRef(null);

	return (
		<>
			<div id="app" className="app">
				<NavBar  />
		    	{/* <SideBar /> */}
				<TransitionGroup>
					<CSSTransition
						timeout={1000}
						classNames="pages"
						key={location.key}
						nodeRef={page}>
						<div className="page container" ref={page}>
							<Outlet />
						</div>
					</CSSTransition>
				</TransitionGroup>
			</div>
		</>
	)
}

export default SharedLayout;