import React, { useEffect, useState } from 'react';
// import {
//     CSSTransition,
//     TransitionGroup
// } from "react-transition-group";

const sendHttpRequest = (method, url) => {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        console.log(xhr)
        xhr.responseType = "json";

        xhr.open(method, url);
        console.log("Request opened...");

        xhr.onprogress = () => {
            console.log('LOADING', xhr.status);
        }


        xhr.onload = (response) => {
            console.log('DONE respone status : ', xhr.status)
            if (xhr.status !== 200) {
                reject('Something went wrong');
            }
            resolve(xhr.response);
        }
        xhr.onerror = (response) => {
            console.log('Response status code : ', xhr.status)
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
        sendHttpRequest('GET', url).then((data) => {
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
            <div id="randomQuote" className="page" style={{ backgroundColor: curQuote.color }}>
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
                            <a href="https://www.linkedin.com/in/yannick-njilo-794326205/">
                                <i className="fa fa-twitter" />
                            </a>
                            <a href="https://www.linkedin.com/in/yannick-njilo-794326205/">
                                <i className="fa fa-tumblr" />
                            </a>
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