"use client";

import { delToken } from "@/utils/session";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: IUserInfoSlice = {
  info: undefined,
  isLoading: true,
  avatar: "",
};

export const userInfoSlice = createSlice({
  name: "user-info",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<IUser>) => {
      state.info = action.payload;
      state.isLoading = false;
      if (!!action.payload.avatar) {
        const { collectionId, id, avatar } = action.payload;
        state.avatar = `http://127.0.0.1:8090/api/files/${collectionId}/${id}/${avatar}`;
      }
    },
    logout: (state) => {
      state.avatar = "";
      state.info = undefined;
      state.isLoading = false;
      delToken();
    },
  },
});

export const userInfoActions = userInfoSlice.actions;
export const userInfoReducer = userInfoSlice.reducer;
