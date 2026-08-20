import { configureStore } from '@reduxjs/toolkit';
import hamburgerReducer from './features/hamburgerSlice';
import themeReducer from './features/themeslice';
import privacyReducer from './features/privacySlice';



const store = configureStore({
	reducer: {
		hamburger: hamburgerReducer,
		theme: themeReducer,
		privacy: privacyReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
