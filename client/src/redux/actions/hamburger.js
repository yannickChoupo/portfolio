import { TOGGLE_HAMBURGER, OPEN_HAMBURGER, CLOSE_HAMBURGER } from "./type"
export const toggleHamburger = () => (dispatch) => {
    // console.log("toggleHamburger");
    dispatch({
        type: TOGGLE_HAMBURGER
    })
}
export const openHamburger = (curState) => (dispatch) => {
    dispatch({
        type: OPEN_HAMBURGER
    })
}
export const closeHamburger = (curState) => (dispatch) => {
    dispatch({
        type: CLOSE_HAMBURGER
    })
}
