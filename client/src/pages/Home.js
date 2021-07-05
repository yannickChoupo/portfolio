import React from "react";
import {BrowserView, MobileView} from 'react-device-detect';
import {Link} from 'react-scroll';
import {NavLink} from "react-router-dom";

const Home = () => {

    return (
        <>
            <div id="home" className="page home">
                <div className="page-container">
                    <section className="header">
                        <div className="image"/>
                    </section>
                    <section className="content home-body ">
                        <p>
                            Hey there I´m <strong>Yannick</strong>,<br/>
                            web developer <br/>
                            currently living in
                            <strong> Darmstadt,</strong><br/>
                            where i am studying <strong>electrical engineering </strong>
                            with a focus on systems automation at University of Darmstadt.<br/>
                        </p>
                        <p>
                            Through my personal interest <br/>
                            for interaction between full-stack application and embedded systems <br/>
                            i learned different web technologies <br/>
                            most of the time on google or websites like
                            <a href="https://freecodecamp.org"> freecodecamp </a><br/>
                            where i usually read articles and complete challenges
                            here are some of them<br/>
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
                            I don't any professional experience and i looking for some.
                        </p>
                        <p>
                            please consider before leaving me a message for if you have
                            any advices you can give me to for improve.

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