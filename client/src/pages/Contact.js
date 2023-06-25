import React, {useState} from "react";
// import {Link} from 'react-scroll'
import $ from "jquery";
import {setInStorage, getFromStorage} from "../utils/storage";
const Contact = () => {
    const [message, setMessage] = useState("");
    const handleChange = () => {
        let textArea = $(".message-area");
        textArea.attr("rows", 2 + textArea.val().length / 28);
        setMessage(textArea.val());
        console.log("current message : ",message);
    }
    const saveMessage = () => {
        if(message) {
            let actualStorage = getFromStorage("main_storage");
            actualStorage.message = message;
            // console.log("local storage : ",actualStorage["visitor"].message);
            setInStorage("main_storage", actualStorage);
            setMessage("");
            // console.log("new storage value : ",localStorage);
        } else {
            console.log("no message")
        }
    }
    return (
        <>
<<<<<<< HEAD
            <div id="contact">
				<h2>CONTACT</h2>
				<section className="infos">
					<p>
						Email : <em>yannicknjilo@gmail.com</em>
					</p>
					<p>
						Phone : <em>(+49)17674543455</em>
					</p>
					<p>
						Github : <em>
							<a href="https://github.com/yannickChoupo">
								https://github.com/yannickChoupo
							</a>
						</em>
					</p>
					<p>
						Linkedin : <em>
							<a href="https://www.linkedin.com/in/yannick-njilo-794326205/">
								https://www.linkedin.com/in/yannick-njilo-794326205/
							</a>
						</em>
					</p>
				</section>
				<section>
					<h3> Drop a message</h3>
					<textarea className="message-area"
								name="message-area"
								placeholder="please consider living a message ...."
								onChange={handleChange}
								value={message}
								rows={2}>
					</textarea>
					{/*<section>*/}
					<button type="button" onClick={saveMessage}>send</button>
					{/*</section>*/}
				</section>
				{/*<Footer/>*/}
=======
            <div id="contact" className="page">
                <div className="page-container">
                    <h2>CONTACT</h2>
                    <section className="infos">
                        <p>
                            Email : <em>yannicknjilo@gmail.com</em>
                        </p>
                        <p>
                            Phone : <em>(+49)17668400227</em>
                        </p>
                        <p>
                            Github : <em>
                             <a href="https://github.com/yannickChoupo">
                                    https://github.com/yannickChoupo
                                </a>
                            </em>
                        </p>
                        <p>
                            Linkedin : <em>
                             <a href="https://www.linkedin.com/in/yannick-njilo-794326205/">
                                 https://www.linkedin.com/in/yannick-njilo-794326205/
                                </a>
                            </em>
                        </p>
                    </section>
                    <section>
                        <h3> Drop a message</h3>
                        <textarea className="message-area"
                                  name="message-area"
                                  placeholder="please consider living a message ...."
                                  onChange={handleChange}
                                  value={message}
                                  rows={2}>
                        </textarea>
                        {/*<section>*/}
                        <button type="button" onClick={saveMessage}>send</button>
                        {/*</section>*/}
                    </section>
                    {/*<Footer/>*/}
                </div>
>>>>>>> calculator
            </div>
        </>
    );
}
export default Contact;