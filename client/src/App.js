import React, { useEffect } from "react";
import { BrowserView, MobileView } from 'react-device-detect';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, useLocation } from "react-router-dom";
import history from "./helpers/history";
import jwt from 'jsonwebtoken';
import $ from 'jquery';




import './sass/main.scss';
import NavBar from "./Components/navBar/navBar";


import Home from './pages/Home'
import About from './pages/About'
import Works from './pages/Work'
import Error from './pages/ErrorPage'
import Sign from "./Components/Sign";
import Contact from "./pages/Contact";
import SideBar from "./Components/sidebar";


import { getFromStorage } from "./utils/storage";
import {
    CSSTransition,
    TransitionGroup
} from "react-transition-group";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleHamburger } from "./redux/actions/hamburger";

// import SideBar from "./Components/sidebar";
// import {authenticate} from "./redux/actions/auth";

// Pages
const routes = [
    { path: '/', Component: Home },
    { path: '/about', Component: About },
    { path: '/work', Component: Works },
    { path: '/contact', Component: Contact },
    { path: '/sign', Component: Sign },
    { path: '/error', Component: Error },
    { path: '*', Component: Error },
]
// if (!getFromStorage("main_storage")) {
//     history.push("/sign");
//     console.log("local storage empty");
// } else {
//     const token = getFromStorage("main_storage").token;
//     const exp = jwt.decode(token);
//     if (Date.now() >= (exp.exp * 1000)) {
//         localStorage.clear('main_storage');
//         history.push("/sign");
//         console.log("jwt expired ");
//     }
// }

function App() {
    const location = useLocation();
    const { isOpen } = useSelector(state => state.hamburger);

    const disableScroll = () => {
        $("body").css("overflow", "hidden");
        $('.page').css('opacity', '0.5');

    }
    const enableScroll = () => {
        $("body").css("overflow", "auto");
        $('.page').css('opacity', '1');
    }
    useEffect(() => {
        console.log('app initial render completed');
    }, [])

    if (isOpen) {
        disableScroll();
    } else {
        enableScroll();
    }
    return (
        <div id="app">
            <NavBar />
            <SideBar />

            <TransitionGroup>
                <CSSTransition
                    timeout={1000}
                    classNames="pages"
                    key={history.location.key}>
                    <Switch location={history.location}>
                        <Route exact path="/sign">
                            <Sign history={history} />
                        </Route>
                        <Route exact path="/">
                            <Home />
                        </Route>

                        <Route path="/about">
                            <About />
                        </Route>

                        <Route path="/contact">
                            <Contact />
                        </Route>
                        <Route path="/work">
                            <Works />
                        </Route>
                        <Route path="*">
                            <Error />
                        </Route>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
            {/* </BrowserView>
            <MobileView>
                <Switch>
                    <Route exact path="/">
                        <NavBar />
                        <Home />
                        <About />
                        <Works />
                        <Contact />
                    </Route>
                    <Route exact path="/sign">
                        <NavBar />
                        <Sign />
                    </Route>
                </Switch>
            </MobileView> */}
        </div>
    );
}

export default App;
