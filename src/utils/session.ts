"use client";

const key = process.env.NEXT_PUBLIC_APP_TOKEN_NAME || "";

export const getToken = () => {
  return window.localStorage.getItem(key) || "";
};

export const setToken = (token: string) => {
  window.localStorage.setItem(key, token);
};

export const delToken = () => {
  window.localStorage.removeItem(key);
};
