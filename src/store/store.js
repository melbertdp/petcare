import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { notifSlice } from "./notifSlice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
    configureStore({
        reducer: {
            [authSlice.name]: authSlice.reducer,
            [notifSlice.name]: notifSlice.reducer,
        },
        devTools: true,
    });

export const wrapper = createWrapper(makeStore);