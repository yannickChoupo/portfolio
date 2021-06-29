import React, {useEffect} from "react";
import {BrowserView, MobileView} from 'react-device-detect';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
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
import {useDispatch} from "react-redux";
import SideBar from "./Components/sidebar";
// import {authenticate} from "./redux/actions/auth";

// Pages
// const routes = [
//     {path: '/', Component: Home},
//     {path: '/about', Component: About},
//     {path: '/work', Component: Works},
//     {path: '/contact', Component: Error},
//     {path: '/sign', Component: Sign},
//     {path: '/error', Component: Error},
//     {path: '*', Component: Error},
// ]
if (!getFromStorage("main_storage")) {
    history.push("/sign");
    // window.location.reload(true);
    console.log("local storage empty")
}
// else {
//     history.push('/');
// }

function App() {
    return (
        <>
            <BrowserView>
                {/*<>*/}
                <Router>
                    <div className="grid">
                        <NavBar/>
                        <Switch>
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
                    </div>
                </Router>
                {/*</>*/}
            </BrowserView>
            <MobileView>
                <Router>
                    <div className="grid">
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
                    </div>
                </Router>
            </MobileView>
        </>
    );
}

export default App;
//             {/*{routes.map(({path, Component}) => (*/}
//             {/*    <Route key={path} exact path={path}>*/}
//             {/*        {({match}) => (*/}
//             {/*            <CSSTransition*/}
//             {/*                in={match != null}*/}
//             {/*                timeout={300}*/}
//             {/*                classNames="page"*/}
//             {/*                unmountOnExit>*/}
//             {/*                <div className="page">*/}
//             {/*                    <Component />*/}
//             {/*                </div>*/}
//             {/*            </CSSTransition>*/}
//             {/*        )}*/}
//             {/*    </Route>*/}
//             {/*))}*/}