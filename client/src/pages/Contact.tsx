import React, { useState } from "react";
import { setInStorage, getFromStorage } from "../utils/storage";

const Contact: React.FC = () => {
    const [message, setMessage] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const textArea = e.currentTarget;
        const newValue = textArea.value;
        const rows = 2 + Math.floor(newValue.length / 28);
        textArea.rows = rows;
        setMessage(newValue);
    }

    const saveMessage = (): void => {
        if(message) {
            const actualStorage = getFromStorage("main_storage");
            if (actualStorage) {
                actualStorage.message = message;
                setInStorage("main_storage", actualStorage);
            }
            setMessage("");
        } else {
            console.log("no message")
        }
    }

    return (
        <>
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
					<button type="button" onClick={saveMessage}>send</button>
				</section>
            </div>
        </>
    );
}

export default Contact;
