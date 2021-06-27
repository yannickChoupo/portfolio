import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    AUTHENTICATE
} from "./type"

import * as api from "../services/auth.service";


import {setInStorage} from "../../utils/storage";

export const visitorSignUp = (userName, password, history) => async (dispatch) => {
    return api.visitorSignUp(userName, password).then(
        (response) => {
            console.log("Server response : " ,response.data);
            if (!response.data.success) {
                dispatch({
                    type: REGISTER_FAIL
                })
                dispatch({
                    type: SET_MESSAGE,
                    payload: response.data.message
                })

                return response;
            } else {
                dispatch({
                    type: REGISTER_SUCCESS
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: response.data.message
                })
                return response;
            }
        });
}
export const visitorSignIn = (userName, password) => async (dispatch) => {
    console.log("sign In request");
    return api.visitorSignIn(userName, password)
        .then((response) => {
                console.log(response.data)
                dispatch({
                    type: SET_MESSAGE,
                    payload: response.data.message
                })
                if (response.data.success) {
                    console.log("PAYLOAD : ",response.data);
                    dispatch({
                        type: AUTHENTICATE,
                        payload: response.data
                    })
                    dispatch({
                        type: SET_MESSAGE,
                        payload: response.data.message
                    })
                } else {
                    dispatch({
                        type: LOGIN_FAIL,
                        payload: response.data.message,
                    });
                    dispatch({
                        type: SET_MESSAGE,
                        payload: response.data.message
                    })
                }
                return response;
            }
        )
}
export const visitorSignOut = (visitorName,visitorMessage) => (dispatch) => {
    console.log("Logout request !!!!!!!!!!!!!!!!!!!!",visitorName,visitorMessage);
    return api.visitorSignOut(visitorName,visitorMessage)
        .then((response) => {
            if (response.data.success) {
                dispatch({
                    type: LOGOUT
                })
            }
            console.log("response : ", response);
            console.log("response : ", response.data);
            return response;
        })
}
// export const authenticate = (userName) => (dispatch) => {
//     // AuthService.signOut(token);
//     console.log("authentication Request : ", userName);
//     return AuthService.authenticate(userName)
//         .then((response) => {
//             if (response.data.success) {
//                 dispatch({
//                     type: LOGIN_SUCCESS
//                 })
//                 return response;
//             }
//             console.log("response : ", response);
//             console.log("response : ", response.data);
//             return response;
//         })
// }