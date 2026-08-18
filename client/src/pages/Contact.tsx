import React, { useState } from "react";
import AXIOS from "../redux/services/axios";

const Contact: React.FC = () => {
	const [message, setMessage] = useState<string>("");

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
		const textArea = e.currentTarget;
		const newValue = textArea.value;
		const rows = 2 + Math.floor(newValue.length / 28);
		textArea.rows = rows;
		setMessage(newValue);
	}

	const saveMessage = async (): Promise<void> => {
		if (message.trim()) {
			try {
				// Use the shared AXIOS instance (baseURL configured in redux/services/axios)
				const response = await AXIOS.post('/contact/', { text: message });
				if (response && response.status === 200) {
					console.log('saved message', response.data?.message || response.data);
					setMessage("");
				} else {
					console.error('error saving message', response?.data || response);
				}
			} catch (e) {
				console.error('network error', e);
			}
		} else {
			console.log("no message");
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
