import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./navigation/navBar";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { makeStyles } from "@fluentui/react-components";

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
	const location = useLocation();
	const page = React.useRef<HTMLDivElement>(null);
	const styles = useStyles();

	return (
		<div id="app" className={styles.app}>
			<NavBar />
			<TransitionGroup>
				<CSSTransition
					timeout={1000}
					classNames="pages"
					key={location.key}
					nodeRef={page}
				>
					<div className={styles.pageContainer} ref={page}>
						<Outlet />
					</div>
				</CSSTransition>
			</TransitionGroup>
		</div>
	);
};

export default SharedLayout;
