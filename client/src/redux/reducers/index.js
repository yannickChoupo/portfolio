import { combineReducers } from "redux";

import auth from "./auth";
import message from "./message";
import hamburger from "./hamburger";
import request from "./request";
import demo from "./demo";


export default combineReducers({
    auth,
    message,
    hamburger,
    request,
    demo
})