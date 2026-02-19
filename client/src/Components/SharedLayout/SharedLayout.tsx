import React from "react";
import { useRef } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../navigation/navBar";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { makeStyles } from "@fluentui/react-components";
import Footer from "../footer";

const useStyles = makeStyles({
	app: {
		minHeight: "100vh",
		display: "flex",
		flexDirection: "column",
	},
	pageContainer: {
		flex: 1,
		padding: "20px",
		maxWidth: "1200px",
		margin: "0 auto",
		width: "100%",
	},
});

const SharedLayout: React.FC = () => {
	const page = React.useRef<HTMLDivElement>(null);
	const styles = useStyles();
	const location = useLocation();
	const nodeRef = useRef<HTMLDivElement>(null);

	return (
		<>
			<NavBar />
			<div id="app" className={styles.app}>
				<TransitionGroup className="transitiongroup">
					<CSSTransition
						timeout={1000}
						classNames="pages"
						key={location.pathname}
						nodeRef={page}
						unmountOnExit
					>
						<div className={styles.pageContainer} ref={nodeRef}>
							<Outlet />
						</div>
					</CSSTransition>
				</TransitionGroup>
			</div>
			<Footer />
		</>
	);
};

export default SharedLayout;

