import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes
  } from "react-router-dom";
import './sass/main.scss';

import Home from './pages/Home'
import About from './pages/About';
import Works from './pages/Work';
import Error from './pages/ErrorPage'
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

import LogInOut from "./pages/LogInOut";
import Project from "./pages/Project";
import SharedLayout from "./Components/SharedLayout";
import ProtectetdRoute from "./Components/ProtectedRoute";
import SharedProjectLayout from "./Components/ShareProjectLayout";
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

////////////////////  AXIOS   //////////////////////////////////////////// 
// const SERVER_Request = axios.create(
//     {
//         baseURL: `${process.env.NODE_ENV === "production" ?
//             'https://yannick-njilo-portfolio.herokuapp.com'
//             :
//             'http://localhost:5000'}`
//     }
// );
function App() {
    // const location = useLocation();
    // const { isOpen } = useSelector(state => state.hamburger);
	const [user, setUser] = useState(null);

    useEffect(() => {
        // const mainStorage = getFromStorage("session");
        // add the session
        // if (!mainStorage) {
			//     SERVER_Request.get('/api/session').then((response) => {
				//         if (response.data.session) {
        //             setInStorage("session", response.data.session);
        //         }
        //     }).then((response) => {
        //         console.log("Add sessio response: \n", response);
        //     })
        // } else {
			//     // delete the session 
			//     const exp = jwt.decode(mainStorage);
			//     if (Date.now() >= (exp.exp * 1000)) {
				//         removeInStorage("session");
        //         SERVER_Request.post(`/api/session/${exp.id}`)
        //             .then((response) => {
        //                 console.log(response.message);
        //             })
        //     }
        // }
    }, [])
	
	// const disableScroll = () => {
	// 	$("body").css("overflow", "hidden");
	// 	$('.page').css('opacity', '0.1');

	// }
	// const enableScroll = () => {
	// 	$("body").css("overflow", "auto");
	// 	$('.page').css('opacity', '1');
	// }

    // if (isOpen) {
		//     disableScroll();
		// } else {
			//     enableScroll();
			// }
    return (
        <div id="app">
			<Router>
				<Routes>
					<Route path="/" element={ <SharedLayout/> }>
						<Route index element={ <Home />} />
						<Route path="works" element={ <SharedProjectLayout />}> 
							<Route index element={<Works />} />
							<Route path=":projectName" element={ <Project />} />
						</Route>
						<Route path="/contact" element={ <Contact />} />
						<Route path="/about" element={ <About /> } />
						<Route 
							path="/admin"
							element = {
								<ProtectetdRoute user={user} >
									<Admin user={user} />
							 	</ProtectetdRoute>
							} 
						/>
						<Route path="/login" element={ <LogInOut setUser={setUser} /> } />
						<Route path="*" element={ <Error /> } />
					</Route>
				</Routes>
			</Router>
            {/* <TransitionGroup>
                <CSSTransition
                    timeout={1000}
                    classNames="pages"
                    key={history.location.key}> */}
                    {/* <Switch location={history.location}>
                    </Switch> */}
                {/* </CSSTransition>
            </TransitionGroup> */}
        </div>
    );
}

export default App;
