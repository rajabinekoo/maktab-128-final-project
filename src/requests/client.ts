"use client";

import axios from "axios";
import { getToken } from "@/utils/session";

export const generateAxiosInstance = () => {
  const token = getToken();
  return axios.create({ headers: { Authorization: `Bearer ${token}` } });
};
