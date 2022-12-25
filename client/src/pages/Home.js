import React from "react";
import { Link, NavLink } from "react-router-dom";

const Home = () => {
	
	return (
		<>
			<div id="home">
				<section className="home-header d-flex justify-content-center">
					<div className="image" />
				</section>
				<section className="home-body text-center fs-3 pt-5">
					<p>
						Hey there I´m <strong>Yannick</strong>,<br />
						web developer <br />
						currently living in
						<strong> Darmstadt,</strong><br />
						where i am studying <strong>electrical engineering </strong><br/>
						with a focus on systems automation at University of Darmstadt.<br />
					</p>
					<p>
						Through my personal interest <br />
						for web development <br />
						i learned different web technologies <br />
						most of the time on google or websites like
						<a href="https://freecodecamp.org"> freecodecamp </a><br />
						where i usually read articles and complete challenges.<br />
						I have used some of the technologies i learned <br/>
						to build this website and some small application<br />
						here are some of them <br />
					</p>
					<NavLink
						className="p-link"
						activclassname="active"
						to='works'>
						<em>Demos</em>
					</NavLink>
					<p>
						I haven't jet got the opportunity to work in a professional Team<br />
						For the moment just with friends <br/>
						and i am looking for an opportunity to use the skills i earned in a <br />
						more productive way.
					</p>
					<p>
						I am really enjoying learn new things myself and also from others<br />
						so please if you have any advices that might help me to improve<br />
						consider leaving me a message.
					</p>
					<Link
						className="p-link"
						activclassname="active"
						to='contact'>
						<em>Drop a Message</em>
					</Link>
				</section>
			</div>
		</>
	);
}

export default Home;