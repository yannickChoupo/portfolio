import {LAUNCH_DEMO, STOP_DEMO} from "../actions/type";

import {useSelector} from "react-redux";

const initialState = {demoIsLaunch: false};

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case LAUNCH_DEMO:
            return {demoIsLaunch: true};
        case STOP_DEMO:
            return {demoIsLaunch: false};
        default:
            return state;
    }
}