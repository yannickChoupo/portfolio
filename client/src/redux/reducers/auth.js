import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from "../actions/type";

import {getFromStorage} from "../../utils/storage";
//
// const mainStorage = getFromStorage("main-storage");

let user = getFromStorage('user');
const initialState = user ? { isLoggedIn: true, user: null } : {};
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action
            }
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            }
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            }
        default:
            return state;
    }
}