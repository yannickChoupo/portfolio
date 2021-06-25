import React, {useEffect} from "react";
import {BrowserView, MobileView} from 'react-device-detect';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
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
import {authenticate} from "./redux/actions/auth";

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

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("first Render");
        if (!getFromStorage("main_storage")) {
            history.push("/sign");
            // window.location.reload();
            console.log("local storage empty")
        } else {
            const {userName} = getFromStorage("main_storage").user;
            dispatch(authenticate(userName))
                .then((response) => {
                    console.log("authentication response : ", response.data);
                })
        }
    }, [dispatch]);
    // useEffect(() => {
    //     if (!getFromStorage("main_storage")) {
    //         history.push("/sign");
    //         window.location.reload();
    //         console.log("local storage empty")
    //     }
    // },[])
    return (
        <>
            <BrowserView>
                <>
                    <div className="grid">
                        <Router>
                            <NavBar/>
                            <Switch>
                                <Route exact path="/">
                                    <Home/>
                                </Route>
                                <Route exact path="/sign">
                                    <Sign/>
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
                        </Router>
                    </div>
                </>
            </BrowserView>
            <MobileView>
                <div className="grid">
                    <Router>
                        <Route exact path="/">
                            <NavBar/>
                            <Home/>
                            <About/>
                            <Works/>
                            <Contact/>
                        </Route>
                        <Route path="/sign">
                            <NavBar />
                            <Sign />
                        </Route>
                    </Router>
                </div>
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