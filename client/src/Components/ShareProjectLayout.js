import { NavLink, Outlet } from "react-router-dom";

const SharedProjectLayout = () => {
	return (
		<>
			<div className="page container">
				<Outlet />
			</div>
		</>
	)
}

export default SharedProjectLayout;