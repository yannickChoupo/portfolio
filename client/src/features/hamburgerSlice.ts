import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HamburgerState {
	isOpen: boolean;
}

const initialState: HamburgerState = {
	isOpen: false
};

const hamburgerSlice = createSlice({
	name: 'hamburger',
	initialState,
	reducers: {
		toggleHamburger: (state) => {
			state.isOpen = !state.isOpen;
		},
		setHamburgerOpen: (state, action: PayloadAction<boolean>) => {
			state.isOpen = action.payload;
		}
	}
});

export const { toggleHamburger, setHamburgerOpen } = hamburgerSlice.actions;

export default hamburgerSlice.reducer;
