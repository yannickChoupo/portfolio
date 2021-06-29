import React, {useEffect, useState} from 'react';
import history from "../helpers/history"

import {useDispatch, useSelector} from "react-redux"
import {authenticate, visitorSignIn, visitorSignUp} from "../redux/actions/auth";

import {getFromStorage} from "../utils/storage";

import {clearMessage, setMessage} from "../redux/actions/message";
import {setIsLoading, clearIsLoading} from "../redux/actions/request";

const userName = 'userName';

const password = 'password';
const initialState = {
    userName: '',
    password: '',
}

const Sign = () => {
    const [fieldState, setFieldState] = useState({
        userName: "",
        password: ""
    })
    const [isSignup, setIsSignup] = useState(true);

    const {isLoggedIn} = useSelector(state => state.auth);


    const handleSubmit = (e) => {
        e.preventDefault();
        const {userName, password} = fieldState;
        setTimeout(submitHandler, 2000);
        // dispatch(setIsLoading());
        if (isSignup) {
            dispatch(visitorSignUp(userName, password, history))
                .then((response) => {
                    console.log("response : ", response.data);
                    if (response.data.success) {
                        switchMode();
                    }
                    dispatch(clearIsLoading());
                    // submitHandler();
                })
        } else {
            dispatch(visitorSignIn(userName, password, history))
                .then((response) => {
                    if (response.data.success) {
                        history.push('/');
                        window.location.reload(true);
                    }
                    dispatch(clearIsLoading());

                })
        }
        submitHandler();
    }
    const switchMode = () => {
        console.log("switch mode");
        resetFields();
        setIsSignup(!isSignup);
    }
    const getFieldValue = (prop) => {
        return fieldState[prop];
    }
    const resetFields = () => {
        setFieldState(initialState);
    }
    const updateFields = (e) => {
        setFieldState({...fieldState, [e.target.name]: e.target.value});
        console.log(fieldState);
    }

    const {message} = useSelector(state => state.message);
    const {isLoading} = useSelector(state => state.request);


    const dispatch = useDispatch();
    const submitHandler = () => {
        // dispatch(clearIsLoading());
        dispatch(clearMessage());
        clearTimeout(submitHandler);
        resetFields();
    }
    let messageStyle = {
        'color': /Error/.test(message) ? 'red' : 'green'
    };
    return (
        <>
            <div id="sign" className="page">
                <div className="page-container">
                    <section className={`body ${isSignup && "signUp"}`}>
                        <h1 className="message" style={messageStyle}>{message}</h1>
                        <div className="header">
                            <section>
                                <h3 className="switch" onClick={switchMode}>⇋</h3>
                            </section>
                            <section>
                                <h3 className="mode">{isSignup ? "Sign Up" : "Sign In"}</h3>
                            </section>
                        </div>
                        <form autoComplete="on">
                            <section role="userName">
                                <label htmlFor="name">
                                    <i className="fa fa-user"/>
                                </label>
                                <input type="text" id="userName"
                                       placeholder="visitor name"
                                       name="userName"
                                       maxLength="8"
                                       value={getFieldValue(userName)}
                                       onChange={(e) => updateFields(e)}
                                       required/>
                            </section>
                            <section role="password">
                                <label htmlFor="inputPassword">
                                    <i className="fa fa-unlock-alt"/>
                                </label>
                                <input type="password"
                                       id="inputPassword"
                                       placeholder="Password"
                                       name="password"
                                       maxLength="8"
                                       value={getFieldValue(password)}
                                       onChange={(e) => updateFields(e)}
                                       required/>

                            </section>
                            <section role="submit">
                                <button className="submit-btn" onClick={handleSubmit}>
                                    Submit
                                </button>
                            </section>
                        </form>
                    </section>
                </div>
            </div>
        </>
    );
}

export default Sign;