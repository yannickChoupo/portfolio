import { Outlet } from "react-router-dom";
import NavBar from "./navBar";
import SideBar from "./sidebar";

const SharedLayout = () => {
	return (
		<>
			<NavBar  />
		    <SideBar />
			<section className="page">
				<Outlet />
			</section>
		</>
	)
}

export default SharedLayout;