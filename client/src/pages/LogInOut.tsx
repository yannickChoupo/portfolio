import React from 'react';
import axios from "axios";
import { setInStorage } from "../utils/storage";

interface LogInOutState {
    userName: string;
    password: string;
    token: string;
    isLoading: boolean;
    response: {
        success: boolean;
        message: string;
    };
    logged: boolean;
}

class LogInOut extends React.Component<{}, LogInOutState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            token: '',
            isLoading: true,
            response: {
                success: false,
                message: ''
            },
            logged: false
        }
        this.updateUserName = this.updateUserName.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
    }

    componentDidMount(): void {
        // Token verification logic can be added here
    }

    updateUserName = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            userName: event.target.value
        });
    }

    updatePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            password: event.target.value
        });
    }

    onSignUp = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const {
            userName,
            password
        } = this.state;

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
        }).catch(error => {
            this.setState({
                response: {
                    success: false,
                    message: 'An error occurred ' + error
                },
                isLoading: false
            })
        });
    }

    onSignIn = (): void => {
        const {
            userName,
            password
        } = this.state;

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
        }).catch(error => {
            this.setState({
                response: {
                    success: false,
                    message: 'An error occurred ' + error
                },
                isLoading: false
            })
        });
    }

    render() {
        const {
            userName,
            password,
            token,
            // isLoading,
            // response
        } = this.state;

        // const errorStyle = {
        //     'color': response.success ? 'green' : 'red'
        // } as React.CSSProperties;

        const status = !token ? "Up" : "In";

        return (
            <>
                <div id="sign" className="page">
                    <div className="page-container">
                        <div className="header">
                            <div>Sign {status}</div>
                        </div>
                        <form onSubmit={this.onSignUp}>
                            <label>
                                username:
                                <input 
                                    name="username"
                                    type="text"
                                    id="username"
                                    maxLength={8}
                                    value={userName}
                                    onChange={this.updateUserName}>
                                </input>
                            </label>
                            <label>
                                password:
                                <input  
                                    name="password"
                                    type="password"
                                    id="password"
                                    maxLength={8}
                                    value={password}
                                    onChange={this.updatePassword}>
                                </input>
                            </label>
                            <label>
                                <input 
                                    name="submit"
                                    type="submit"
                                    value="submit"
                                    onClick={() => this.onSignUp}>
                                </input>
                            </label>
                        </form>
                    </div> 
                </div>
            </>
        );
    }
}

export default LogInOut;
