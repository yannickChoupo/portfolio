import { NavLink } from "react-router-dom";
import SideBar from "./sidebar";
import Hamburger from "../hamburger";
import { BuildingHome32Regular } from '@fluentui/react-icons';

export const NavBar = () => {
    return (
        <>
            <nav className="navbar">
                <div className="container nav-body">
                    <NavLink
                        className="navbar-link logo"
                        aria-current="page"
                        to='/'>
                        {/* &#127960; */}
                        <BuildingHome32Regular aria-hidden="true" />
                    </NavLink>
                    <Hamburger />
                    <SideBar />
                </div>
            </nav>
        </>
    )
}

export default NavBar;
