import React, {useEffect, useState} from 'react';
import axios from "axios";

export const RandomQuote = () => {
    const [data, setData] = useState({author: "", text: "", color: ""});
    const [dataBase, setDataBase] = useState([]);

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    useEffect(() => {
        fetch("https://type.fit/api/quotes")
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setDataBase(data);
                // console.log(data);
            });
    }, [])

    const generateRandomNum = () => {
        return Math.floor(Math.random() * dataBase.length);
    }
    const fetchQuoteText = async () => {
        console.log("new fetch request");
        // Generate random number between 0 and the max of values in the database;
        const newQuoteIndex = generateRandomNum();

        // Get the data at the index
        const Quote = dataBase[newQuoteIndex];

        // Get the Author and the text and set update the view
        const {text, author} = Quote;
        Quote.color = getRandomColor();
        setData(Quote);
        // let newQuote = {};
        // axios.get("https://goquotes-api.herokuapp.com/api/v1/random?count=1", { crossdomain: true })
        //     .then((response) => {
        //     })
        // req.open("GET", "https://goquotes-api.herokuapp.com/api/v1/random?count=1", true);
        // req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        // req.setRequestHeader('Access-Control-Allow-Origin', '*');
        // req.send();
        //
        // req.onload = () => {
        //     const json = JSON.parse(req.response);
        //     const {quotes: data} = json;
        //     newQuote = data[0];
        //     newQuote.color = getRandomColor();
        //     setData(newQuote);
        // }
        // await fetch("https://goquotes-api.herokuapp.com/api/v1/random?count=1", {
        //     method: "get", //put your method
        //     headers: {
        //         "Content-Type": "application/json",
        //         "X-Requested-With": "XMLHttpRequest",
        //         "Access-Control-Allow-Origin": "*"
        //     },
        //     mode: 'no-cors'
        // }).then((response) => console.log(Response));
    }
    return (
        <>
            <div id="randomQuote" className="project" style={{backgroundColor: data.color}}>
                {/*<div className="page-container">*/}
                <div className="quote-box">
                    <div className="quote-text">
                        <i className="fa fa-quote-left"/>
                        {data.text}
                    </div>
                    <div className="quote-author">
                        <span>- {data.author}</span>
                    </div>
                    <div className="quote-footer">
                        <div className="icons">
                            {/*<a style={{backgroundColor: data.color}} href="#">*/}
                            <a href="#">
                                <i className="fa fa-twitter"/>
                            </a>
                            {/*<a style={{backgroundColor: data.color}} href="#">*/}
                            <a href="#">
                                <i className="fa fa-tumblr"/>
                            </a>
                        </div>
                        <div>
                            <button type="button"
                                    onClick={fetchQuoteText}
                                    // style={{backgroundColor: data.color}}
                            >
                                New Quote
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/*</div>*/}

        </>
    );
}
export default RandomQuote;