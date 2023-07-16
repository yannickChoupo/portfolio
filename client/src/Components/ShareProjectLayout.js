import { NavLink, Outlet } from "react-router-dom";

const SharedProjectLayout = () => {
	return (
		<div className="project">
			<div className="home-btn">
				<NavLink
					to='/works'
					className="backHome-btn"
				>
					Back Home
				</NavLink>
			</div>
			{/* <div className="page container"> */}
			<Outlet />
			{/* </div> */}
		</div>
	)
}

export default SharedProjectLayout;