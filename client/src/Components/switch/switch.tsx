import $ from "jquery"
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleHamburger } from "../../features/hamburgerSlice";
import { setDarkThemeIsActiv } from "../../features/themeslice";

const Switch = (): React.ReactElement => {
    const dispatch = useDispatch();

    const handleSwitchClick = () => {
        if (darkThemeIsActiv()) {
            $(".switch__con .icon").toggleClass("light", false);
            $(".switch__con .icon").addClass("dark");
            dispatch(setDarkThemeIsActiv(false))
            dispatch(toggleHamburger())
            $("body").toggleClass("dark-mode");


        } else {
            $(".switch__con .icon").toggleClass("dark", false);
            $(".switch__con .icon").addClass("light");
            dispatch(setDarkThemeIsActiv(true))
            dispatch(toggleHamburger())
            $("body").toggleClass("dark-mode");
        }
    }
    const darkThemeIsActiv = () => {
        return document.querySelector('body')?.className.includes("dark-mode") ?? false;
    }

    useEffect(() => {
        if (darkThemeIsActiv()) {
            $(".switch__con .icon").toggleClass("light", false);
            $(".switch__con .icon").addClass("dark");
        } else {
            $(".switch__con .icon").toggleClass("dark", false);
            $(".switch__con .icon").addClass("light");
        }
    }, [])

    return (
        <>
            <div className="switch" onClick={handleSwitchClick}>
                <div className="switch__con">
                    <span className={"icon"}>&#9788;</span>
                </div>
            </div>
        </>
    );
}

export default Switch;