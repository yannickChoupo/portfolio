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
// const VISITOR_MESSAGE_API = axios.create(
//     {
//         baseURL: `${process.env.NODE_ENV === "production" ?
//             'https://yannick-njilo-portfolio.herokuapp.com'
//             :
//             'http://localhost:5000'}/visitor`
//     }
// );
// }
///////////////////////**************************////////////////////////////

VISITOR_API.interceptors.request.use((req) => {
    if(req.url === "/signOut") {
        // req.body.token = storage.to= {message: storage.message, token: storage.token};
        console.log("Interceptor -> request url : ",req.url);
        req.headers.authorization = `Bearer ${getFromStorage("main_storage").token}`;
        return req;
    }
    return req;
},err => {
    console.log(err);
})
/////////////////////////////////////////////////////////////////////////////////////////
export const visitorSignIn = (userName, password) => {
    return VISITOR_API.post('/signIn', {userName, password});
}
///////////////////////////////////////////////////////////////////////////
export const visitorSignOut = () => {
    const storage = getFromStorage("main_storage");
    return VISITOR_API.post('/signOut',{message: storage.message});
}
///////////////////////////////////////////////////////////////////////////////
export const visitorSignUp = (userName, password) => {
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