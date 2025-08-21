"use client";

import { useAppSelector } from "@/hooks/redux.hook";
import { AuthGuard } from "@/providers/auth-guard.provider";

export default function Profile() {
  const info = useAppSelector((state) => state.userInfo?.info);

  return (
    <AuthGuard>
      <div>
        <p>ایمیل: {info?.email}</p>
        <p>نام کاربری: {info?.name}</p>
      </div>
    </AuthGuard>
  );
}
