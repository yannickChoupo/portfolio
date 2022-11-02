import { configureStore } from '@reduxjs/toolkit';
import hamburgerReducer from './features/hamburger/hamburgerSlice';

const store = configureStore({
	reducer: {
		hamburger: hamburgerReducer,
	},
});

export default store;