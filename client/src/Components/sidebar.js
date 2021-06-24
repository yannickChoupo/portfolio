import React, {useState} from 'react';
import {BrowserView, MobileView} from 'react-device-detect';

import {NavLink} from 'react-router-dom'

// From Redux
import {useSelector, useDispatch} from "react-redux";
import {toggleHamburger} from "../redux/actions/hamburger"
import {Switch} from "./Switch/switch";

// Form React Scroll
import {Link} from 'react-scroll'

// From React CSS Transition
import CSSTransition from "react-transition-group/cjs/CSSTransition";


const TOP_BOTTOM = "showDown";
const TOP_TOP = "showUp";
const SideBar = () => {
    // Get the actual Hamburger state from Redux Store
    const {isOpen} = useSelector(state => state.hamburger);
    const dispatch = useDispatch();


    const [curVanishingMode, setCurVanishingMode] = useState("showUp")

    const handleSwitchClick = () => {
        dispatch(toggleHamburger());
    }

    const handleClick = (e) => {
        console.log("button clicked");
        console.log("Event : ", e)
        console.log("new target : ", e.target.title)
        if (e.target.title) {
            console.log("evaluate Pos******************************************************")
            let curWindowPos = window.scrollY;
            let targetTitle = e.target.title;
            let targetOffset = document.getElementById(targetTitle).offsetTop;
            console.log("curPosition : ", curWindowPos);
            console.log("target offset : ", targetOffset);
            if (targetOffset > curWindowPos) {
                setCurVanishingMode(TOP_TOP);
                console.log("new vanishing mode : ", curVanishingMode);
            } else {
                setCurVanishingMode(TOP_BOTTOM);
                console.log("new vanishing mode : ", curVanishingMode);
            }
        }
        dispatch(toggleHamburger());
    }
    return (
        <>
            <BrowserView>
                <CSSTransition
                    in={isOpen}
                    classNames="show"
                    timeout={500}
                    unmountOnExit>
                    <div className="sideBar">
                        <ul>
                            <li>
                                <NavLink
                                    title="home"
                                    className="side__link"
                                    activclassname="active"
                                    exact to='/'
                                    onClick={handleSwitchClick}>
                                    <i className="fa fa-home"/>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    title="about"
                                    className="side__link"
                                    activclassname="active"
                                    to='/about'
                                    onClick={handleSwitchClick}>
                                    <i className="fa fa-id-card "/>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    title="work"
                                    className="side__link"
                                    activclassname="active"
                                    to='/work'
                                    onClick={handleSwitchClick}>
                                    <i className="fa fa-briefcase "/>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    title="contact"
                                    className="side__link"
                                    activclassname="active"
                                    to='/contact'
                                    onClick={handleSwitchClick}>
                                    <i  className="fa fa-address-card"/>
                                </NavLink>
                            </li>
                            <li>
                                <Switch handleSwitchClick={handleSwitchClick}/>
                            </li>
                        </ul>
                    </div>
                </CSSTransition>
            </BrowserView>
            <MobileView>
                <CSSTransition
                    in={isOpen}
                    classNames={curVanishingMode}
                    timeout={500}
                    unmountOnExit>
                    <div className={`sideBar`}>
                        <ul>
                            <li>
                                <Link
                                    className="side__link "
                                    activclass="active"
                                    to="home"
                                    spy={true}
                                    smooth={true}
                                    duration={300}>
                                    <i title="home" className="fa fa-home" onClick={(e) => handleClick(e)}/>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="side__link "
                                    activclass="active"
                                    to="about"
                                    spy={true}
                                    smooth={true}
                                    duration={300}>
                                    <i title="about" className="fa fa-id-card " onClick={(e) => handleClick(e)}/>
                                </Link>
                            </li>

                            <li>
                                <Link

                                    className="side__link "
                                    activclass="active"
                                    to="work"
                                    spy={true}
                                    smooth={true}
                                    duration={300}>
                                    <i title="work" className="fa fa-briefcase " onClick={(e) => handleClick(e)}/>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="side__link "
                                    activclass="active"
                                    to="contact"
                                    spy={true}
                                    smooth={true}
                                    duration={300}>
                                    <i title="contact" className="fa fa-address-card"
                                       onClick={(e) => handleClick(e)}/>
                                </Link>
                            </li>
                            <li>
                                <Switch handleSwitchClick={handleSwitchClick}/>
                            </li>
                        </ul>
                    </div>
                </CSSTransition>
            </MobileView>
        </>
)
}
export default SideBar;