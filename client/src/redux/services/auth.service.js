import axios from 'axios';
import { getFromStorage } from "../../utils/storage";
import AXIOS from './axios';

export const visitorSignIn = (userName, password) => {
    return AXIOS.post('/signIn', { userName, password });
}

export const visitorSignOut = () => {
    const storage = getFromStorage("main_storage");
    return AXIOS.post('/signOut', { message: storage.message });
}

export const visitorSignUp = (userName, password) => {
    return AXIOS.post('/register', { userName, password });
}

export const session = () => {
    return AXIOS.post('/session', {});
}