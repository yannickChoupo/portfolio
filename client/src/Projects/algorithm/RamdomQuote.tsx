import { useEffect, useState } from 'react';

const sendHttpRequest = (method, url) => {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "json";
        xhr.open(method, url);

        // xhr.onprogress = () => {
        //     console.info('LOADING', xhr.status);
        // }

        xhr.onload = (_response) => {
            if (xhr.status !== 200) {
                reject('Something went wrong');
            }
            resolve(xhr.response);
        }
        xhr.onerror = (_response) => {
            console.error('Response status code : ', xhr.status)
        }
        xhr.send();
    });
    return promise;
};

export const RandomQuote = () => {
    let url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
    const [quotes, setQuotes] = useState([]);
    const [inProp, setInProp] = useState(false);
    const [curQuote, setCurQuote] = useState({
        quote: '',
        author: '',
        color: ''
    })


    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    useEffect(() => {
        sendHttpRequest('GET', url).then((data: any) => {
            const randomIndex = generateRandomNum();
            const newQuote = data.quotes[randomIndex];
            const { quote, author } = newQuote;
            let color = getRandomColor();
            setQuotes(data.quotes);
            setCurQuote({ quote, author, color });
            // setInProp(!inProp);
        })
    }, [])

    const generateRandomNum = () => {
        return Math.floor(Math.random() * quotes.length);
    }


    const handleClick = () => {
        setInProp(true);
        let timeOut = setTimeout(() => {
            setInProp(false);
            clearTimeout(timeOut);
        }, 500);
        // Generate random number between 0 and the max of values in the database;
        const randomIndex = generateRandomNum();

        // Get the data at the index
        const newQuote = quotes[randomIndex];

        // Get the Author and the text and set update the view
        const { quote, author } = newQuote;
        let color = getRandomColor();
        setCurQuote({ quote, author, color });
        // setInProp(false);
    }


    return (
        <>
            <div id="randomQuote" className="" style={{ backgroundColor: curQuote.color }}>
                <div className="quote-box">
                    <div className="quote-text" style={{ opacity: !inProp ? 1 : 0 }}>
                        <i className="fa fa-quote-left" />
                        {curQuote.quote}
                    </div>
                    <div className="quote-author">
                        <span style={{ opacity: !inProp ? 1 : 0 }}>
                            -
                            {curQuote.author}
                        </span>
                    </div>
                    <div className="quote-footer">
                        <div className="icons">
                            {/* <a href="https://www.linkedin.com/in/yannick-njilo-794326205/">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512" 
                                    width="40"
                                     height="40"
                                    fill="#000000"
                                    >
                                    <path d="M383 105v11q0 45-16.5 88.5t-47 79.5t-79 58.5T134 365q-73 0-134-39q10 1 21 1q61 0 109-37q-29-1-51.5-18T48 229q8 2 16 2q12 0 23-4q-30-6-50-30t-20-55v-1q19 10 40 11q-39-27-39-73q0-24 12-44q33 40 79.5 64T210 126q-2-10-2-20q0-36 25.5-61.5T295 19q38 0 64 27q30-6 56-21q-10 31-39 48q27-3 51-13q-18 26-44 45" /></svg>
                            </a>
                            <a href="https://www.linkedin.com/in/yannick-njilo-794326205/">
                                <i className="fa fa-tumblr" />
                            </a> */}
                        </div>
                        <div>
                            <button type="button"
                                onClick={handleClick}>
                                New Quote
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default RandomQuote;