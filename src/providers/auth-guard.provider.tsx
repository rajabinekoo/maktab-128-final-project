"use client";

import { useEffect } from "react";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { delToken } from "@/utils/session";
import { getUserInfo } from "@/requests/users";
import { backendMessages } from "@/utils/messages";
import { useAppDispatch } from "@/hooks/redux.hook";
import { userInfoActions } from "@/redux/user-info.slice";

interface IAuthGuardProps extends IChildren {
  restrict?: boolean;
}

export const AuthGuard: React.FC<IAuthGuardProps> = ({
  children,
  restrict = true,
}) => {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const userInfo = useQuery({
    queryKey: ["get-user-info"],
    queryFn: getUserInfo,
  });

  useEffect(() => {
    if (!userInfo.isSuccess) return;
    dispatch(userInfoActions.setUserInfo(userInfo.data));
  }, [userInfo.isSuccess, userInfo.data]);

  useEffect(() => {
    if (!restrict) return;
    if (userInfo.isPending) return;
    if (!userInfo.isError) return;
    toast.error(backendMessages.authorizationFailed);
    delToken();
    push("/signin");
  }, [userInfo.isPending, userInfo.isError, restrict]);

  return <>{children}</>;
};
