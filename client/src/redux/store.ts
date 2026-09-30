import { configureStore } from "@reduxjs/toolkit";

import projectReducer from "./reducers/projectReducer";
import requirementReducer from "./reducers/requirementReducer";
import todoReducer from "./reducers/todoReducer";
import messageReducer from "./reducers/messageReducer";
import visitorReducer from "./reducers/visitorReducer";
import hamburgerReducer from "./reducers/hamburger";
import themeReducer from "./reducers/themeReducer";

import privacyReducer from "../features/privacySlice";

export const store = configureStore({
    reducer: {
        projects: projectReducer,
        requirements: requirementReducer,
        todos: todoReducer,
        messages: messageReducer,
        visitors: visitorReducer,
        hamburger: hamburgerReducer,
        theme: themeReducer,
        privacy: privacyReducer,
    },
});

export type RootState =
    ReturnType<typeof store.getState>;

export type AppDispatch =
    typeof store.dispatch;