import { configureStore } from '@reduxjs/toolkit';
import hamburgerReducer from './features/hamburger/hamburgerSlice';

const store = configureStore({
	reducer: {
		hamburger: hamburgerReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
