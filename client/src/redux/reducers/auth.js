import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT, AUTHENTICATE,
} from "../actions/type";

import {getFromStorage, setInStorage} from "../../utils/storage";

const mainStorage = getFromStorage("main_storage");

console.log("main storage : ", mainStorage);
const initialState = mainStorage ?
    { isLoggedIn: true, visitor: mainStorage.visitor }
    : { isLoggedIn: false };
export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
                visitor: null
            };
        case AUTHENTICATE:
            setInStorage('main_storage', { visitor: payload});
            return {
                ...state,
                isLoggedIn: true,
                visitor: payload
            };
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                visitor: null
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                visitor: payload
            }
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                visitor: null
            }
        case LOGOUT:
            localStorage.clear();
            return {
                ...state,
                isLoggedIn: false,
                visitor: null
            }
        default:
            return state;
    }
}