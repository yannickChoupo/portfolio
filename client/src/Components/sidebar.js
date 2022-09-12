import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux";
import { Switch } from "./switch"
import { toggleHamburger } from '../features/hamburger/hamburgerSlice';
import CSSTransition from "react-transition-group/cjs/CSSTransition";

const SideBar = () => {
    const { isOpen } = useSelector(state => state.hamburger);
    const dispatch = useDispatch();

    const handleSwitchClick = () => {
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
                            <Link
                                title="home"
                                className="side__link"
                                to='/'
                                onClick={handleSwitchClick}>
                                <i className="fa fa-home" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                title="about"
                                className="side__link"
                                to='/about'
                                onClick={handleSwitchClick}>
                                <i className="fa fa-id-card " />
                            </Link>
                        </li>
                        <li >
                            <Link
                                title="work"
                                className="side__link"
                                to='/works'
                                onClick={handleSwitchClick}>
                                <i className="fa fa-briefcase " />
                            </Link>
                        </li>
                        <li>
                            <Link
                                title="contact"
                                className="side__link"
                                to='/contact'
                                onClick={handleSwitchClick}>
                                <i className="fa fa-address-card" />
                            </Link>
                        </li>
                        <li>
                            <Switch handleSwitchClick={handleSwitchClick} />
                        </li>
                    </ul>
                </div>
            </CSSTransition>
        </>
    )
}
export default SideBar;