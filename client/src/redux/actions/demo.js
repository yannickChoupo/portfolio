import { LAUNCH_DEMO,STOP_DEMO} from "./type"
export const launchDemo = () => (dispatch) => {
    console.log("displatch launchDemo")
    dispatch({
        type: LAUNCH_DEMO
    })
}
export const stopDemo = () => (dispatch) => {
    dispatch({
        type: STOP_DEMO
    })
}
