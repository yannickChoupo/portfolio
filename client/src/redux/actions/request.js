import {CLEAR_IS_LOADING, SET_IS_LOADING} from "./type";

export const setIsLoading = () => ({
    type: SET_IS_LOADING
});

// create a clear message action to reinitialize the message state
export const clearIsLoading = () => ({
    type: CLEAR_IS_LOADING
})