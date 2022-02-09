import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toggleHamburger } from "../../redux/actions/hamburger";
import $ from 'jquery';


const Hamburger = (props) => {
    const dispatch = useDispatch();
    const { isOpen } = useSelector(state => state.hamburger);

    const switchMode = () => {
        dispatch(toggleHamburger());
    }

    return (
        <>
            <div
                className={`hamburger ${!isOpen ? "hamburger--open" : "hamburger--close active"} `}
                onClick={switchMode}>
                <div className={`hamburger__line`} />
            </div>
        </>
    );
}

export default Hamburger;