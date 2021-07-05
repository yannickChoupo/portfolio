import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import App from "./App";

import {Provider} from "react-redux";
import store from "./store";
import history from "./helpers/history"
import {getFromStorage} from "./utils/storage";
import Sign from "./Components/Sign";


// if (!getFromStorage("main_storage")) {
//     history.push("/sign");
//     console.log("local storage empty")
// }

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter history={history}>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
