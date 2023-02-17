import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
    notificationState: [],
};

export const notifSlice = createSlice({
    name: "notif",
    initialState,
    reducers: {
        setNotifState(state, action) {
            state.notificationState = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            console.log("HYDRATE", action.payload);
            return {
                ...state,
                ...action.payload.notif,
            };
        },
    },
});

export const { setNotifState } = notifSlice.actions;

export const selectNotifState = (state) => state.notif.notificationState;

export default notifSlice.reducer;