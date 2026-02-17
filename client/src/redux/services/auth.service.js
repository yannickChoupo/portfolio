import axios from 'axios';
import { getFromStorage } from "../../utils/storage";
import AXIOS from './axios';

// const API_BASE =
//     process.env.NODE_ENV === "production"
//         ? (process.env.REACT_APP_API_URL || "/portfolio/api")
//         : (process.env.REACT_APP_API_URL || "http://localhost:5000");


// const AXIOS = axios.create({ baseURL: API_BASE });

// const SERVER_Request = axios.create(
//     {
//         baseURL: `${process.env.NODE_ENV === "production" ?
//             process.env.REACT_APP_API_URL
//             :
//             'http://localhost:5000'}`
//     }
// );

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
    return AXIOS.post('/signIn', { userName, password });
}
///////////////////////////////////////////////////////////////////////////
export const visitorSignOut = () => {
    const storage = getFromStorage("main_storage");
    return AXIOS.post('/signOut', { message: storage.message });
}
///////////////////////////////////////////////////////////////////////////////
export const visitorSignUp = (userName, password) => {
    return AXIOS.post('/register', { userName, password });
}

export const session = () => {
    return AXIOS.post('/session', {});
}