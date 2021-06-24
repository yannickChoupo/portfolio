import React from "react";

const About = () => {
    // const {curTheme} = useGlobalThemeContext();
    return (
        <>
            {/*<CSSTransition>*/}
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
                                    studying electrical engineering<br/>
                                    bachelor of engineering
                                </p>
                            </section>
                            <section>
                                <span className="subtitle">
                                    <span className="from">march 2015</span>
                                    <span className="to"> july 1015 </span>
                                </span>
                                <p>
                                    german courses to prepare for university language
                                    entry test at the technical university of darmstadt studienkolleg<br/>
                                    certification for c1 language level
                                </p>
                            </section>
                            <section>
                                  <span className="subtitle">
                                    <span className="from">august 2014</span>
                                    <span className="to">march 2015</span>
                                  </span>
                                <p>
                                    german courses at the <strong>Goethe institut </strong>
                                    in Yaounde cameroon<br/>
                                </p>
                            </section>
                            <section>
                                 <span className="subtitle">
                                    <span className="from">october 2013</span>
                                    <span className="to">august 2014</span>
                                  </span>
                                <p>
                                    german courses at the <strong>sicherste Weg institut</strong> institut
                                    in Yaounde cameroon <br/>
                                    certification for german B2 level
                                </p>
                            </section>
                            <section>
                                <span className="subtitle">
                                    <span className="from">october 2012</span>
                                    <span className="to">september 2013</span>
                                  </span>
                                <p>
                                    study mathematic at the university of <strong>Ngoa-Ekele </strong>in
                                    yaounde cameroon<br/>
                                </p>
                            </section>
                            <section>
                                 <span className="subtitle">
                                    <span className="from">july 2005</span>
                                    <span className="to"> june 2012</span>
                                  </span>
                                <span className="subtitle"> <span className="until"/></span>
                                <p>
                                    high school<br/>
                                    high school diploma
                                </p>
                            </section>
                            <section>
                                  <span className="subtitle">
                                    <span className="from">july 2000</span>
                                    <span className="to"> june 2005</span>
                                  </span>
                                <span className="subtitle"> <span className="until"/> </span>
                                <p>
                                    primary school<br/>
                                    primary school diploma
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
                                    <li>French </li>
                                </ul>
                            </section>
                            <section className="tech-skills">
                                <h2 className="subtitle">Technical skills</h2>
                                <section className="list">
                                    <h6>programing languages : </h6>
                                    <ul>
                                        <li>C/C++</li>
                                        <li>Java</li>
                                        <li>Python</li>
                                        <li>Javascript (ES6, AJAX, D3),</li>
                                    </ul>
                                </section>
                                <section className="list">
                                    <h6>Front End : </h6>
                                    <ul>
                                        <li>HTML5,</li>
                                        <li>CSS,</li>
                                        <li>Javascript (ES6, AJAX, D3),</li>
                                        <li>SASS,</li>
                                        <li>ReactJS,</li>
                                        <li>Bootstrap,</li>
                                        <li>Jquery,</li>
                                        <li>Redux,</li>
                                    </ul>
                                </section>
                                <section className="list">
                                    <h6>Backend : </h6>
                                    <ul>
                                        <li>PHP,</li>
                                        <li>MySQL,</li>
                                        <li>Express,</li>
                                        <li>MongoDb,</li>
                                    </ul>
                                </section>
                            </section>
                        </section>
                    </section>
                </div>
            </div>
            {/*</CSSTransition>*/}

        </>
    );
}
export default About;