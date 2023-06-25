import { NavLink, Outlet } from "react-router-dom";

const SharedProjectLayout = () => {
	return (
		<div className="project-wrapper container">
			{/* <div className="page container */}
				<Outlet />
			{/* </div> */}
		</div>
	)
}

export default SharedProjectLayout;