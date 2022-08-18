import React from "react";
import { Link, NavLink } from "react-router-dom";
// import { BrowserView, MobileView } from 'react-device-detect';
import { useSelector, useDispatch } from "react-redux";
// import history from "../helpers/history";
import { Logo } from "./logo";
import Hamburger from "./hamburger";
import { toggleHamburger } from '../features/hamburger/hamburgerSlice';


export const NavBar = (props) => {
    const { isOpen } = useSelector(state => state.hamburger);
    const dispatch = useDispatch();

    const handleLogoClick = () => {
        if (isOpen) {
            dispatch(toggleHamburger());
        }
    }
    return (
        <>
            <nav className="nav">
                <ul>
                    <li className="nav-logo">
                        <NavLink 
						    // activclassname="active"
                            to='/'
                            onClick={handleLogoClick}
						>
                            <Logo />
                        </NavLink>
                    </li>
                    <li className="nav-ham">
                        <Hamburger />
                    </li>
                    {/* {
                        isLoggedIn && !demoIsLaunch &&
                        <li className="signOut">
                            <div onClick={LogOut}> LOGOUT</div>
                        </li>
                    } */}
                </ul>
                {/* <SideBar /> */}
            </nav>
        </>
    )
}

export default NavBar;
