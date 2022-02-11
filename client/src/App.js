import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import history from "./helpers/history";
import $ from 'jquery';
import jwt from 'jsonwebtoken';
import axios from "axios";


import './sass/main.scss';
import NavBar from "./Components/navBar";


import Home from './pages/Home'
import About from './pages/About'
import Works from './pages/Work'
import Error from './pages/ErrorPage'
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

import Sign from "./Components/Sign";
import SideBar from "./Components/sidebar";


import { getFromStorage, setInStorage, removeInStorage } from "./utils/storage";
import {
    CSSTransition,
    TransitionGroup
} from "react-transition-group";

import { useSelector } from "react-redux";
// const routes = [
//     { path: '/', Component: Home },
//     { path: '/about', Component: About },
//     { path: '/work', Component: Works },
//     { path: '/contact', Component: Contact },
//     { path: '/sign', Component: Sign },
//     { path: '/error', Component: Error },
//     { path: '*', Component: Error },
// ]
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
const SERVER_Request = axios.create(
    {
        baseURL: `${process.env.NODE_ENV === "production" ?
            'https://yannick-njilo-portfolio.herokuapp.com'
            :
            'http://localhost:5000'}`
    }
);
function App() {
    const location = useLocation();
    const { isOpen } = useSelector(state => state.hamburger);

    const disableScroll = () => {
        $("body").css("overflow", "hidden");
        $('.page').css('opacity', '0.1');

    }
    const enableScroll = () => {
        $("body").css("overflow", "auto");
        $('.page').css('opacity', '1');
    }
    useEffect(() => {
        const mainStorage = getFromStorage("session");
        // add the session
        if (!mainStorage) {
            SERVER_Request.get('/api/session').then((response) => {
                if (response.data.session) {
                    setInStorage("session", response.data.session);
                }
            }).then((response) => {
                console.log("Add sessio response: \n", response);
            })
        } else {
            // delete the session 
            const exp = jwt.decode(mainStorage);
            if (Date.now() >= (exp.exp * 1000)) {
                removeInStorage("session");
                SERVER_Request.post(`/api/session/${exp.id}`)
                    .then((response) => {
                        console.log(response.message);
                    })
            }
        }
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

                        <Route path="/admin">
                            <Admin />
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
