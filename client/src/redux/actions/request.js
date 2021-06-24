import {CLEAR_LOADING, SET_LOADING} from "./type";

export const setIsLoading = () => ({
    type: SET_LOADING
});

// create a clear message action to reinitialize the message state
export const clearIsLoading = () => ({
    type: CLEAR_LOADING
})