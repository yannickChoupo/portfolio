import { createSlice, type PayloadAction,  } from "@reduxjs/toolkit";
import type { Requirement } from "../../pages/Admin/types/admin.types";

interface RequirementState {
    requirements: Requirement[];
    loading: boolean;
    error: string | null;
}

const initialState: RequirementState = {
    requirements: [],
    loading: false,
    error: null,
};

const requirementSlice = createSlice({
    name: "requirements",
    initialState,
    reducers: {
        setRequirements: (
            state,
            action: PayloadAction<Requirement[]>
        ) => {
            state.requirements =
                action.payload;
        },

        addRequirement: (
            state,
            action: PayloadAction<Requirement>
        ) => {
            state.requirements.push(
                action.payload
            );
        },

        updateRequirement: (
            state,
            action: PayloadAction<Requirement>
        ) => {
            const index =
                state.requirements.findIndex(
                    (requirement) =>
                        requirement._id ===
                        action.payload._id
                );

            if (index !== -1) {
                state.requirements[index] =
                    action.payload;
            }
        },

        removeRequirement: (
            state,
            action: PayloadAction<string>
        ) => {
            state.requirements =
                state.requirements.filter(
                    (requirement) =>
                        requirement._id !==
                        action.payload
                );
        },

        setLoading: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.loading = action.payload;
        },

        setError: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.error = action.payload;
        },
    },
});

export const {
    setRequirements,
    addRequirement,
    updateRequirement,
    removeRequirement,
    setLoading,
    setError,
} = requirementSlice.actions;

export default requirementSlice.reducer;