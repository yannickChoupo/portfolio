export function getFromStorage(key) {
    if(!key) {
        return null;
    }
    try {
        const valueStr = localStorage.getItem((key));
        if (valueStr) {
            return JSON.parse(valueStr);
        }
        return null;
    } catch (err) {
        console.log(err);
        return null;
    }
}
export function setInStorage(key, obj) {
    if(!key) {
        console.error(('Error: key is missing'));
    }

    try {
        localStorage.setItem(key, JSON.stringify(obj));
    } catch (err) {
        console.error(err);
    }
}
export function removeInStorage(key) {
    if(!key) {
        console.error(('Error: key is missing'));
    }

    try {
        localStorage.removeItem(key);
    } catch (err) {
        console.error(err);
    }
}