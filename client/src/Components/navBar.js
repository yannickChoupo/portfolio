import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Logo } from "./logo";
import Hamburger from "./hamburger";
import { toggleHamburger } from '../features/hamburger/hamburgerSlice';
import SideBar from "./sidebar";


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
			<nav className="navbar">
				<div className="container nav-body">
					<NavLink className="navbar-link" aria-current="page" to='/'>
						{/* <Logo /> */}
						Home
					</NavLink>
					<Hamburger />
					<SideBar />
				</div>
			</nav>
        </>
    )
}

export default NavBar;
