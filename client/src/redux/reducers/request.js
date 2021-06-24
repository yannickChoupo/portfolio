import { SET_LOADING, CLEAR_LOADING } from "../actions/type";

const initialState = {
    isLoading: false
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_LOADING:
            return { isLoading: true };
        case CLEAR_LOADING:
            return { isLoading: false};
        default:
            return state;
    }
}