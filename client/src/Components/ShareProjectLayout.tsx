import React from "react";
import { Outlet } from "react-router-dom";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
	project: {
		width: "100%",
		padding: "20px",
	},
});

const SharedProjectLayout: React.FC = () => {
	const styles = useStyles();

	return (
		<div className={styles.project}>
			<Outlet />
		</div>
	);
};

export default SharedProjectLayout;
