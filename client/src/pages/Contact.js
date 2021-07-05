import React, {useState} from "react";
import {Link} from 'react-scroll'
import $ from "jquery";
import {setInStorage, getFromStorage} from "../utils/storage";
const Contact = () => {
    const [message, setMessage] = useState("");
    const handleChange = () => {
        let textArea = $(".message-area");
        let curText = textArea.val();
        // textArea.attr("height",3)
        textArea.attr("rows", 2 + textArea.val().length / 28);
        setMessage(textArea.val());
        console.log("current message : ",message);
    }
    const saveMessage = () => {
        if(message) {
            let actualStorage = getFromStorage("main_storage");
            actualStorage["visitor"].message = message;
            console.log("local storage : ",actualStorage["visitor"].message);
            setInStorage("main_storage", actualStorage);
            console.log("new storage value : ",localStorage);
        } else {
            console.log("no message")
        }
    }
    return (
        <>
            <div id="contact" className="page contact">
                <div className="page-container body">
                    <section>
                        <h1>CONTACT ME!</h1>
                        <p>
                            i am available for  working student jobs
                        </p>
                        <span><em>yannicknjilo@gmail.com</em></span>
                    </section>
                    <section>
                        <h2> Drop a message</h2>
                        <textarea className="message-area"
                                  name="message-area"
                                  placeholder="please consider living a message ...."
                                  onChange={handleChange}
                                  rows={2}>
                        </textarea>
                        <section>
                            <button type="button" onClick={saveMessage}>send</button>
                        </section>
                    </section>
                    {/*<Footer/>*/}
                </div>
            </div>
        </>
    );
}
export default Contact;