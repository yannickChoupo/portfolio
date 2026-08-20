import { useDispatch, useSelector } from "react-redux";
import { toggleHamburger } from "../../features/hamburgerSlice";
import type { RootState } from "../../store";

const Hamburger = () => {
	const { isOpen } = useSelector(
		(state: RootState) => state.hamburger
	);

	const dispatch = useDispatch();

	const handleHamburgerClick = () => {
		dispatch(toggleHamburger());
	};

	return (
		<div className="hamburger-container">
			<div
				className={`hamburger ${isOpen ? "hamburger--close" : "hamburger--open"}`}
				onClick={handleHamburgerClick}
				aria-label="Toggle menu"
				aria-expanded={isOpen}
			>
				<span className="hamburger__line" />
			</div>
		</div>
	);
};

export default Hamburger;