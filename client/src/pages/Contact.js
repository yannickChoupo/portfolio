import React from "react";
import {Link} from 'react-scroll'
import $ from "jquery";
const Contact = () => {
    const handleChange = () => {
        let textArea = $(".message-area");
        let curText = textArea.val();
        // textArea.attr("height",3)
        textArea.attr("rows", 2 + textArea.val().length / 28);
        console.log(curText);
        console.log(textArea.val().length);
        console.log(textArea.attr("rows"));
    }

    return (
        <>
            <div id="contact" className="page contact">
                <div className="page-container body">
                    <section>
                        <h1>CONTACT ME!</h1>
                        <p>
                            i am available for werkstudent work
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
                            <button>send</button>
                        </section>
                    </section>
                    {/*<Footer/>*/}
                </div>
            </div>
        </>
    );
}
export default Contact;