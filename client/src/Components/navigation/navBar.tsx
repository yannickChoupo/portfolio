import { NavLink } from "react-router-dom";
import SideBar from "./sidebar";
import Hamburger from "../hamburger";


export const NavBar = () => {
    return (
        <>
            <div className="navbar">
                <div className="container nav-body">
                    <NavLink
                        className="logo navbar-link "
                        aria-current="page"
                        to='/'>
                      &#127960;
                    </NavLink>
                    <Hamburger />
                    <SideBar />
                </div>
            </div>
        </>
    )
}

export default NavBar;
