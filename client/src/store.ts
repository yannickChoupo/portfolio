import { configureStore } from '@reduxjs/toolkit';
import hamburgerReducer from './features/hamburgerSlice';
import themeReducer from './features/themeslice';


const store = configureStore({
	reducer: {
		hamburger: hamburgerReducer,
		theme: themeReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
