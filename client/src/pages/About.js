import React from "react";
import $ from 'jquery'

const Skills = [
    {
        language: "C/C++",
        description: "I am used with the basic synthax up to object oriented programming and it is the mean language a " +
            "university laboratory"
    },
    {
        language: "Java",
        description: "I learned the basics synthax but haven't jet use it"
    },
    {
        language: "Javascript",
        description: "I am used with the basic synthax up to ES6, object oriented programming " +
            "AJAX (Asynchronous javascript and XML) and D3(Javascript data visualisation) and use it to build several" +
            "code to solve challenges on freecodecamp (some of them in demos)"
    },
    {
        language: "HTML",
        description: "I am used with it and i used to build views like landing pages, tribute pages, Blog, ..."
    },
    {
        language: "CSS",
        description: "I am used with it and i used it to build views like landing pages, tribute pages," +
            " Blog, to build this website which is fully responsive"
    },
    {
        language: "SASS",
        description: "I use it to generate all the CSS of this website and also play around with it by " +
            "generating CSS for to provide diferent themes "
    },
    {
        language: "React",
        description: "I use it to build several frontend and i include some of them in the demo section"
    },
    {
        language: "Bootstrap",
        description: "I know the basic synthax i haven't jet use a lot because a thought throught a better" +
            "understanding of CSS i will be able to better use bootstrap in better way."
    },
    {
        language: "Jquery",
        description: "I know the basic synthax i use at some point depending on the situation"
    },
    {
        language: "Redux",
        description: "I am used with it and i use it to manage the global state and some component state on this website"
    },
    {
        language: "Express",
        description: "I use to programme the backend of this website"
    },
    {
        language: "MongoDb",
        description: "I know the basic synthax and i use it as Database for this website"
    },
    {
        language: "PHP",
        description: "i know the basic synthax and i actually using it to build the backend of a worpress website"
    },
    {
        language: "SQL",
        description: "I know the basic synthax and i actually using it to build the backend of a worpress website"
    },
    {
        language: "Docker",
        description: "I know the basic synthax and i went through the getting-started tutorial of Docker-Dektop and" 
         + "i am actually Dockerizing this website"
    }
]
const About = () => {
    const openDescription = (e) => {
        console.log("event target", e.target.parentNode.className);
        if(e.target.parentNode.className === "active") {
            $(e.target.parentNode).toggleClass("active");
        } 
        const activeListItem = $("li[class='active']");
            activeListItem.toggleClass("active");
        }
    return (
        <>
            <div id="about">
				<h2>
					About
				</h2>
				<section id="education" className="about-section">
					<h3>Education</h3>
					<div className="body">
						<div className="period">
							<div className="years">
								<div className="from">October 2015</div>
								<div className="to">Now</div>
							</div>
							<div className="activity">
								Bachelor of science electrical engineering
							</div>
						</div>
						<div className="period">
							<div className="years">
								<div className="from">march 2015</div>
								<div className="to">july 1015</div>
							</div>
							<div className="activity">
								German language courses (C1)
							</div>
						</div>
						<div className="period">
							<div className="years">
								<div className="from">august 2014</div>
								<div className="to">march 2015</div>
							</div>
							<div className="activity">
								German language course  at the <strong>Goethe institute </strong>
								in Yaounde cameroon
							</div>
						</div>
						<div className="period">
							<div className="years">
								<div className="from">october 2013</div>
								<div className="to">august 2014</div>
							</div>
							<div className="activity">
							German language course at the <strong>Institute the Sicherste Weg </strong>
								in Yaounde Cameroon
							</div>
						</div>
						<div className="period">
							<div className="years">
								<div className="from">october 2012</div>
								<div className="to">september 2013</div>
							</div>
							<div className="activity">
							Bachelor of Science Mathematic at the university of <strong>Ngoa-Ekele </strong>in
								Yaounde Cameroon
							</div>
						</div>
						<div className="period">
							<div className="years">
								<div className="from">july 2005</div>
								<div className="to">june 2012</div>
							</div>
							<div className="activity">
							High school
							</div>
						</div>
						<div className="period">
							<div className="years">
								<div className="from">july 2000</div>
								<div className="to">june 2005</div>
							</div>
							<div className="activity">
							Primary school
							</div>
						</div>
						<div className="period">
							<div className="years">
								<div className="from">july 2000</div>
								<div className="to">june 2005</div>
							</div>
							<div className="activity">
								Primary school
							</div>
						</div>
					</div>
				</section>
				<section id="skills" className="about-section">
					<h3>Skills</h3>
					<div className="body">
						<div className="languages">
							<h2 className="subtitle">languages</h2>
							<ul>
								<li>German (C1 level)</li>
								<li>English (safe to act)</li>
								<li>French (native speaker)</li>
							</ul>
						</div>
						<div className="tech-skills">
							<h2 className="subtitle">Technical skills</h2>
							<div className="list">
								<div className="header">Software Development : </div>
								<ul className="software-skills">
									{Skills.map(({ language, description }) => {
										return (
											<li key={language}
												onClick={e => openDescription(e)}>
												<section className="header" >
													<div className="language">{language}</div>
													<div className="arrow">→</div>
												</section>
												<p className="description">
													<em>
														{description}
													</em>
												</p>
											</li>
										)
									})}
								</ul>
							</div>
							<section className="list">
								<div className="header">Project Management : </div>
								<ul>
									<li>Git</li>
									<li>Github</li>
								</ul>
							</section>
							<section className="list">
								<div className="header">Other skills: </div>
								<ul>
									<li> Microsoft office</li>
								</ul>
							</section>
						</div>
					</div>
				</section>
            </div>
        </>
    );
}
export default About;