import React from "react";
import {BrowserView, MobileView} from 'react-device-detect';
import 'bootstrap/dist/css/bootstrap.min.css';
import {


    Route, Switch, useLocation} from "react-router-dom";
import history from "./helpers/history";


import './sass/main.scss';
import NavBar from "./Components/navBar/navBar";


import Home from './pages/Home'
import About from './pages/About'
import Works from './pages/Work'
import Error from './pages/ErrorPage'
import Sign from "./Components/Sign";
import Contact from "./pages/Contact";


import {getFromStorage} from "./utils/storage";
import {
    CSSTransition,
    TransitionGroup
} from "react-transition-group";
import {useSelector} from "react-redux";
// import {useDispatch} from "react-redux";
// import SideBar from "./Components/sidebar";
// import {authenticate} from "./redux/actions/auth";

// Pages
const routes = [
    {path: '/', Component: Home},
    {path: '/about', Component: About},
    {path: '/work', Component: Works},
    {path: '/contact', Component: Contact},
    {path: '/sign', Component: Sign},
    {path: '/error', Component: Error},
    {path: '*', Component: Error},
]
if (!getFromStorage("main_storage")) {
    history.push("/sign");
    console.log("local storage empty")
}

function App() {
    const {demoIsLaunch} = useSelector(state => state.demo);
    const location = useLocation();
    return (
        <>
            <BrowserView>
                <NavBar/>
                <TransitionGroup>
                    <CSSTransition
                        timeout={1000}
                        classNames="pages"
                        key={history.location.key}>
                        <Switch location={history.location}>
                            <Route exact path="/sign">
                                <Sign history={history}/>
                            </Route>
                            <Route exact path="/">
                                <Home/>
                            </Route>

                            <Route path="/about">
                                <About/>
                            </Route>

                            <Route path="/contact">
                                <Contact/>
                            </Route>
                            <Route path="/work">
                                <Works/>
                            </Route>
                            <Route path="*">
                                <Error/>
                            </Route>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </BrowserView>
            <MobileView>
                <Switch>
                    <Route exact path="/">
                        <NavBar/>
                        <Home/>
                        <About/>
                        <Works/>
                        <Contact/>
                    </Route>
                    <Route exact path="/sign">
                        <NavBar/>
                        <Sign/>
                    </Route>
                </Switch>
            </MobileView>
        </>
    );
}

export default App;
