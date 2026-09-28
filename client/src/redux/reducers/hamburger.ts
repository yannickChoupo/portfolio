import { createSlice } from "@reduxjs/toolkit";

interface HamburgerState {
    isOpen: boolean;
}

const initialState: HamburgerState = {
    isOpen: false,
};

const hamburgerSlice = createSlice({
    name: "hamburger",

    initialState,

    reducers: {
        toggleHamburger(state) {
            state.isOpen = !state.isOpen;
        },

        openHamburger(state) {
            state.isOpen = true;
        },

        closeHamburger(state) {
            state.isOpen = false;
        },
    },
});

export const {
    toggleHamburger,
    openHamburger,
    closeHamburger,
} = hamburgerSlice.actions;

export default hamburgerSlice.reducer;