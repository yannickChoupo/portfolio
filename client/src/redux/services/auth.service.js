import axios from 'axios';
import { getFromStorage } from "../../utils/storage";
const SERVER_Request = axios.create(
    {
        baseURL: `${process.env.NODE_ENV === "production" ?
            'https://yannick-njilo-portfolio.herokuapp.com'
            :
            'http://localhost:5000'}`
    }
);

// SERVER_Request.interceptors.request.use((req) => {
//     if (req.url === "/signOut") {
//         // req.body.token = storage.to= {message: storage.message, token: storage.token};
//         console.log("Interceptor -> request url : ", req.url);
//         req.headers.authorization = `Bearer ${getFromStorage("main_storage").token}`;
//         return req;
//     }
//     return req;
// }, err => {
//     console.log(err);
// })

/////////////////////////////////////////////////////////////////////////////////////////
export const visitorSignIn = (userName, password) => {
    return SERVER_Request.post('/signIn', { userName, password });
}
///////////////////////////////////////////////////////////////////////////
export const visitorSignOut = () => {
    const storage = getFromStorage("main_storage");
    return SERVER_Request.post('/signOut', { message: storage.message });
}
///////////////////////////////////////////////////////////////////////////////
export const visitorSignUp = (userName, password) => {
    return SERVER_Request.post('/register', { userName, password });
}

export const session = () => {
    return SERVER_Request.post('/session', {});
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