import React, {Component} from 'react';
import axios from "axios";
import $ from 'jquery'
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import {
    getFromStorage,
    setInStorage
} from "../utils/storage";

const userNameRegex = /^[A-Za-z]/
const DisplayResMessage = (props) => {
    console.log(props)
    // const { success, message } = response;
    const style = {
        'color': 'green'
    }
    return (
        <div className="errorMessage" style={{style}}>
            {/*{message}*/}
        </div>
    )
}
const initialState = {
    userName: '',
    password: '',

    token: '',
    isLoading: true,


    response: {
        success: false,
        message: ''
    }
}

class LogInOut extends React.Component {
    constructor(props) {
        console.log("component Mount !!!!!")
        super(props);
        this.state = ({
            userName: '',
            password: '',

            token: '',
            isLoading: true,

            response: {
                success: false,
                message: ''
            },

            logged: false
        })
        // this.handleKeyPressed = this.handleKeyPressed.bind(this);
        this.updateUserName = this.updateUserName.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        // this.handleSuccess = this.handleSuccess.bind(this);
        // this.handleError = this.handleError.bind(this);

        this.onSignUp = this.onSignUp.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
    }

    componentDidMount() {
        const mainStorage = getFromStorage('main_storage');
        if (mainStorage) {
            const { token } = mainStorage;
            // verify token
            this.setState({
                isLoading: true,
            })
            axios({
                method: 'post',
                url: 'http://localhost:5000/account/verify?token=' + token,
            }).then(response => {
                if (response.data.success) {
                    this.setState({
                        token: token,
                        isLoading: false,
                        logged: true
                    })
                } else {
                    this.setState({
                        isLoading: false
                    })
                }
            });
        } else {
            this.setState({
                isLoading: false
            })
        }
    }

    componentWillMount() {
        console.log("component will mount")
        document.addEventListener("keyPress", this.handleKeyPressed.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener("keypress", this.handleKeyPressed.bind(this));
    }

    handleKeyPressed(event) {
        console.log(event);
    }

    updateUserName = (event) => {
        this.setState({
            userName: event.target.value
        });
    }
    updatePassword = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    onSignUp() {
        console.log("sign Up")
        // Grab the state
        const {
            userName,
            password
        } = this.state;
        // Post request to backend
        this.setState({
            isLoading: true,
        })
        axios({
            method: 'post',
            url: 'http://localhost:5000/account/signUp',
            data: {
                userName,
                password
            }
        }).then(response => {
            if (response.data.success) {
                this.setState({
                    isLoading: false,
                    response: response.data,
                    userName: '',
                    password: ''
                })
            } else {
                this.setState({
                    response: response.data,
                    isLoading: false
                })
            }
            this.handleResponse();
        });
    }

    onSignIn() {
        console.log("sign In")
        // Grab the state
        const {
            userName,
            password
        } = this.state;
        // Post request to backend
        this.setState({
            isLoading: true,
        })
        axios({
            method: 'post',
            url: 'http://localhost:5000/account/signIn',
            data: {
                userName,
                password
            }
        }).then(response => {
            if (response.data.success) {
                setInStorage('main_storage', {token: response.data.token})
                this.setState({
                    userName: '',
                    password: '',

                    isLoading: false,
                    response: response.data,
                    token: response.data.token
                })
            } else {
                this.setState({
                    response: response.data,
                    isLoading: false
                })
            }
            this.handleResponse();
        });
    }

    handleResponse = () => {
        $(".errorMessage").show();
        setTimeout(() => {
            $(".errorMessage").hide();
        }, 1000)
    }

    render() {
        console.log("component Mount !!!!!")
        const userNameIsValid = false;
        const passwordIsValid = false;
        const {
            userName,
            password,
            token,
            isLoading,
            response,
            logged
        } = this.state;
        let errorStyle = '';
        errorStyle = {
            'color': response.success ? 'green' : 'red'
        }
        if (isLoading) {
            return (<div>
                <p>
                    Loading...
                </p>
            </div>)
        }
        const status = !token ? "Up" : "In";
        return (
            <>
                {/*{ !logged &&*/}
                <div className="grid-full log">
                    <div className="errorMessage hide" style={errorStyle}>{response.message}</div>
                    <div className="main">
                        <div className="header">
                            <div>Sign {status}</div>
                        </div>
                        <form className="container" autoComplete="off">
                            <div className="row" role="userName">
                                <label htmlFor="name" className="col-2">
                                    <i className="fa fa-user"/>
                                </label>
                                <div className="col-10">
                                    <input type="text" id="userName"
                                           placeholder="visitor name"
                                           maxLength="8"
                                           value={userName}
                                           onChange={(event) => this.updateUserName(event)}
                                           required/>
                                    {userNameIsValid && <i className="fa fa-check"/>}
                                </div>
                            </div>

                            <div className="row" role="password">
                                <label htmlFor="inputPassword" className="col-2">
                                    <i className="fa fa-unlock-alt"/>
                                </label>
                                <div className="col-10">
                                    <input type="password"
                                           id="inputPassword"
                                           placeholder="Password"
                                           maxLength="8"
                                           value={password}
                                           onChange={(event) => this.updatePassword(event)}
                                           required/>
                                    {/*<div></div>*/}
                                    {passwordIsValid && <i className="fa fa-check"/>}
                                </div>
                            </div>
                            <div className="row" role="submit">
                                <button type="button" value="Submit"
                                        onClick={!token ? this.onSignUp : this.onSignIn}>
                                    Sign {status}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                {/*}*/}
            </>
        );
        // }else{
        //     return (
        //         <p>
        //             {token}
        //         </p>
        //     )
        // }

    }


}

export default LogInOut;