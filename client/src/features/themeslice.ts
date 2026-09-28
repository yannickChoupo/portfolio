import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
    darkThemeIsActive: boolean;
}

const initialState: ThemeState = {
    darkThemeIsActive: false,
};

const themeSlice = createSlice({
    name: "theme",

    initialState,

    reducers: {
        switchTheme: (state) => {
            state.darkThemeIsActive =
                !state.darkThemeIsActive;
        },

        setDarkThemeIsActive: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.darkThemeIsActive =
                action.payload;
        },
    },
});

export const {
    setDarkThemeIsActive,
    switchTheme,
} = themeSlice.actions;

export default themeSlice.reducer;