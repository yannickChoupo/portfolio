import React from "react";
import { NavLink } from "react-router-dom";

const Home: React.FC = () => (
    <main id="home">
        <section className="home-hero" aria-labelledby="home-title">
            <div className="home-hero-copy">
                <p className="eyebrow">Electrical Engineering · Software · IoT</p>
                <h1 id="home-title">Hi, I’m Yannick.</h1>
                <p className="hero-lead">
                    I’m an Electrical Engineering student and software developer building connected systems
                    with Flutter, TypeScript, PostgreSQL, ESP32, and IoT.
                </p>
                <p className="hero-statement">
                    I turn real-world problems into practical software and hardware solutions.
                </p>
                <div className="hero-actions" aria-label="Primary links">
                    <NavLink className="home-button primary" to="/works">Explore my work</NavLink>
                    <NavLink className="home-button" to="/works/iot-attendance">View Union</NavLink>
                    <NavLink className="home-button" to="/contact">Contact me</NavLink>
                </div>
            </div>
            <div className="home-portrait" role="img" aria-label="Portrait of Yannick" />
        </section>

        <div className="home-content">
            <section aria-labelledby="about-heading">
                <p className="section-kicker">About me</p>
                <h2 id="about-heading">Engineering connected systems</h2>
                <p>
                    I’m an Electrical Engineering student specializing in <strong>Systems Automation</strong> at{" "}
                    <strong>Darmstadt University of Applied Sciences</strong>, with practical experience in
                    software development, embedded systems, IoT, and project management.
                </p>
                <p>
                    I enjoy developing solutions that connect software, hardware, and real-world needs. My
                    interests include digitalization, process automation, system integration, and using
                    technology to improve how people work, organize, and collaborate.
                </p>
            </section>

            <section className="featured-project" aria-labelledby="union-heading">
                <div>
                    <p className="section-kicker">Featured project</p>
                    <h2 id="union-heading">What I’m currently building: Union</h2>
                    <p>
                        Union is a full-stack and IoT platform that began as a solution for organizing
                        activities within our football group. It combines a cross-platform Flutter application,
                        a TypeScript backend with PostgreSQL, and an ESP32-based NFC device.
                    </p>
                    <NavLink className="text-link" to="/works/iot-attendance">
                        Read the Union case study <span aria-hidden="true">→</span>
                    </NavLink>
                </div>
                <ul className="capability-list">
                    <li>Authentication, events, attendance, and task management</li>
                    <li>ESP32 NFC device and a digital device twin</li>
                    <li>Docker-based development and deployment workflows</li>
                    <li>Requirements, architecture, testing, and iteration planning</li>
                </ul>
            </section>

            <section aria-labelledby="motivation-heading">
                <p className="section-kicker">Product thinking</p>
                <h2 id="motivation-heading">From a problem to a working product</h2>
                <p>
                    Through Union, I work across the complete product-development process—from identifying a
                    problem and defining requirements to designing the architecture, implementing features,
                    testing integrations, and planning future iterations.
                </p>
                <p>
                    My longer-term vision is to explore how digital platforms can help people with different
                    backgrounds collect ideas, identify shared interests, make transparent decisions, and turn
                    those decisions into coordinated action.
                </p>
            </section>

            <section aria-labelledby="background-heading">
                <p className="section-kicker">Background</p>
                <h2 id="background-heading">A cross-disciplinary perspective</h2>
                <p>
                    Alongside my studies, I have independently developed skills in web and software development.
                    I apply them through Union, this portfolio, and several{" "}
                    <NavLink className="text-link" to="/works">smaller applications</NavLink>.
                </p>
                <p>
                    Originally from Cameroon and now living in Germany, I am particularly interested in
                    intercultural collaboration and technology that contributes to social and economic development.
                </p>
            </section>

            <section className="opportunities" aria-labelledby="connect-heading">
                <p className="section-kicker">Let’s connect</p>
                <h2 id="connect-heading">Open to working-student and entry-level opportunities</h2>
                <p>I’m interested in roles involving:</p>
                <ul>
                    <li>Software Engineering</li>
                    <li>Full-Stack Development</li>
                    <li>IoT and Embedded Systems</li>
                    <li>Systems Automation</li>
                    <li>Technical Product Development</li>
                </ul>
                <p>
                    If you would like to discuss a project, exchange ideas, or explore an opportunity to work
                    together, <NavLink className="text-link" to="/contact">get in touch</NavLink>.
                </p>
            </section>
        </div>
    </main>
);

export default Home;
