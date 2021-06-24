import React, {useState} from 'react';
export const RandomQuote = () => {
    const [data, setData] = useState({author: "", text: "", color: ""});
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const fetchQuoteText = async () => {
        const req = new XMLHttpRequest();
        let newQuote = {};
        req.open("GET", "https://goquotes-api.herokuapp.com/api/v1/random?count=1", true);
        req.send();
        req.onload = () => {
            const json = JSON.parse(req.response);
            const {quotes: data} = json;
            newQuote = data[0];
            newQuote.color = getRandomColor();
            setData(newQuote);
        }
    }
    return (
        <>
            <div id="randomQuote" className="project" style={{backgroundColor: data.color}}>
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
                            <a style={{backgroundColor: data.color}} href="#">
                                <i className="fa fa-twitter"/>
                            </a>
                            <a style={{backgroundColor: data.color}} href="#">
                                <i className="fa fa-tumblr"/>
                            </a>
                        </div>
                        <div>
                            <button type="button"
                                    onClick={fetchQuoteText}
                                    style={{backgroundColor: data.color}}>
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