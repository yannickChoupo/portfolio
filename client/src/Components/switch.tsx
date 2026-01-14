import $ from "jquery"
import React, { useEffect } from "react";

const Switch = ({ handleSwitchClick }: { handleSwitchClick: any }): React.ReactElement => {
    const switchTheme = () => {
        if (darkThmeIsActiv()) {
            console.log("Dark mode is activ");
            $(".switch__con .icon").toggleClass("light", false);
            $(".switch__con .icon").addClass("dark");
        } else {
            $(".switch__con .icon").toggleClass("dark", false);
            $(".switch__con .icon").addClass("light");
        }
        $("body").toggleClass("dark-mode");
        handleSwitchClick();
    }

    const darkThmeIsActiv = () => {
        return document.querySelector('body')?.className.includes("dark-mode") ?? false;
    }

    useEffect(() => {
        if (darkThmeIsActiv()) {
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

export default Switch;