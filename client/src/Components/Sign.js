import React, {useEffect, useState} from 'react';
import $ from "jquery";
import history from "../helpers/history";
import {BrowserView, MobileView} from 'react-device-detect';


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
        setTimeout(submitHandler, 1000);
        if (isSignup) {
            dispatch(visitorSignUp(userName, password, history))
                .then((response) => {
                    console.log("response : ", response.data);
                    if (response.data.success) {
                        switchMode();
                    }
                })
        } else {
            dispatch(visitorSignIn(userName, password, history))
                .then((response) => {
                    if (response.data.success) {
                        history.push('/');
                        window.location.reload(true);
                    }
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
                    <h1 className="message" style={messageStyle}>{message}</h1>
                    <section className={`body ${isSignup && "signUp"}`}>

                        <div className="header">
                            <section>
                                <h3 className="switch" onClick={switchMode}>⇋</h3>
                            </section>
                            <section>
                                <h3 className="mode">{isSignup ? "Sign Up" : "Sign In"}</h3>
                            </section>
                        </div>
                        <form autoComplete="on" onSubmit={handleSubmit}>
                            <div role="userName" className="form-group">
                                <label htmlFor="name">
                                    <i className="fa fa-user"/>
                                </label>
                                <input type="text"
                                       id="userName"
                                       placeholder="visitor name"
                                       name="userName"
                                       maxLength="8"
                                       value={getFieldValue(userName)}
                                       onChange={(e) => updateFields(e)}
                                       autoFocus
                                       required/>
                            </div>
                            <div role="password" className="form-group">
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
                            </div>
                        </form>
                        <section role="submit">
                            <div className="submit-btn" onClick={handleSubmit}>
                                submit
                            </div>
                        </section>
                    </section>
                </div>
            </div>
        </>
    );
}

export default Sign;