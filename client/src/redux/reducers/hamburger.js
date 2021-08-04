import { TOGGLE_HAMBURGER } from "../actions/type";

const initialState = {isOpen: false};

export default function hamburgerReducer (state = initialState, action) {
    const {type} = action;
    switch (type) {
    //     case OPEN_HAMBURGER:
    //         return {isOpen: true};
    //     case CLOSE_HAMBURGER:
    //         return {isOpen: false};
        case TOGGLE_HAMBURGER:
            return {isOpen: !state.isOpen};
        default:
            return state;
    }
    // const {type} = action;
    // if (type === TOGGLE_HAMBURGER) {
    //     return {
    //         ...state,
    //         isOpen: !state.isOpen
    //     };
    // }
    // return initialState;
    // }
}