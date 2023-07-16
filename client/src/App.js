import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
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
import SharedProjectLayout from "./Components/ShareProjectLayout";
import Dataviz from "./pages/Dataviz";
import SharedDatavizLayout from "./Components/SharedDatavizLayout";

function App() {
	const [user, setUser] = useState(null);

	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<SharedLayout />}>
					<Route index element={<Home />} />
					<Route path="/works" element={<SharedProjectLayout />}>
						<Route index element={<Works />} />
						<Route path=":projectName" element={<Project />} />
					</Route>
					<Route path="/dataviz" element={<SharedDatavizLayout />}>
						<Route index element={<Dataviz />} />
						<Route path=":projectName" element={<Dataviz />} />
					</Route>
					<Route path="/contact" element={<Contact />} />
					<Route path="/about" element={<About />} />
					<Route
						path="/admin"
						element={
							<Admin user={user} />
						}
					/>
					<Route path="/login" element={<LogInOut setUser={setUser} />} />
					<Route path="*" element={<Error />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
