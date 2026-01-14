import React from 'react';
import { createRoot } from 'react-dom/client';
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

const root = createRoot(container);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<FluentProvider theme={webLightTheme}>
				<App />
			</FluentProvider>
		</Provider>
	</React.StrictMode>
);
