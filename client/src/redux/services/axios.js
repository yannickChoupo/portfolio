import axios from "axios";
import { getFromStorage } from '../../utils/storage';

let AXIOS = axios.create(
    {
        baseURL: `${process.env.NODE_ENV === "production" ?
            'https://yannick-njilo-portfolio.herokuapp.com'
            :
            'http://localhost:5000'}`
    }
);

AXIOS.interceptors.request.use((req) => {
    const mainStorage = getFromStorage("session");
    let token = ''
    if (mainStorage) {
        token = mainStorage;
    }
    req.headers.Authorization = `Bearer ${token}`;
    return req;
}, err => {
    console.log(err);
})

export default AXIOS;
