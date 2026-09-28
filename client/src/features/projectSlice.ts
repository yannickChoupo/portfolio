import { createSlice, type PayloadAction,  } from "@reduxjs/toolkit";
import type { GithubProject } from "../Projects/union/Union";

interface ProjectState {
    projects: GithubProject[];
    loading: boolean;
    error: string | null;
}

const initialState: ProjectState = {
    projects: [],
    loading: false,
    error: null,
};

const projectSlice = createSlice({
    name: "projects",

    initialState,

    reducers: {
        setProjects(
            state,
            action: PayloadAction<GithubProject[]>
        ) {
            state.projects = action.payload;
        },

        addProject(
            state,
            action: PayloadAction<GithubProject>
        ) {
            state.projects.push(action.payload);
        },

        updateProject(
            state,
            action: PayloadAction<GithubProject>
        ) {
            const index = state.projects.findIndex(
                (project) =>
                    project.number === action.payload.number
            );

            if (index !== -1) {
                state.projects[index] =
                    action.payload;
            }
        },

        removeProject(
            state,
            action: PayloadAction<string>
        ) {
            state.projects =
                state.projects.filter(
                    (project) =>
                        String(project.number) !== action.payload
                );
        },

        setLoading(
            state,
            action: PayloadAction<boolean>
        ) {
            state.loading = action.payload;
        },

        setError(
            state,
            action: PayloadAction<string | null>
        ) {
            state.error = action.payload;
        },
    },
});

export const {
    setProjects,
    addProject,
    updateProject,
    removeProject,
    setLoading,
    setError,
} = projectSlice.actions;

export default projectSlice.reducer;