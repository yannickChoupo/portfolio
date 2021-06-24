import {SET_MESSAGE, CLEAR_MESSAGE} from "../actions/type";

const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action;

    // set the message state to the payload if the action is SET_MESSAGE
    // otherwise clear the message state
    switch (type) {
        case SET_MESSAGE:
            return { message: payload };
        case CLEAR_MESSAGE:
            return { message: "" };
        default:
            return state;
    }
}