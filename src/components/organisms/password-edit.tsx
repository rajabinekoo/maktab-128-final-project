"use client";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { CgSpinnerTwo } from "react-icons/cg";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { appMessage } from "@/utils/messages";
import { editPassword } from "@/requests/users";
import { useAppDispatch } from "@/hooks/redux.hook";
import { Input } from "@/components/molecules/input";
import { Button } from "@/components/molecules/buttons";
import { userInfoActions } from "@/redux/user-info.slice";
import { extractAxiosError } from "@/utils/error-handler";
import {
  changePasswordSchema,
  changePasswordSchemaType,
} from "@/validations/user";

export const EditPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const form = useForm<changePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
  });

  const up = useMutation({
    mutationKey: ["update-password"],
    mutationFn: editPassword,
    onSuccess: () => {
      dispatch(userInfoActions.logout());
      push("/signin");
      toast.success(appMessage.updateProfile);
    },
    onError: extractAxiosError,
  });

  const submit = async (data: changePasswordSchemaType) => {
    up.mutate({ opassword: data.opassword, password: data.password });
  };

  return (
    <form
      onSubmit={form.handleSubmit(submit)}
      className="gap-y-3 grid grid-cols-1 w-full"
    >
      <Controller
        name="opassword"
        control={form.control}
        disabled={up.isPending}
        render={({ field, fieldState: { error } }) => {
          return (
            <Input
              type="password"
              placeholder="پسورد قبلی"
              error={error?.message}
              {...field}
            />
          );
        }}
      />
      <Controller
        name="password"
        control={form.control}
        disabled={up.isPending}
        render={({ field, fieldState: { error } }) => {
          return (
            <Input
              type="password"
              placeholder="پسورد جدید"
              error={error?.message}
              {...field}
            />
          );
        }}
      />
      <Controller
        name="rpassword"
        control={form.control}
        disabled={up.isPending}
        render={({ field, fieldState: { error } }) => {
          return (
            <Input
              type="password"
              placeholder="تکرار پسورد جدید"
              error={error?.message}
              {...field}
            />
          );
        }}
      />
      <Button disabled={up.isPending} type="submit">
        <div className="flex items-center justify-center gap-x-2">
          {up.isPending ? "منتظر بمانید" : "تغییر پسورد"}
          {up.isPending && <CgSpinnerTwo className="w-6 h-6 animate-spin" />}
        </div>
      </Button>
    </form>
  );
};
