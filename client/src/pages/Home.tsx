import React from "react";
import {  NavLink } from "react-router-dom";

const Home: React.FC = () => {
	return (
		<div id="home">
			<section className="home-header d-flex justify-content-center">
				<div className="image" />
			</section>
			<section className="home-body text-center fs-3 pt-5 l">
				<p>
					Hi, I’m Yannick — great to have you here!
				</p>
				<p>
					I’m passionate about <strong>digitalization</strong> and the endless possibilities technology
					creates to improve the way we live, work, and connect.
				</p>
				<p>
					I’m fascinated by digital systems can transform industries,
					automate processes, and turn ideas into impactful solutions.<br />
				</p>
				<p>
					Currently, I’m studying Electrical Engineering with a focus on
					<strong>Systems Automation</strong> at the
					<strong>darmstadt university of applied sciences</strong><br />
					Throughout my studies, I’ve developed a strong technical
					foundation in engineering principles, automation, and system design.
				</p>
				<p>
					Alongside my academic path, I’ve built solid skills in web development and
					project management. Driven by curiosity and personal interest,
					I’ve learned various web technologies and applied them in
					practical projects — including this website and several<NavLink
						className="p-link"
						to='works'>
						{/* <em>Demos</em> */}
						smaller applications
					</NavLink>.
				</p>
				<p>
					I enjoy combining technical knowledge with structured planning to turn concepts
					into real, functional solutions.
				</p>
				<p>
					I’m always eager to learn, grow, and collaborate with others who share
					a passion for innovation and technology.
					If you’d like to connect, exchange ideas, or work together on exciting projects,
					feel free to reach out.<br />
					Looking forward to hearing from you! 🚀
				</p>
			</section>
		</div >
	);
};

export default Home;
