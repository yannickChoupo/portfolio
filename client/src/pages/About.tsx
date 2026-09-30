import { FontSizes } from "@fluentui/react";
import { ChevronDownRegular } from "@fluentui/react-icons";
import React from "react";

interface Skill {
    technologie: string;
    description: string;
}

const Skills: Skill[] = [
    {
        technologie: "C/C++",
        description:
            "Developed object-oriented programming skills during university coursework, including software development projects with a focus on OOP, memory management and structured program design."
    },
    {
        technologie: "Java",
        description:
            "Practical experience from SYNGENIO, including the development of web applications with Java and Spring Boot."
    },
    {
        technologie: "JavaScript",
        description:
            "Practical experience developing interactive web applications, asynchronous functionality and data visualizations with D3.js."
    },
    {
        technologie: "TypeScript",
        description:
            "Practical experience with TypeScript in React and SharePoint Framework projects, including component development and structured application code."
    },
    {
        technologie: "React",
        description:
            "Practical experience developing reusable frontend components and web applications with React, including professional SharePoint/SPFx projects and personal projects."
    },
    {
        technologie: "HTML5",
        description:
            "Experience building structured and responsive web interfaces using semantic HTML."
    },
    {
        technologie: "CSS3",
        description:
            "Experience implementing responsive interfaces, layouts and component styling using modern CSS."
    },
    {
        technologie: "SASS/SCSS",
        description:
            "Practical experience using SASS/SCSS for structured and maintainable frontend styling."
    },
    {
        technologie: "Bootstrap",
        description:
            "Experience using Bootstrap for responsive web interfaces and frontend development."
    },
    {
        technologie: "jQuery",
        description:
            "Experience with jQuery from web development projects and existing web applications."
    },
    {
        technologie: "Redux",
        description:
            "Experience with state management in React applications."
    },
    {
        technologie: "Spring Boot",
        description:
            "Practical backend development experience at SYNGENIO, including REST interfaces and web application development with Spring Boot."
    },
    {
        technologie: "REST APIs",
        description:
            "Experience designing and implementing REST interfaces in backend applications and integrating frontend applications with backend services."
    },
    {
        technologie: "Express.js",
        description:
            "Experience developing backend services and REST APIs with Node.js and Express.js for personal projects."
    },
    {
        technologie: "SQL",
        description:
            "Experience with relational databases and SQL queries, including database-oriented application development."
    },
    {
        technologie: "MongoDB",
        description:
            "Practical experience using MongoDB for personal full-stack applications and backend services."
    },
    {
        technologie: "SharePoint",
        description:
            "Professional experience developing and maintaining SharePoint solutions in an enterprise environment."
    },
    {
        technologie: "SPFx",
        description:
            "Professional experience developing SharePoint Framework solutions using React and TypeScript."
    },
    {
        technologie: "Microsoft Azure",
        description:
            "Practical experience supporting the setup and configuration of Microsoft Azure infrastructure."
    },
    {
        technologie: "Flutter",
        description:
            "Experience further developing and publishing a Flutter application for Android and iOS, including implementation of new functionality."
    },
    {
        technologie: "Docker",
        description:
            "Experience using Docker for containerized development and application environments."
    },
    {
        technologie: "Kubernetes",
        description:
            "Basic practical knowledge of Kubernetes and container orchestration."
    },
    {
        technologie: "Git",
        description:
            "Daily practical experience with Git for version control and collaborative software development."
    },
    {
        technologie: "GitHub/GitLab",
        description:
            "Experience using GitHub and GitLab for source control, project development and CI/CD workflows."
    },
    {
        technologie: "CI/CD",
        description:
            "Practical experience working with automated build, test and deployment workflows."
    },
    {
        technologie: "Python",
        description:
            "Experience using Python for programming, scripting and technical projects."
    },
    {
        technologie: "MATLAB",
        description:
            "University experience using MATLAB for engineering-related calculations, analysis and signal processing."
    },
    {
        technologie: "D3.js",
        description:
            "Experience creating interactive data visualizations with D3.js in personal web projects."
    },
    {
        technologie: "Agile/SCRUM",
        description:
            "Practical experience working in agile development environments, including requirements analysis, user stories and collaboration with project teams."
    }
];




