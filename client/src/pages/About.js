import React from "react";
import $ from 'jquery'

const Skills = [
    {
        technologie: "C/C++",
        description: "Within the framework of a software development laboratory we hab to use C/C++ to programm a vaccum cleaner navigation and during it i learned the basics of object oriented programming."
    },
    {
        technologie: "Java",
        description: "I got my the first Java experiences while visiting and optional class from the university and had then to use Spring-boot in the framework of my job as working student by SyngenioAG to develop a backend application with some security features."
    },
    {
        technologie: "Javascript",
        description: "In the framework of a roadmap i followed i learned the ES6 synthax, object oriented programming using javascript, AJAX (Asynchronous javascript and XML) and D3(Javascript data visualisation framwork) and use it to build application on freecodecamp (some of them in demos)"
    },
    {
        technologie: "HTML",
        description: "I learned the basic building blocks possible and used it to build views like landing pages, tribute pages, Blog, ..."
    },
    {
        technologie: "CSS",
        description: "I had used it to give some more color the views like landing pages, tribute pages, Blog including adding responsiveness to them."
    },
    {
        technologie: "SASS",
        description: "Is prefered way to go when it is about building complex views needing more complex css selections or generate css to a multithemes views."
    },
    {
        technologie: "React",
        description: "I use it to build several frontend applications and i include some of them in the demo section"
    },
    {
        technologie: "Bootstrap",
        description: "I know the basic synthax but haven't jet use a lot."
    },
    {
        technologie: "Jquery",
        description: "I know the basic synthax and use it time to time depending on the situation."
    },
    {
        technologie: "Redux",
        description: "I am used with it and i use it to manage the global state on this website"
    },
    {
        technologie: "Express",
        description: "I use it to programme the backend of this website"
    },
    {
        technologie: "MongoDB",
        description: "I know the basic synthax and used mongodb-atlas as Database for this website."
    },
	{
        technologie: "Wordpress",
        description: "In the framework of my job as sofware developer by syngenioAG, i had to take care of content and user management."
    },
    {
        technologie: "PHP",
        description: "I know the basic synthax and had to write some line of it in the framework of my job as sofware developer by syngenioAG where i had to write custom code for some fonctionalities in wordpress."
    },
    {
        technologie: "SQL",
        description: "I know the basic synthax but haven't use it a lot."
    },
    {
        technologie: "Docker",
        description: "I went through the getting-started tutorial of Docker-Dektop and had to use in the framework of my job as sofware developer by syngenioAG."
    },
	{
        technologie: "kubernetes",
        description: "For the moment i went throught the basic working principles of a cluster but couldn't jet get a hands on."
    },
	{
        technologie: "GIT",
        description: "In the framework of my job as sofware developer by syngenioAG we have used git for the version control of the different sofware we worked on and i also use to manage the version of this website."
    },
	{
        technologie: "Python",
        description: "I have learned the basic synthax and used it to write some algorythm."
    },
	{
        technologie: "Grafana",
        description: "I haven't jet use it but have a basci understanding of how it works and how it could be use."
    },
	{
        technologie: "GITHUB/Gitlab",
        description: "I am using github to store te code for this website and had to use gitlab in the Framework of my job as working student by SyngenioAG."
    },
	{
        technologie: "CI/CD",
        description: "I the framework of my job as working student by SyngenioAG i hab the update and write pipelines to ensure a constant integration and development of the features w eadded to the program."
    },
	{
        technologie: "SCRUM",
        description: "I the framework of my job as working student by SyngenioAG we worked in agile way."
    }
]
const About = () => {
    const openDescription = (e) => {
        console.log("event target", e.target.parentNode.className);
		const activeListItem = $("li[class='active']");
		activeListItem.toggleClass("active");
        if(e.target.parentNode.className === "active") {
            $(e.target.parentNode).toggleClass("active");
        } else {
			$(e.target.parentNode).addClass("active")
		}
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
							<div className="subtitle">languages</div>
							<ul>
								<li>German (C1 level)</li>
								<li>English (safe to act)</li>
								<li>French (native speaker)</li>
							</ul>
						</div>
						<div className="tech-skills">
							<div className="subtitle">Technical skills</div>
							<ul className="list">
								{Skills.map(({ technologie, description }) => {
									return (
										<li 
											key={technologie}
											>
											<section className="header" 
														onClick={e => openDescription(e)}>
												<div className="language">{technologie}</div>
												<div className="arrow">→</div>
											</section>
											<section className="description">
												<em>
													{description}
												</em>
											</section>
										</li>
									)
								})}
							</ul>
						</div>
					</div>
				</section>
            </div>
        </>
    );
}
export default About;