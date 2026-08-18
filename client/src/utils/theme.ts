import { getFromStorage, setInStorage, removeInStorage } from "./storage";

export type ThemeMode = "light" | "dark";

const THEME_KEY = "themeMode";

/* ---------------------------
   Detect system preference
---------------------------- */
export function getSystemTheme(): ThemeMode {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

/* ---------------------------
   Get saved theme
---------------------------- */
export function getSavedTheme(): ThemeMode | null {
    return getFromStorage(THEME_KEY);
}

/* ---------------------------
   Apply theme to body
---------------------------- */
export function applyTheme(mode: ThemeMode) {
    document.body.classList.toggle("dark-mode", mode === "dark");
    document.documentElement.style.colorScheme = mode;
}

/* ---------------------------
   Initialize theme on app load
---------------------------- */
export function initTheme() {
    const saved = getSavedTheme();
    const theme = saved ?? getSystemTheme();
    applyTheme(theme);
}

/* ---------------------------
   Set & save user preference
---------------------------- */
export function setTheme(mode: ThemeMode) {
    setInStorage(THEME_KEY, mode);
    applyTheme(mode);
}

/* ---------------------------
   Reset to system preference
---------------------------- */
export function clearTheme() {
    removeInStorage(THEME_KEY);
    applyTheme(getSystemTheme());
}

/* ---------------------------
   Watch system changes (optional)
---------------------------- */
export function watchSystemTheme() {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    media.addEventListener("change", () => {
        if (getSavedTheme() !== null) return; // user override exists
        applyTheme(media.matches ? "dark" : "light");
    });
}