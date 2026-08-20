import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PrivacyState {
    accepted: boolean | null;
}

const initialState: PrivacyState = {
    accepted: null,
};

const privacySlice = createSlice({
    name: "privacy",
    initialState,
    reducers: {
        setPrivacyConsent: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.accepted = action.payload;

            localStorage.setItem(
                "privacy-consent",
                action.payload ? "accepted" : "rejected"
            );
        },

        loadPrivacyConsent: (state) => {
            const consent =
                localStorage.getItem("privacy-consent");

            if (consent === "accepted") {
                state.accepted = true;
            } else if (consent === "rejected") {
                state.accepted = false;
            } else {
                state.accepted = null;
            }
        },

        resetPrivacyConsent: (state) => {
            state.accepted = null;
            localStorage.removeItem("privacy-consent");
        },
    },
});

export const {
    setPrivacyConsent,
    loadPrivacyConsent,
    resetPrivacyConsent,
} = privacySlice.actions;

export default privacySlice.reducer;