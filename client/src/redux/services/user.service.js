import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://localhost:5000/account';

const getUserBoard = () => {
    return axios.get(API_URL + '/user', { headers: authHeader() })
}
const getModeratorBoard = () => {
    return axios.get(API_URL + '/mod', { headers: authHeader() })
}
const getAdminBoard = () => {
    return axios.get(API_URL + '/admin', { headers: authHeader() })
}

export default {
    getAdminBoard,
    getModeratorBoard,
    getUserBoard
}