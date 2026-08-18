const sendHttpRequest = (method, url) => {
    const promise = new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "json";
        xhr.open(method, url);
        xhr.onload = () => {
            resolve(xhr.response);
        }
        xhr.send();
    });
    return promise;
};


export default sendHttpRequest;