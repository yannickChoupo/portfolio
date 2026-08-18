import { mergeStyleSets } from "@fluentui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { toggleHamburger } from "../../features/hamburgerSlice";

const styles = mergeStyleSets({
	hamburgercontainer: {
		width: "fit-content",
		display: "flex",
	},
	hamburger: {
		width: "1.6em",
		height: "1.6em",
		position: "relative",
		cursor: "pointer",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		background: "transparent",
		border: "none",
		":hover": {
			opacity: 0.8,
		},
	},
	line: {
		width: "100%",
		height: "3px",
		backgroundColor: "#6002ed",
		transition: "all 0.3s ease",
		position: "relative",
		"::before": {
			content: "''",
			position: "absolute",
			width: "100%",
			height: "3px",
			backgroundColor: "#6002ed",
			top: "-10px",
			transition: "all 0.3s ease",
		},
		"::after": {
			content: "''",
			position: "absolute",
			width: "100%",
			height: "3px",
			backgroundColor: "#6002ed",
			top: "10px",
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

const Hamburger = () => {
	const { isOpen } = useSelector((state: RootState) => state.hamburger);

	const dispatch = useDispatch();
	
	const handleHamburgerClick = () => {
		dispatch(toggleHamburger())
	}

	return (
		<div
			className={styles.hamburgercontainer}
		>
			<div
				className={styles.hamburger}
				onClick={handleHamburgerClick}
				aria-label="Toggle menu"
				aria-expanded={isOpen}
			>
				<div className={`${styles.line} ${isOpen ? styles.lineOpen : ''}`} />
			</div>
		</div>
	);
};

export default Hamburger;
