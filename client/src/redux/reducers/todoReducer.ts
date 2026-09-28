import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Todo } from "../../pages/Admin/types/admin.types";

interface TodoState {
    todos: Todo[];
    loading: boolean;
    error: string | null;
}

const initialState: TodoState = {
    todos: [],
    loading: false,
    error: null,
};

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        setTodos: (
            state,
            action: PayloadAction<Todo[]>
        ) => {
            state.todos = action.payload;
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
    setTodos,
    setLoading,
    setError,
} = todoSlice.actions;

export default todoSlice.reducer;