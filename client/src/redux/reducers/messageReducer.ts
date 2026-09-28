import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Message } from "../../pages/Admin/types/admin.types";

interface MessageState {
    messages: Message[];
    loading: boolean;
    error: string | null;
}

const initialState: MessageState = {
    messages: [],
    loading: false,
    error: null,
};

const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        setMessages: (
            state,
            action: PayloadAction<Message[]>
        ) => {
            state.messages =
                action.payload;
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
    setMessages,
    setLoading,
    setError,
} = messageSlice.actions;

export default messageSlice.reducer;