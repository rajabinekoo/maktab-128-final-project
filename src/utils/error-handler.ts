import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { systemMessages } from "./messages";

export const extractAxiosError = (error: any) => {
  if (error instanceof AxiosError) {
    if (typeof error.response?.data.message === "string") {
      return toast.error(error.response?.data.message);
    }
    const status = !!error.response?.status
      ? Number(error.response?.status)
      : undefined;
    if (!!status && status < 500) {
      return toast.error(systemMessages[Number(error.response?.status)]);
    }
    if (!!status && status >= 500) {
      return toast.error(systemMessages[500]);
    }
    return;
  }
  console.log("--------------");
  console.error(error);
  toast.error(systemMessages[500]);
};
