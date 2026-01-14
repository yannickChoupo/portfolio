import React from "react";
import $ from 'jquery'

const Skills = [
    {
        technologie: "C/C++",
        description: "Developed object-oriented programming skills through a software development laboratory where I programmed a vacuum cleaner navigation system, mastering OOP fundamentals and memory management."
    },
    {
        technologie: "Java",
        description: "Gained proficiency through university coursework and professional experience at SyngenioAG, where I developed backend applications using Spring Boot with advanced security features and RESTful APIs."
    },
    {
        technologie: "JavaScript",
        description: "Expert in ES6+ syntax, object-oriented programming, asynchronous programming (AJAX, Promises), and D3.js for data visualization. Built multiple applications showcased in the demos section."
    },
    {
        technologie: "HTML5",
        description: "Proficient in semantic HTML5, accessibility standards, and building responsive layouts for landing pages, blogs, and complex web applications."
    },
    {
        technologie: "CSS3",
        description: "Advanced skills in CSS3 including animations, transitions, flexbox, grid, and responsive design. Experienced in building pixel-perfect, cross-browser compatible interfaces."
    },
    {
        technologie: "SASS/SCSS",
        description: "Preferred CSS preprocessor for complex projects. Expert in mixins, functions, variables, and modular architecture for scalable, maintainable stylesheets and multi-theme applications."
    },
    {
        technologie: "React",
        description: "Extensive experience building scalable frontend applications using React hooks, component composition, and performance optimization techniques. Several projects included in portfolio demos."
    },
    {
        technologie: "Bootstrap",
        description: "Familiar with Bootstrap framework for rapid prototyping and responsive design implementation."
    },
    {
        technologie: "jQuery",
        description: "Knowledgeable in jQuery for DOM manipulation and legacy codebase maintenance."
    },
    {
        technologie: "Redux",
        description: "Proficient in state management using Redux for complex applications. Implemented Redux for global state management on this portfolio website."
    },
    {
        technologie: "Express.js",
        description: "Built RESTful APIs and backend services using Express.js, including the backend architecture for this portfolio website with authentication and data persistence."
    },
    {
        technologie: "MongoDB",
        description: "Experience with NoSQL database design, CRUD operations, and MongoDB Atlas for cloud database management. Implemented database solutions for production applications."
    },
	{
        technologie: "WordPress",
        description: "Professional experience at SyngenioAG managing content, user permissions, and extending WordPress functionality through custom development."
    },
    {
        technologie: "PHP",
        description: "Developed custom WordPress plugins and themes at SyngenioAG, writing clean, maintainable PHP code following best practices."
    },
    {
        technologie: "SQL",
        description: "Solid foundation in relational database design, queries, joins, and optimization for MySQL and PostgreSQL."
    },
    {
        technologie: "Docker",
        description: "Proficient in containerization, writing Dockerfiles, docker-compose orchestration, and deploying containerized applications in production environments at SyngenioAG."
    },
	{
        technologie: "Kubernetes",
        description: "Understanding of container orchestration principles, cluster architecture, and deployment strategies for scalable applications."
    },
	{
        technologie: "Git",
        description: "Expert in version control workflows, branching strategies, merge conflict resolution, and collaborative development. Daily usage at SyngenioAG and personal projects."
    },
	{
        technologie: "Python",
        description: "Proficient in Python programming, algorithm development, data structures, and scripting for automation and data processing tasks."
    },
	{
        technologie: "Grafana",
        description: "Understanding of monitoring and visualization tools for application metrics, logging, and performance dashboards."
    },
	{
        technologie: "GitHub/GitLab",
        description: "Experienced with Git hosting platforms, CI/CD integration, issue tracking, and code review workflows. Active user of GitHub for personal projects and GitLab at SyngenioAG."
    },
	{
        technologie: "CI/CD",
        description: "Designed and maintained CI/CD pipelines at SyngenioAG using GitLab CI, ensuring automated testing, building, and deployment of features with continuous integration practices."
    },
	{
        technologie: "Agile/SCRUM",
        description: "Practical experience working in Agile teams at SyngenioAG, participating in sprint planning, daily standups, retrospectives, and delivering iterative value."
    }
]
const About = () => {
    const openDescription = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Find the closest li element
        const clickedLi = $(e.currentTarget).closest('li');
        const isActive = clickedLi.hasClass('active');
        
        // Close all active items
        $(".tech-skills .list li").removeClass("active");
        
        // Toggle the clicked item (if it wasn't active, make it active)
        if (!isActive) {
            clickedLi.addClass("active");
        }
    }
    return (
        <>
            <div id="about">
				<h2>
					About
				</h2>
				<section id="professional" className="about-section">
					<h3>Professional Experience</h3>
					<div className="body">
						<div className="period">
							<div className="years">
								<div className="from">November 2022</div>
								<div className="to">January 2026</div>
							</div>
							<div className="activity">
								<strong>Web Developer by Aonic GmbH</strong>
								<ul style={{ listStyleType: "disc" }}>
									<li>Developed and maintained modern UI components and frontend applications using contemporary web frameworks</li>
									<li>Built and integrated backend components and RESTful APIs for enterprise applications</li>
									<li>Worked extensively with Microsoft 365 ecosystem including SharePoint Online for collaboration solutions</li>
									<li>Deployed and managed cloud infrastructure on Microsoft Azure platform</li>
									<li>Developed low-code/no-code solutions using Power Apps and Power Platform to accelerate business processes</li>
									<li>Collaborated with cross-functional teams to deliver scalable enterprise solutions</li>
									<li>Implemented best practices for code quality, testing, and documentation</li>
								</ul>
							</div>
						</div>
						<div className="period">
							<div className="years">
								<div className="from">January 2022</div>
								<div className="to">November 2022</div>
							</div>
							<div className="activity">
								<strong>Software Developer (Working Student) by SyngenioAG</strong>
								<ul style={{ listStyleType: "disc" }}>
									<li>Developed and maintained backend applications using Spring Boot with advanced security features and authentication</li>
									<li>Designed and implemented CI/CD pipelines using GitLab CI for automated testing and deployment</li>
									<li>Managed WordPress content and user permissions, developing custom plugins and themes in PHP</li>
									<li>Worked in an Agile/SCRUM environment with regular sprint planning and retrospectives</li>
									<li>Utilized Docker for containerization and deployment of applications</li>
									<li>Collaborated with cross-functional teams using Git for version control and code reviews</li>
								</ul>
							</div>
						</div>
						<div className="period">
							<div className="years">
								<div className="from">2020</div>
								<div className="to">Present</div>
							</div>
							<div className="activity">
								<strong>Full-Stack Developer (Personal Projects)</strong>
								<div>Freelance/Portfolio Development</div>
								<ul>
									<li>Built and deployed full-stack portfolio website using React, Redux, Express.js, and MongoDB</li>
									<li>Implemented responsive designs with SASS/SCSS following BEM methodology</li>
									<li>Developed interactive data visualizations using D3.js for various projects</li>
									<li>Created containerized development and production environments using Docker</li>
									<li>Maintained code quality through version control with GitHub and comprehensive documentation</li>
								</ul>
							</div>
						</div>
					</div>
				</section>
				<section id="education" className="about-section">
					<h3>Education</h3>
					<div className="body">
						<div className="period">
							<div className="years">
								<div className="from">October 2015</div>
								<div className="to">Present</div>
							</div>
							<div className="activity">
								<strong>Bachelor of Science in Electrical Engineering</strong>
								<div>Ongoing studies focusing on embedded systems and software development</div>
							</div>
						</div>
						<div className="period">
							<div className="years">
								<div className="from">March 2015</div>
								<div className="to">July 2015</div>
							</div>
							<div className="activity">
								<strong>German Language Certification (C1 Level)</strong>
								<div>Studienkolleg Darmstadt, Germany</div>
							</div>
						</div>
						<div className="period">
							<div className="years">
								<div className="from">August 2014</div>
								<div className="to">March 2015</div>
							</div>
							<div className="activity">
								<strong>German Language Course</strong>
								<div>Goethe Institute, Yaoundé, Cameroon</div>
							</div>
						</div>
						<div className="period">
							<div className="years">
								<div className="from">October 2013</div>
								<div className="to">August 2014</div>
							</div>
							<div className="activity">
								<strong>German Language Course</strong>
								<div>Institute der Sicherste Weg, Yaoundé, Cameroon</div>
							</div>
						</div>
						<div className="period">
							<div className="years">
								<div className="from">October 2012</div>
								<div className="to">September 2013</div>
							</div>
							<div className="activity">
								<strong>Bachelor of Science in Mathematics (Incomplete)</strong>
								<div>University of Ngoa-Ekele, Yaoundé, Cameroon</div>
							</div>
						</div>
						<div className="period">
							<div className="years">
								<div className="from">July 2005</div>
								<div className="to">June 2012</div>
							</div>
							<div className="activity">
								<strong>High School Diploma</strong>
							</div>
						</div>
					</div>
				</section>
				<section id="skills" className="about-section">
					<h3>Skills</h3>
					<div className="body">
						<div className="languages">
							<div className="subtitle">Languages</div>
							<ul>
								<li><strong>French</strong> - Native speaker</li>
								<li><strong>German</strong> - C1 level (Professional working proficiency)</li>
								<li><strong>English</strong> - Professional working proficiency</li>
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