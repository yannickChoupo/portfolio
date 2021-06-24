import {getFromStorage} from "../../utils/storage";

export default function authHeader() {
    const mainStorage = getFromStorage('main_storage');
    if (mainStorage && mainStorage.token) {
        return { 'x-access-token': mainStorage.token }
    } else {
        return {};
    }
}