const About: React.FC = () => {
    const openDescription = (e: React.MouseEvent<HTMLElement>): void => {
        e.preventDefault();
        e.stopPropagation();

        const target = e.currentTarget as HTMLElement;
        const clickedLi = target.closest('li') as HTMLElement;
        const isActive = clickedLi?.classList.contains('active');

        const listItems = document.querySelectorAll(".tech-skills .list li");
        listItems.forEach(item => item.classList.remove("active"));

        if (!isActive) {
            clickedLi?.classList.add("active");
        }
    }

    return (
        <main id="about" className="page">
            <h2>
                About
            </h2>
            <div id="profile" className="about-section">
                <h3>Profile</h3>

                <div className="body">
                    <p>
                        Electrical engineering student with
                        several years of practical experience
                        in software development and technical
                        environments. My experience covers
                        frontend and backend development,
                        enterprise applications, APIs and
                        software projects involving hardware
                        and digital systems.
                    </p>

                    <p>
                        I am particularly interested in the
                        intersection of software, electrical
                        systems, automation and technology.
                        Through university projects and
                        independent development, I enjoy
                        combining theoretical engineering
                        knowledge with practical software
                        development.
                    </p>
                </div>
            </div>
            {/* PROFESSIONAL EXPERIENCE */}
            <div
                id="professional"
                className="about-section"
            >
                <h3>Professional Experience</h3>

                <div className="body">
                    <div className="period">
                        <div className="years">
                            <div className="from">
                                December 2022
                            </div>
                            <div className="to">
                                December 2025
                            </div>
                        </div>

                        <div className="activity">
                            <strong>
                                Working Student – Digital
                                Workplace
                            </strong>

                            <div>
                                AONIC GmbH · Darmstadt
                            </div>

                            <ul>
                                <li>
                                    Developed and further
                                    developed SharePoint
                                    solutions using
                                    SharePoint Framework
                                    (SPFx)
                                </li>

                                <li>
                                    Developed frontend
                                    components with React
                                    and TypeScript
                                </li>

                                <li>
                                    Conceptualized and
                                    implemented backend
                                    services supporting
                                    SharePoint applications
                                </li>

                                <li>
                                    Supported the setup and
                                    configuration of
                                    Microsoft Azure
                                    infrastructure
                                </li>

                                <li>
                                    Analysed technical
                                    requirements together
                                    with project managers,
                                    consultants and
                                    developers
                                </li>

                                <li>
                                    Implemented customer
                                    requirements and
                                    developed alternative
                                    technical solutions
                                </li>

                                <li>
                                    Analysed errors,
                                    troubleshot applications
                                    and implemented further
                                    improvements
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="period">
                        <div className="years">
                            <div className="from">
                                February 2022
                            </div>
                            <div className="to">
                                October 2022
                            </div>
                        </div>

                        <div className="activity">
                            <strong>
                                Associate IT Consultant
                            </strong>

                            <div>
                                SYNGENIO AG · Cologne
                            </div>

                            <ul>
                                <li>
                                    Developed a web
                                    application for software
                                    assessment using React,
                                    Java and Spring Boot
                                </li>

                                <li>
                                    Implemented REST
                                    interfaces in the backend
                                </li>

                                <li>
                                    Developed a React-based
                                    dashboard for integration
                                    with WordPress
                                </li>

                                <li>
                                    Worked on user stories in
                                    an agile development
                                    environment
                                </li>

                                <li>
                                    Developed solutions both
                                    independently and as part
                                    of a team
                                </li>

                                <li>
                                    Analysed technical
                                    problems and developed
                                    structured solutions
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div id="professional" className="about-section">
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
            </div> */}
            <div id="education" className="about-section">
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
            </div>
            <div id="skills" className="about-section">
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
                                            <div className="arrow">
                                                <ChevronDownRegular
                                                    primaryFill="#6002ed"
                                                    fontSize={FontSizes.size20}
                                                    stroke=""
                                                />
                                            </div>
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
            </div>
        </main>
    );
}

export default About;
