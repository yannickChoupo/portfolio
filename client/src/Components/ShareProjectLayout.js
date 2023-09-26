import { Outlet } from "react-router-dom";

const SharedProjectLayout = () => {
	return (
		<div className="project">
			<Outlet />
		</div>
	)
}

export default SharedProjectLayout;