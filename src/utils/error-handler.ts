import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { appMessage, systemMessages } from "./messages";
import { delToken } from "./session";

export const extractAxiosError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const status = !!error.response?.status
      ? Number(error.response?.status)
      : undefined;
    if (status === 401) {
      delToken();
      toast.error(appMessage.expiration);
      window.location.href = "/signin";
    }
    if (typeof error.response?.data.message === "string") {
      return toast.error(error.response?.data.message);
    }
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
