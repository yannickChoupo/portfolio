import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Hamburger from "../hamburger";
import { toggleHamburger } from '../../features/hamburger/hamburgerSlice';
import SideBar from "./sidebar";


export const NavBar = () => {
    const { isOpen } = useSelector((state: any) => state.hamburger);
    const dispatch = useDispatch();

    const handleLogoClick = () => {
        if (isOpen) {
            dispatch(toggleHamburger());
        }
    }
    return (
        <>
            <div className="navbar">
                <div className="container nav-body">
                    <NavLink
                        onClick={handleLogoClick}
                        className="navbar-link logo" aria-current="page" to='/'>
                        &#9962;
                    </NavLink>
                    <div className="hamburger-container">
                    <Hamburger />
                    </div>
                    <SideBar />
                </div>
            </div>
        </>
    )
}

export default NavBar;
