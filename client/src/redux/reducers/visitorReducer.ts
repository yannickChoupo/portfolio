import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface VisitorState {
    visits: number;
    uniqueVisitors: number;
    loading: boolean;
    error: string | null;
}

const initialState: VisitorState = {
    visits: 0,
    uniqueVisitors: 0,
    loading: false,
    error: null,
};

const visitorSlice = createSlice({
    name: "visitors",
    initialState,
    reducers: {
        setVisitorStats: (
            state,
            action: PayloadAction<{
                visits: number;
                uniqueVisitors: number;
            }>
        ) => {
            state.visits =
                action.payload.visits;

            state.uniqueVisitors =
                action.payload.uniqueVisitors;
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
    setVisitorStats,
    setLoading,
    setError,
} = visitorSlice.actions;

export default visitorSlice.reducer;