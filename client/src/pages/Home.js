import React from "react";
import { BrowserView, MobileView } from 'react-device-detect';
import { NavLink } from "react-router-dom";

const Home = () => {

    return (
        <>
            <div id="home" className="page home">
                <div className="page-container">
                    <section className="header">
                        <div className="image" />
                    </section>
                    <section className="content home-body ">
                        <p>
                            Hey there I´m <strong>Yannick</strong>,<br />
                            web developer <br />
                            currently living in
                            <strong> Darmstadt,</strong><br />
                            where i am studying <strong>electrical engineering </strong>
                            with a focus on systems automation at University of Darmstadt.<br />
                        </p>
                        <p>
                            Through my personal interest <br />
                            for web development <br />
                            i learned different web technologies <br />
                            most of the time on google or websites like
                            <a href="https://freecodecamp.org"> freecodecamp </a><br />
                            where i usually read articles and complete challenges.<br />
                            I have used some of the technologies i learned to build this website and some small application<br />
                            here are some of them <br />
                        </p>
                        <BrowserView>
                            <NavLink
                                className="p-link"
                                activclassname="active"
                                to='work'>
                                <em>Demos</em>
                            </NavLink>
                        </BrowserView>
                        <MobileView>
                            <Link title="message"
                                className="p-link"
                                to="work"
                                spy={true}
                                smooth={true}
                                duration={500}>
                                <em>Demos</em>
                            </Link>
                        </MobileView>
                        <p>
                            I haven't jet got the opportunity to work in a professional Team<br />
                            For the moment just with friends and i am looking for an opportunity to use the skills i earned in a <br />
                            more productive way.
                        </p>
                        <p>
                            I am really enjoying learn new things myself and also from others<br />
                            so please if you have any advices to help me to improve consider leaving me a message.
                        </p>
                        <BrowserView>
                            <NavLink
                                className="p-link"
                                activclassname="active"
                                to='contact'>
                                <em>Drop a Message</em>
                            </NavLink>
                        </BrowserView>
                        <MobileView>
                            <Link title="message"
                                className="p-link"
                                to="contact"
                                spy={true}
                                smooth={true}
                                duration={500}>
                                <em>Drop a Message</em>
                            </Link>
                        </MobileView>

                    </section>
                </div>
            </div>

        </>
    );
}
// {/*    <div className="contact">*/}
// {/*        <h5>Contact me </h5>*/}
// {/*        <div className="contact_card">*/}
// {/*            <span>email : yannicknjilo@gmail.com</span>*/}
// {/*            <span>phone : 017637424182 </span>*/}
// {/*            <span>linkin : linkedin.com/in/yannick-njilo-794326205</span>*/}
// {/*        </div>*/}
// {/*    </div>*/}
export default Home;