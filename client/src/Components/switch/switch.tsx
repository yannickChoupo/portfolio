import $ from "jquery";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleHamburger } from "../../features/hamburgerSlice";
import { setDarkThemeIsActiv } from "../../features/themeslice";
import { RootState } from "../../store";

const Switch = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.hamburger);

  const darkThemeIsActiv = () =>
    document.querySelector("body")?.className.includes("dark-mode") ?? false;

  const setIcon = (isDark: boolean) => {
    if (isDark) {
      $(".switch__con .icon").toggleClass("light", false).addClass("dark");
    } else {
      $(".switch__con .icon").toggleClass("dark", false).addClass("light");
    }
  };

  const handleSwitchClick = () => {
    const nextDark = !darkThemeIsActiv();

    // update icon
    setIcon(nextDark);

    // update redux theme state
    dispatch(setDarkThemeIsActiv(nextDark));

    // toggle body class
    $("body").toggleClass("dark-mode");

    // ✅ toggle hamburger only if necessary (close it if open)
    if (isOpen) {
      dispatch(toggleHamburger());
    }
  };

  useEffect(() => {
    // set correct icon on mount based on current body class
    setIcon(darkThemeIsActiv());
  }, []);

  return (
    <div className="switch" onClick={handleSwitchClick}>
      <div className="switch__con">
        <span className="icon">&#9788;</span>
      </div>
    </div>
  );
};

export default Switch;
