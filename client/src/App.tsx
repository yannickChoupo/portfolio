import { useEffect } from 'react'
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from "react-router-dom";
import './App.css'
import { initTheme, watchSystemTheme } from './utils/theme'
import SharedLayout from './Components/SharedLayout/SharedLayout';
import Works from './pages/Work';
import SharedDatavizLayout from './Components/SharedDatavizLayout';
import Error from './pages/ErrorPage';
import SharedProjectLayout from './Components/ShareProjectLayout/ShareProjectLayout';
import Home from './pages/Home';
import Dataviz from './pages/Dataviz';
import Contact from './pages/Contact';
import About from './pages/About';
import Admin from './pages/Admin/Admin';
import LogInOut from './pages/LogInOut';
import Project from './pages/Project';

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
