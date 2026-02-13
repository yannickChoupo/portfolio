import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
    darkThemeIsActiv: boolean;
}

const initialState: ThemeState = {
    darkThemeIsActiv: false
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        switchTheme: (state) => {
            state.darkThemeIsActiv = !state.darkThemeIsActiv;
        },
        setDarkThemeIsActiv: (state, action: PayloadAction<boolean>) => {
            state.darkThemeIsActiv = action.payload;
        }
    }
});

export const { setDarkThemeIsActiv, switchTheme } = themeSlice.actions;

export default themeSlice.reducer;
