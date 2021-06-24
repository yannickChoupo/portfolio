import React, {useEffect, useState} from 'react';
import history from "../helpers/history"

import {useDispatch, useSelector} from "react-redux"
import {signIn, signUp} from "../redux/actions/auth";

import {getFromStorage} from "../utils/storage";

import {clearMessage, setMessage} from "../redux/actions/message";
import {setIsLoading, clearIsLoading} from "../redux/actions/request";

const userName = 'userName';

const password = 'password';
const SIGNUP = 'SIGNUP';
const SIGNIN = 'SIGNIN';
const initialState = {
    userName: '',
    password: '',
}

const Sign = () => {
    const [fieldState, setFieldState] = useState({
        userName: "",
        password: ""
    })
    const [curMode, setCurMode] = useState("");

    useEffect(() => {
        console.log("curMode : ", curMode);
        if (!getFromStorage("main_storage")) {
            setCurMode(SIGNUP);
            console.log("local storage empty")
        } else {
            if(window.innerWidth > 500) {
                history.push("/");
                window.location.reload();
                console.log("localstorage : " + getFromStorage("main_storage").user)
            } else {
                // sign page as page
            }
        }
    }, [])
    useEffect(() => {
        console.log("curMode : ", curMode);
    }, [curMode]);

    const switchMode = () => {
        console.log("switch mode");
        resetFields();
        const newMode = curMode === SIGNIN ? SIGNUP : SIGNIN;
        setCurMode(newMode);
    }
    const getFieldValue = (prop) => {
        return fieldState[prop];
    }
    const resetFields = () => {
        setFieldState(initialState);
    }
    const updateFields = (prop, value) => {
        setFieldState({...fieldState, [prop.toString()]: value})
    }

    // console.log(fieldMode);
    // const {isLoggedIn} = useSelector(state => state.auth);
    const {message} = useSelector(state => state.message);
    const {isLoading} = useSelector(state => state.request);


    const dispatch = useDispatch();
    // const {message} = useSelector(state => state.message);
    const onSignIn = () => {
        // event.preventDefault();
        const {userName, password} = fieldState;
        console.log("FRontend sign In REQUEST");
        // Grab the state
        dispatch(setIsLoading());
        dispatch(signIn(userName, password))
            .then((response) => {
                console.log("Frontend server response : ", response.data);
                dispatch(setIsLoading());
                dispatch(setMessage(response.data.message));
                setTimeout(handleResponse, 2000);
                console.log("response : ", response);
                if (response.data.success) {
                    history.push("/");
                    window.location.reload();
                }
            })
        // window.location.reload();
    }
    const onSignUp = () => {
        const {userName, password} = fieldState;
        console.log("sign Up", userName, password);

        dispatch(setIsLoading());
        dispatch(signUp(userName, password))
            .then((response) => {
                dispatch(setIsLoading());
                dispatch(setMessage(response.data.message));
                setTimeout(handleResponse, 2000);
                console.log("response : ", response);
                return response;
            })
            .then((response) => {
                if (response.data.message === 'Error: account already exist') {
                    setCurMode(SIGNIN);
                }
                return response;
            })
            .then((response) => {
                if(response.data.success){
                    setCurMode(SIGNIN);
                }
            })
    };
    const handleResponse = () => {
        console.log("Operation complete**********************************************************************************")
        // if(message && message === 'Error: account already exist'){
        //     setCurMode(SIGNIN);
        // }
        dispatch(clearIsLoading());
        dispatch(clearMessage());
        clearTimeout(handleResponse);
        resetFields();
        console.log("new isLoading : ", isLoading);
        console.log("is newMessage : ", message);
    }
    let messageStyle = {
        'color': /Error/.test(message) ? 'red' : 'green'
    };
    return (
        <>
            <div id="sign" className="page sign">
                <div className="page-container">
                    <section className={`body ${curMode === SIGNUP && "signUp"}`}>
                        <h1 style={messageStyle}>{message}</h1>
                        <div className="header">
                            <section>
                                <h3 className="switch" onClick={switchMode}>⇋</h3>
                            </section>
                            <section>
                                <h3 className="mode">{curMode === SIGNIN ? "Sign In" : "Sign Up"}</h3>
                            </section>
                        </div>
                        <form autoComplete="on">
                            <section role="userName">
                                <label htmlFor="name">
                                    <i className="fa fa-user"/>
                                </label>
                                <input type="text" id="userName"
                                       placeholder="visitor name"
                                       maxLength="8"
                                       value={getFieldValue(userName)}
                                       onChange={(event) => updateFields(userName, event.target.value)}
                                       required/>
                            </section>

                            <section role="password">
                                <label htmlFor="inputPassword">
                                    <i className="fa fa-unlock-alt"/>
                                </label>
                                <input type="password"
                                       id="inputPassword"
                                       placeholder="Password"
                                       maxLength="8"
                                       value={getFieldValue(password)}
                                       onChange={(event) => updateFields(password, event.target.value)}
                                       required/>
                            </section>
                        </form>
                        <div role="submit">
                            {curMode === SIGNUP ? <div onClick={onSignUp}>
                                Sign Up
                            </div> : <div onClick={onSignIn}>
                                Sign In
                            </div>}
                        </div>
                    </section>
                </div>
            </div>
            {/*<CSSTransition*/}
            {/*in={IsLoading}*/}
            {/*timeout={401}*/}
            {/*classNames="fades"*/}
            {/*>*/}

            {/*</CSSTransition>*/}
            {/*<div className="main">*/}
            {/*    <div className="header d-flex justify-space-b">*/}
            {/*        <div className="btn bg-secondary" onClick={() => {*/}
            {/*            switchMode(SIGNUP)*/}
            {/*        }}> Sign Up*/}
            {/*        </div>*/}
            {/*        <div className="btn bg-success" onClick={() => switchMode(SIGNIN)}> Sign In</div>*/}
            {/*    </div>*/}
            {/*    <form className="container" autoComplete="off">*/}
            {/*        <div className="row" role="userName">*/}
            {/*            <label htmlFor="name" className="col-2">*/}
            {/*                <i className="fa fa-user"/>*/}
            {/*            </label>*/}
            {/*            <div className="col-10">*/}
            {/*                <input type="text" id="userName"*/}
            {/*                       placeholder="visitor name"*/}
            {/*                       maxLength="8"*/}
            {/*                       value={getFieldValue(userName)}*/}
            {/*                       onChange={(event) => updateFields(userName, event.target.value)}*/}
            {/*                       required/>*/}
            {/*                /!*{userNameIsValid && <i className="fa fa-check"/>}*!/*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <div className="row" role="password">*/}
            {/*            <label htmlFor="inputPassword" className="col-2">*/}
            {/*                <i className="fa fa-unlock-alt"/>*/}
            {/*            </label>*/}
            {/*            <div className="col-10">*/}
            {/*                <input type="password"*/}
            {/*                       id="inputPassword"*/}
            {/*                       placeholder="Password"*/}
            {/*                       maxLength="8"*/}
            {/*                       value={getFieldValue(password)}*/}
            {/*                       onChange={(event) => updateFields(password, event.target.value)}*/}
            {/*                       required/>*/}
            {/*                /!*<div></div>*!/*/}
            {/*                /!*{passwordIsValid && <i className="fa fa-check"/>}*!/*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="row d-Flex-center" role="submit">*/}
            {/*            <div className="btn bg-light w-25 "*/}
            {/*                 onClick={fieldMode === SIGNUP ? onSignUp : onSignIn}>*/}
            {/*                {fieldMode}*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </form>*/}
            {/*</div>*/}

        </>
    );
}

export default Sign;