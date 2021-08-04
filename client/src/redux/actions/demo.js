import { TOGGLE_DEMO } from "./type"
export const launchDemo = () => (dispatch) => {
    dispatch({
        type: TOGGLE_DEMO
    })
}
export const stopDemo = () => (dispatch) => {
    dispatch({
        type: TOGGLE_DEMO
    })
}
