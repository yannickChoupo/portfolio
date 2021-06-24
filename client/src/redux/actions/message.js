import {SET_MESSAGE, CLEAR_MESSAGE } from "./type"

// MESSAGE ACTION CREATOR

// create a set message action with the the new message as argument
export const setMessage = (message) => ({
    type: SET_MESSAGE,
    payload: message
});

// create a clear message action to reinitialize the message state
export const clearMessage = () => ({
    type: CLEAR_MESSAGE
})