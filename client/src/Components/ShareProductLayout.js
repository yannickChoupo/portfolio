import { NavLink, Outlet } from "react-router-dom";

const SharedProductLayout = () => {
	return (
		<>
			<NavLink
				to='/works'
			 	className="backHome-btn"
			 >
				Back Home
			</NavLink>
			<Outlet />
		</>
	)
}

export default SharedProductLayout;