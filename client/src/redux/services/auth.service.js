import axios from "axios";
import {getFromStorage} from "../../utils/storage";

const VISITOR_API = axios.create({baseURL: 'http://localhost:5000/visitor'});


// API.interceptors.request.use((req) => {
//     if (getFromStorage("main_storage")) {
//         req.headers.Authorization = `Bearer ${getFromStorage("main_storage")}`
//     }
//     return req;
// })
export const visitorSignIn = (userName, password) => {
    console.log("Sign in request : ", userName, password);

    return VISITOR_API.post('/signIn', {userName, password});
        // .then((response) => {
        //     console.log("Redux Server response : ", response);
        //     console.log("response data : ", response.data);
        //     return response;
        // })
}
// const signUp = (userName, password) => {
//     console.log("redux sign up : ",userName,password);
//     return axios.post(API_URL + '/signUp', {
//         userName,
//         password
//     }).then((response) => {
//         console.log("redux server reponse",response);
//         console.log("redux response data : ",response.data);
//         return response;
//     });
// }
// const authenticate = (user) => {
//     return axios({
//         method: 'GET',
//         url: API_URL + '/verify?userName=' + user
//     }).then((response) => {
//         return response;
//     })
// }
// const signOut = (token) => {
//     return axios.post(API_URL + '/verify?userName=' + token, {
//         token: token
//     }).then((response) => {
//         console.log(response.data);
//         return response;
//     });
// }
export const visitorSignOut = (visitorId) => {
    return axios.post(VISITOR_API + '/delete', {
        visitorId: visitorId
    }).then((response) => {
        console.log(response.data);
        return response;
    });
}
///////////////////////////////////////////////////////////////////////////////
export const visitorSignUp = (userName, password) => {
    console.log("Sign up request : ", userName, password);
    return VISITOR_API.post('/register', {userName, password});
        // .then((response) => {
        //     console.log("Redux Server response : ", response);
        //     console.log("response data : ", response.data);
        //     return response;
        // })
}


// export default {
    // signIn,
    // signUp,
    // signOut,
    // deleteAccount,
    // authenticate,
    // visitorSignUp,
    // visitorSignIn
// }