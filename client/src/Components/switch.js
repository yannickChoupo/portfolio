import $ from "jquery"
import React, { useEffect } from "react";

export const Switch = ({handleSwitchClick}) => {
    const switchTheme = () => {
        $("body").toggleClass("dark-mode");
        handleSwitchClick();
    }

	const darkThmeIsActiv = () => {
        return document.querySelector('body').className.includes("dark-mode");
	}

    useEffect(() => {
        if(darkThmeIsActiv()) {
            console.log("Dark mode is activ");
            $(".switch__con .icon").toggleClass("light", false);
            $(".switch__con .icon").addClass("dark");
        } else {
            $(".switch__con .icon").toggleClass("dark", false);
            $(".switch__con .icon").addClass("light");
        }
    }, [])
    return (
        <>
            <div className="switch" onClick={switchTheme}>
                <div className="switch__con">
					<span className={"icon"}>&#9788;</span>
                </div>
            </div>
        </>
    );
}