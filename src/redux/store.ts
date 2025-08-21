"use client";

import { configureStore } from "@reduxjs/toolkit";
import { userInfoReducer } from "./user-info.slice";

export const reduxStore = configureStore({
  reducer: { userInfo: userInfoReducer },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
