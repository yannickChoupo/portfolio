import $ from "jquery"
// import React, {useEffect,useState} from 'react';

export const Switch = ({handleSwitchClick}) => {
    const switchThemePosition = () => {
        $(".switch__round").toggleClass("p-left");
        $(".grid").toggleClass("dark-mode");
        handleSwitchClick();
    }
    return (
        <>
            <div className="switch" onClick={switchThemePosition}>
                <div className="switch__con">
                    <div className="switch__round p-left"/>
                </div>
            </div>
        </>
    );
}