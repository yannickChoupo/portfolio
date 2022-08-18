import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isOpen: false
};

const hamburgerSlice = createSlice({
	name: 'hamburger',
	initialState,
	reducers: {
		toggleHamburger: (state) => { state.isOpen = !state.isOpen }
	}
});

console.log(hamburgerSlice)

export const { toggleHamburger } = hamburgerSlice.actions;

export default hamburgerSlice.reducer;