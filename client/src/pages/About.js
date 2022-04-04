import React from "react";
import $ from 'jquery'
// import SideBar from "../Components/sidebar";

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
        if(e.target.parentNode.className == "active") {
            $(e.target.parentNode).toggleClass("active");
        } 
        const activeListItem = $("li[class='active']");
            activeListItem.toggleClass("active");
        }
    return (
        <>
            <div id="about" className="page">
                <div className="page-container">
                    <h2>
                        About
                    </h2>
                    <section id="education" className="about-section">
                        <h3>Education</h3>
                        <section className="body">
                            <section>
                                <span className="subtitle">
                                    <span className="from">october 2015</span>
                                    <span className="to">now</span>
                                </span>
                                <p>
                                    Bachelor of science electrical engineering
                                </p>
                            </section>
                            <section>
                                <span className="subtitle">
                                    <span className="from">march 2015</span>
                                    <span className="to"> july 1015 </span>
                                </span>
                                <p>
                                    German language course (C1)
                                </p>
                            </section>
                            <section>
                                <span className="subtitle">
                                    <span className="from">august 2014</span>
                                    <span className="to">march 2015</span>
                                </span>
                                <p>
                                    German language course  at the <strong>Goethe institute </strong>
                                    in Yaounde cameroon
                                </p>
                            </section>
                            <section>
                                <span className="subtitle">
                                    <span className="from">october 2013</span>
                                    <span className="to">august 2014</span>
                                </span>
                                <p>
                                    German language course at the <strong>Institute the Sicherste Weg </strong>
                                    in Yaounde Cameroon
                                </p>
                            </section>
                            <section>
                                <span className="subtitle">
                                    <span className="from">october 2012</span>
                                    <span className="to">september 2013</span>
                                </span>
                                <p>
                                    Bachelor of Science Mathematic at the university of <strong>Ngoa-Ekele </strong>in
                                    Yaounde Cameroon<br />
                                </p>
                            </section>
                            <section>
                                <span className="subtitle">
                                    <span className="from">july 2005</span>
                                    <span className="to"> june 2012</span>
                                </span>
                                <span className="subtitle"> <span className="until" /></span>
                                <p>
                                    High school
                                </p>
                            </section>
                            <section>
                                <span className="subtitle">
                                    <span className="from">july 2000</span>
                                    <span className="to"> june 2005</span>
                                </span>
                                <span className="subtitle"> <span className="until" /> </span>
                                <p>
                                    Primary school
                                </p>
                            </section>
                        </section>
                    </section>
                    <section id="skills" className="about-section">
                        <h3>Skills</h3>
                        <section className="body">
                            <section className="languages">
                                <h2 className="subtitle">languages</h2>
                                <ul>
                                    <li>German (C1 level)</li>
                                    <li>English (safe to act)</li>
                                    <li>French (native speaker</li>
                                </ul>
                            </section>
                            <section className="tech-skills">
                                <h2 className="subtitle">Technical skills</h2>
                                <section className="list">
                                    <h6>Software Development : </h6>
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
                                </section>
                                <section className="list">
                                    <h6>Project Management : </h6>
                                    <ul>
                                        <li>Git</li>
                                        <li>Github</li>
                                    </ul>
                                </section>
                                <section className="list">
                                    <h6>Other skills: </h6>
                                    <ul>
                                        <li> Microsoft office</li>
                                    </ul>
                                </section>
                            </section>
                        </section>
                    </section>
                </div>
            </div>
        </>
    );
}
export default About;