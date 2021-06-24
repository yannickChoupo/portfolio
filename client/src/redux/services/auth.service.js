import axios from "axios";
const API_URL = 'http://localhost:5000/account';

const signUp = (userName, password) => {
    console.log("redux sign up : ",userName,password);
    return axios.post(API_URL + '/signUp', {
        userName,
        password
    }).then((response) => {
        console.log("redux server reponse",response);
        console.log("redux response data : ",response.data);
        return response;
    });
}

const signIn = (userName, password) => {
    console.log("Sign in request : ",userName,password);
    return  axios({
        method: 'post',
        url: API_URL + '/signIn',
        data: {
            userName,
            password
        }
    }).then((response) => {
        console.log("Redux Server response : ",response);
        console.log("response data : ",response.data);
        return response;
    })
}
const authenticate = (user) => {
    return axios({
        method: 'GET',
        url: API_URL + '/verify?userName=' + user
    }).then((response) => {
        return response;
    })
}
const signOut = (token) => {
    return axios.post(API_URL + '/verify?userName=' + token, {
        token: token
    }).then((response) => {
        console.log(response.data);
        return response;
    });
}
const deleteAccount = (token) => {
    return axios.post(API_URL + '/delete', {
        token: token
    }).then((response) => {
        console.log(response.data);
        return response;
    });
}

export default {
    signIn,
    signUp,
    signOut,
    deleteAccount,
    authenticate
}