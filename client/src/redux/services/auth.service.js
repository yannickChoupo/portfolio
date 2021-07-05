import axios from "axios";
import {getFromStorage} from "../../utils/storage";
///////////************************////////////////////////////////////////////////
// let VISITOR_API = ""
// if (process.env.NODE_ENV === "production") {
//     const VISITOR_API = axios.create({baseURL: 'https://yannick-njilo-portfolio.herokuapp.com/visitor'});
// } else {
const VISITOR_API = axios.create(
    {
        baseURL: `${process.env.NODE_ENV === "production" ?
            'https://yannick-njilo-portfolio.herokuapp.com'
            :
            'http://localhost:5000'}/visitor`
    }
);
// }
///////////////////////**************************////////////////////////////

// API.interceptors.request.use((req) => {
//     if (getFromStorage("main_storage")) {
//         req.headers.Authorization = `Bearer ${getFromStorage("main_storage")}`
//     }
//     return req;
// })
/////////////////////////////////////////////////////////////////////////////////////////
export const visitorSignIn = (userName, password) => {
    // console.log("Sign in request : ", userName, password);
    return VISITOR_API.post('/signIn', {userName, password});
}
///////////////////////////////////////////////////////////////////////////
export const visitorSignOut = (visitorName, visitorMessage) => {
    console.log("redux signout request : ", visitorMessage, visitorName);
    return VISITOR_API.post('/signOut',
        {visitorName, visitorMessage});
    // .then((response) => {
    //     console.log(response.data);
    //     return response;
    // });
}
///////////////////////////////////////////////////////////////////////////////
export const visitorSignUp = (userName, password) => {
    // console.log("Sign up request : ", userName, password);
    return VISITOR_API.post('/register', {userName, password});
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