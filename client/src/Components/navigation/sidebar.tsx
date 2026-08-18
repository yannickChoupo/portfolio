import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { toggleHamburger } from '../../features/hamburgerSlice';
import Switch from '../switch';
import { CSSTransition } from 'react-transition-group';
import { Add24Regular, Briefcase24Regular, BuildingHome24Regular, Person24Regular } from '@fluentui/react-icons';

const SideBar = () => {
    const { isOpen } = useSelector((state: any) => state.hamburger);
    const dispatch = useDispatch();

    const handlelinkClick = () => {
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
                                title="Home"
                                className="side__link"
                                to='/'
                                onClick={handlelinkClick}>
                                <BuildingHome24Regular />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                title="About"
                                className="side__link"
                                to='/about'
                                onClick={handlelinkClick}>
                                <Person24Regular />
                            </NavLink>
                        </li>
                        <li >
                            <NavLink
                                title="Work"
                                className="side__link"
                                to='/works'
                                onClick={handlelinkClick}>
                                <Briefcase24Regular />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                title="Contact"
                                className="side__link"
                                to='/contact'
                                onClick={handlelinkClick}>
                                <Add24Regular />
                            </NavLink>
                        </li>
                        <li>
                            <Switch />
                        </li>
                    </ul>
                </div>
            </CSSTransition>
        </>
    )
}
export default SideBar;