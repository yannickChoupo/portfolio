const sendHttpRequest = <T = unknown>(
    method: string,
    url: string
): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.responseType = "json";

        xhr.open(method, url);

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response as T);
            } else {
                reject(
                    new Error(
                        `HTTP error: ${xhr.status}`
                    )
                );
            }
        };

        xhr.onerror = () => {
            reject(
                new Error("Network request failed")
            );
        };

        xhr.send();
    });
};

export default sendHttpRequest;