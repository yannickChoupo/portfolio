import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    AUTHENTICATE
} from "./type"

import AuthService from "../services/auth.service"
import { setInStorage } from "../../utils/storage";

export const signUp = (userName, password) => ( dispatch ) => {
    return AuthService.signUp(userName, password).then(
        (response) => {
            if (!response.data.success) {
                dispatch({
                    type: REGISTER_FAIL
                })
                // dispatch({
                //     type: SET_MESSAGE,
                //     payload: response.data.message
                // })
                return response;
            } else {
                dispatch({
                    type: REGISTER_SUCCESS
                });
                // dispatch({
                //     type: SET_MESSAGE,
                //     payload: response.data.message
                // })
                return  response;
            }
        });
}
export const signIn = (userName, password) => (dispatch) => {
    return AuthService.signIn(userName, password)
        .then((response) => {
            // console.log(response.data)
                if (response.data.success) {
                    setInStorage('main_storage', { user: response.data.user});
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: response.data.user
                    })
                    dispatch({
                        type: SET_MESSAGE,
                        payload: response.data.message
                    })
                    return response;
                } else {
                    dispatch({
                        type: LOGIN_FAIL,
                        payload: response.data.message,

                    });
                    dispatch({
                        type: SET_MESSAGE,
                        payload: response.data.message
                    })
                    return response;
                }
            }
        )
}
export const deleteUser = (token) => (dispatch) => {
    return AuthService.deleteAccount(token)
        .then((response) => {
            if (response.data.success) {
                localStorage.removeItem('main_storage');
                dispatch({
                    type: LOGOUT
                })
                dispatch({
                    type: SET_MESSAGE,
                    payload: response.data.message
                })
            }
            return response;
        })
}
export const signOut = (token) => (dispatch) => {
    // AuthService.signOut(token);
    console.log("Logout request !!!!!!!!!!!!!!!!!!!!");
    return AuthService.deleteAccount(token)
        .then((response) => {
            if(response.data.success){
//******************************//****************************************************
                localStorage.removeItem('main_storage');
//*****************************//*******************************************
                dispatch({
                    type: LOGOUT
                })
                dispatch({
                    type: SET_MESSAGE,
                    payload: response.data.message
                })
            }
            console.log("response : ",response);
            console.log("response : ",response.data);
            return response;
        })
    // localStorage.removeItem('main_storage')
}
export const authenticate = (userName) => (dispatch) => {
    // AuthService.signOut(token);
    console.log("authentication Request : ",userName);
    return AuthService.authenticate(userName)
        .then((response) => {
            if(response.data.success){
                dispatch({
                    type: LOGIN_SUCCESS
                })
                return response;
            }
            console.log("response : ",response);
            console.log("response : ",response.data);
            return response;
        })
}