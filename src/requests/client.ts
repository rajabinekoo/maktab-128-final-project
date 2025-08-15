"use client";

import axios from "axios";

export const generateAxiosInstance = () => {
  return axios.create();
};
