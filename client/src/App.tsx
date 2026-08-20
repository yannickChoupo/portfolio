import { useEffect } from 'react'
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from "react-router-dom";
import './App.css'
import { initTheme, watchSystemTheme } from './utils/theme'
import SharedLayout from './Components/SharedLayout';
import { About, Admin, Contact, Dataviz, Home, LogInOut, Project } from './pages';
import Works from './pages/Work';
import SharedProjectLayout from './Components/ShareProjectLayout';
import SharedDatavizLayout from './Components/SharedDatavizLayout';
import Error from './pages/ErrorPage';

function App() {

	useEffect(() => {
		initTheme();
		watchSystemTheme();
	}, []);
	
	return (
		<Router>
			<Routes>
				<Route path="/" element={<SharedLayout />}>
					<Route index element={<Home />} />
					<Route path="/portfolio" element={<Home />} />
					<Route path="/works">
						<Route index element={<Works />} />
						<Route element={<SharedProjectLayout />} >
							<Route path=":projectName" element={<Project />} />
						</Route>
					</Route>
					<Route path="/dataviz" element={<SharedDatavizLayout />}>
						<Route index element={<Dataviz />} />
						<Route path=":projectName" element={<Dataviz />} />
					</Route>
					<Route path="/contact" element={<Contact />} />
					<Route path="/about" element={<About />} />
					<Route
						path="/admin"
						element={<Admin />}
					/>
					<Route path="/login" element={<LogInOut />} />
					<Route path="*" element={<Error />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default App

// import React, {useEffect} from 'react';
// import {
// 	BrowserRouter as Router,
// 	Route,
// 	Routes,
// } from "react-router-dom";
// import './sass/main.scss';

// import {
// 	Home,
// 	About,
// 	Work as Works,
// 	ErrorPage as Error,
// 	Contact,
// 	Admin,
// 	LogInOut,
// 	Project,
// 	Dataviz
// } from './pages';
// import SharedLayout from "./Components/SharedLayout";
// import SharedProjectLayout from "./Components/ShareProjectLayout";
// import SharedDatavizLayout from "./Components/SharedDatavizLayout";
// import { initTheme, watchSystemTheme } from './utils/theme';


// const App: React.FC = () => {

// 	useEffect(() => {
// 		initTheme();
// 		watchSystemTheme();
// 	}, []);

// 	return (
// 		<Router>
// 			<Routes>
// 				<Route path="/" element={<SharedLayout />}>
// 					<Route index element={<Home />} />
// 					<Route path="/portfolio" element={<Home />} />
// 					<Route path="/works">
// 						<Route index element={<Works />} />
// 						<Route element={<SharedProjectLayout />} >
// 							<Route path=":projectName" element={<Project />} />
// 						</Route>
// 					</Route>
// 					<Route path="/dataviz" element={<SharedDatavizLayout />}>
// 						<Route index element={<Dataviz />} />
// 						<Route path=":projectName" element={<Dataviz />} />
// 					</Route>
// 					<Route path="/contact" element={<Contact />} />
// 					<Route path="/about" element={<About />} />
// 					<Route
// 						path="/admin"
// 						element={<Admin />}
// 					/>
// 					<Route path="/login" element={<LogInOut />} />
// 					<Route path="*" element={<Error />} />
// 				</Route>
// 			</Routes>
// 		</Router>
// 	);
// };

// export default App;

