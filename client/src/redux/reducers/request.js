import { SET_IS_LOADING, CLEAR_IS_LOADING } from "../actions/type";

const initialState = {
    isLoading: false
}

export default function requestReducer (state = initialState, action) {
    const { type } = action;
    switch (type) {
        case SET_IS_LOADING:
            return { isLoading: true };
        case CLEAR_IS_LOADING:
            return { isLoading: false};
        default:
            return state;
    }
}