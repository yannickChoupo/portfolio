import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toggleHamburger } from '../features/hamburger/hamburgerSlice';
import { makeStyles, 
	// tokens, 
	// Button
 } from "@fluentui/react";
import type { RootState } from "../store";

const useStyles = makeStyles({
	hamburger: {
		width: "30px",
		height: "30px",
		position: "relative",
		cursor: "pointer",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		background: "transparent",
		border: "none",
		padding: 0,
		":hover": {
			opacity: 0.8,
		},
	},
	line: {
		width: "100%",
		height: "3px",
		// backgroundColor: tokens.colorBrandForeground1,
		transition: "all 0.3s ease",
		position: "relative",
		"::before": {
			content: "''",
			position: "absolute",
			width: "100%",
			height: "3px",
			// backgroundColor: tokens.colorBrandForeground1,
			top: "-8px",
			transition: "all 0.3s ease",
		},
		"::after": {
			content: "''",
			position: "absolute",
			width: "100%",
			height: "3px",
			// backgroundColor: tokens.colorBrandForeground1,
			top: "8px",
			transition: "all 0.3s ease",
		},
	},
	lineOpen: {
		backgroundColor: "transparent",
		"::before": {
			transform: "rotate(45deg)",
			top: 0,
		},
		"::after": {
			transform: "rotate(-45deg)",
			top: 0,
		},
	},
});

const Hamburger: React.FC = () => {
	const dispatch = useDispatch();
	const { isOpen } = useSelector((state: RootState) => state.hamburger);
	const styles = useStyles();

	const switchMode = () => {
		dispatch(toggleHamburger());
	};

	return (
		<button
			className={styles.hamburger}
			onClick={switchMode}
			aria-label="Toggle menu"
			aria-expanded={isOpen}
		>
			<div className={`${styles.line} ${isOpen ? styles.lineOpen : ''}`} />
		</button>
	);
};

export default Hamburger;
