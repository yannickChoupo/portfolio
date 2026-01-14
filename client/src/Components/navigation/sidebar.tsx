import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { toggleHamburger } from '../../features/hamburger/hamburgerSlice';
// import CSSTransition from "react-transition-group/cjs/CSSTransition";
import Switch from '../switch';
import { CSSTransition } from 'react-transition-group';
import {  Add24Regular, Briefcase24Regular, BuildingHome24Regular, Person24Regular } from '@fluentui/react-icons';

const SideBar = () => {
    const { isOpen } = useSelector((state: any) => state.hamburger);
    const dispatch = useDispatch();

    const handleThemeSwitchClick = () => {
        dispatch(toggleHamburger());
    }

    const handlelinkClick= () => {
        dispatch(toggleHamburger());
    }

    const sideBar = React.useRef(null);
    return (
        <>
            <CSSTransition
                in={isOpen}
                classNames="show"
                timeout={500}
                unmountOnExit
                nodeRef={sideBar}>
                <div className="sideBar" ref={sideBar}>
                    <ul>
                        <li>
                            <NavLink
                                title="home"
                                className="side__link"
                                to='/'
                                onClick={handlelinkClick}>
                                <BuildingHome24Regular />
                                <i className="fa fa-home" />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                title="about"
                                className="side__link"
                                to='/about'
                                onClick={handlelinkClick}>
                                <i className="fa fa-id-card " />
                                <Person24Regular />
                            </NavLink>
                        </li>
                        <li >
                            <NavLink
                                title="work"
                                className="side__link"
                                to='/works'
                                onClick={handlelinkClick}>
                                <i className="fa fa-briefcase " />
                                <Briefcase24Regular />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                title="contact"
                                className="side__link"
                                to='/contact'
                                onClick={handlelinkClick}>
                                <i className="fa fa-address-card" />
                                <Add24Regular />
                            </NavLink>
                        </li>
                        <li>
                            <Switch handleSwitchClick={handleThemeSwitchClick} />
                        </li>
                    </ul>
                </div>
            </CSSTransition>
        </>
    )
}
export default SideBar;