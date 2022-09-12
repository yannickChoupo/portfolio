import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
                        <Link 
                            to='/'
                            onClick={handleLogoClick}
						>
                            <Logo />
                        </Link>
                    </li>
                    <li className="nav-ham">
                        <Hamburger />
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default NavBar;
