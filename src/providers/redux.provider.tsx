"use client";

import { Provider } from "react-redux";
import { reduxStore } from "@/redux/store";

export const ReduxProvider: React.FC<IChildren> = ({ children }) => {
  return <Provider store={reduxStore}>{children}</Provider>;
};
