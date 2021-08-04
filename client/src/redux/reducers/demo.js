import {TOGGLE_DEMO} from "../actions/type";

// import {useSelector} from "react-redux";

const initialState = {demoIsLaunch: false};

export default function demoReducer (state = initialState, action) {
    const {type} = action;
    switch (type) {
        //     case OPEN_HAMBURGER:
        //         return {isOpen: true};
        //     case CLOSE_HAMBURGER:
        //         return {isOpen: false};
        case TOGGLE_DEMO:
            return {demoIsLaunch: !state.demoIsLaunch};
        default:
            return state;
    }
}