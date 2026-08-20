import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleHamburger } from "../../features/hamburgerSlice";
import { setDarkThemeIsActiv } from "../../features/themeslice";
import {
  getSavedTheme,
  getSystemTheme,
  setTheme,
  applyTheme
} from "../../utils/theme";
import type { RootState } from "../../store";

const Switch = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.hamburger);
  const darkMode = useSelector((state: RootState) => state.theme.darkThemeIsActiv);

  const handleSwitchClick = () => {
    const nextDark = !darkMode;

    // save + apply theme
    setTheme(nextDark ? "dark" : "light");

    // update redux
    dispatch(setDarkThemeIsActiv(nextDark));

    // close hamburger if open
    if (isOpen) dispatch(toggleHamburger());
  };

  // On mount: initialize theme
  useEffect(() => {
    const saved = getSavedTheme();
    const initial = saved ?? getSystemTheme();

    applyTheme(initial);
    dispatch(setDarkThemeIsActiv(initial === "dark"));
  }, [dispatch]);

  return (
    <div className="switch" onClick={handleSwitchClick}>
      <div className="switch__con">
        <span className={`icon ${darkMode ? "dark" : "light"}`}>
          {darkMode ? "🌙" : "☀️"}
        </span>
      </div>
    </div>
  );
};

export default Switch;