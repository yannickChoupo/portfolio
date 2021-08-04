import {NavLink} from "react-router-dom";
import {BrowserView, MobileView} from 'react-device-detect';
import {useSelector, useDispatch} from "react-redux";
import history from '../../helpers/history'
import {Logo} from "../Logo/logo";
import Hamburger from "../hamburger/hamburger";
import SideBar from "../sidebar";
import React from "react";
import {Link} from "react-scroll";
import {visitorSignOut} from "../../redux/actions/auth";
// import {getFromStorage} from "../../utils/storage";

export const NavBar = () => {
    const {isLoggedIn} = useSelector(state => state.auth);
    const {demoIsLaunch} = useSelector(state => state.demo);
    const dispatch = useDispatch();
    const LogOut = () => {
        dispatch(visitorSignOut())
            .then((response) => {
                if (response.data.success) {
                    history.push('/sign');
                    window.location.reload(true);
                } else {
                    localStorage.clear();
                }
            })
    }

    return (
        <>
            <nav className="nav">
                <ul>
                    <li className="nav-logo">
                        <BrowserView>
                            <NavLink activclassname="active"
                                     to='/'>
                                <Logo/>
                            </NavLink>
                        </BrowserView>
                        <MobileView>
                            <Link
                                activclass="active"
                                to="home"
                                spy={true}
                                smooth={true}
                                duration={300}>
                                <Logo/>
                            </Link>
                        </MobileView>

                    </li>
                    <li className="nav-ham">
                        <Hamburger />
                    </li>
                    {
                        isLoggedIn && !demoIsLaunch &&
                        <li className="signOut">
                            <div onClick={LogOut}> LOGOUT</div>
                        </li>
                    }
                </ul>
                <SideBar/>
            </nav>
        </>
    )
}

export default NavBar;
