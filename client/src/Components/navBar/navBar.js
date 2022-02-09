import { NavLink } from "react-router-dom";
// import { BrowserView, MobileView } from 'react-device-detect';
import { toggleHamburger } from "../../redux/actions/hamburger";
import { useSelector, useDispatch } from "react-redux";
import history from '../../helpers/history'
import { Logo } from "../Logo/logo";
import Hamburger from "../hamburger/hamburger";
// import SideBar from "../sidebar";
import React from "react";
// import { Link } from "react-scroll";
// import { visitorSignOut } from "../../redux/actions/auth";
// import $ from 'jquery';
// import { process_params } from "express/lib/router";
// import {getFromStorage} from "../../utils/storage";

export const NavBar = (props) => {
    // const { isLoggedIn } = useSelector(state => state.auth);
    // const { demoIsLaunch } = useSelector(state => state.demo);
    const { isOpen } = useSelector(state => state.hamburger);
    const dispatch = useDispatch();
    // const LogOut = () => {
    //     dispatch(visitorSignOut())
    //         .then((response) => {
    //             if (response.data.success) {
    //                 history.push('/sign');
    //                 window.location.reload(true);
    //             } else {
    //                 localStorage.clear();
    //             }
    //         })
    // }

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
                        <NavLink activclassname="active"
                            to='/'
                            onClick={handleLogoClick}>
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
