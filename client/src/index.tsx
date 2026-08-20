import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { Provider } from "react-redux";
// import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import { Provider } from "react-redux";
import "./sass/main.scss";
import { store } from "./store";

// const container = document.getElementById('root');
// if (!container) throw new Error('Failed to find the root element');

createRoot(
	document.getElementById("root") as HTMLElement
).render(
	<StrictMode>
		<Provider store={store}>
			{/* <BrowserRouter> */}
				<App />
			{/* </BrowserRouter> */}
		</Provider>
		{/* <Provider store={store}> */}
		{/* </Provider> */}
	</StrictMode>
);
