import React, {useEffect} from 'react';
// import $ from "jquery"
export const Footer = () => {
    useEffect(()=>{
        // $("footer").toggleClass("scale-0")
    })
    return (
        <footer className="footer" >
            <div className="">
                <ul className="d-Flex">
                    <li>
                        <a className="social__icon" href="https://github.com/yannickChoupo">
                            <i className="fa fa-github"/>
                        </a>
                    </li>
                    <li>
                        <a className="social__icon" href="https://www.linkedin.com/in/yannick-njilo-794326205/">
                            <i className="fa fa-linkedin"/>
                        </a>
                    </li>
                </ul>
                {/*<small className="d-Flex-center">&copy; Copyright 2021, yannick Njilo</small>*/}
            </div>
        </footer>
    );
}

export default Footer;