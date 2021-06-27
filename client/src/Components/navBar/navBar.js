import {NavLink} from "react-router-dom";
import {BrowserView, MobileView} from 'react-device-detect';
import {useSelector, useDispatch} from "react-redux";
import history from '../../helpers/history'
import {Logo} from "../Logo/logo";
import Hamburger from "../hamburger/hamburger";
import SideBar from "../sidebar";
import React, {useState} from "react";
import {Link} from "react-scroll";
import {visitorSignOut} from "../../redux/actions/auth";
import {getFromStorage} from "../../utils/storage";

export const NavBar = () => {
    // const [scrolling, setScrolling] = useState(false);
    const {isLoggedIn} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const LogOut = () => {
        let { visitor } = getFromStorage('main_storage');
        console.log("signOut request : ", visitor._id)
        console.log("localstorage : ", getFromStorage('main_storage'));
        dispatch(visitorSignOut(visitor._id,history));
        //     .then((response) => {
        //         if(response.data.success){
        //             history.push('/sign');
        //             window.location.reload();
        //         }
        //     })
        console.log("sign completed!!!!!!!!!!!!!!!!!!!!!");
        console.log("Storage atatus : ",getFromStorage('main_storage'));
        history.push('/sign');
        // window.location.reload();
        // console.log("sign out");
    }
    // const deleteVisitor = () => {
    //     let {user} = getFromStorage('main_storage');
    //     console.log("signOut request : ", user._id)
    //     console.log("localstorage : ", getFromStorage('main_storage'));
    //     dispatch(deleteUser(user._id))
    //     // console.log("sign out");
    // }


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
                        <Hamburger/>
                    </li>
                    {isLoggedIn &&
                    <li className="signOut">
                        <div onClick={LogOut}> LOGOUT</div>
                    </li>}
                    {/*{isLoggedIn &&*/}
                    {/*<li className="delete">*/}
                    {/*    <div onClick={deleteVisitor} className="bg-danger">Delete</div>*/}
                    {/*</li>}*/}
                </ul>
                <SideBar/>
            </nav>
        </>
    )
}

export default NavBar;
