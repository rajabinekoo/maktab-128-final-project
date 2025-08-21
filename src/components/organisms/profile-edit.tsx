"use client";

import { useEffect } from "react";

import { toast } from "react-toastify";
import { CgSpinnerTwo } from "react-icons/cg";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { appMessage } from "@/utils/messages";
import { updateProfile } from "@/requests/users";
import { useAppSelector } from "@/hooks/redux.hook";
import { Input } from "@/components/molecules/input";
import { Button } from "@/components/molecules/buttons";
import { extractAxiosError } from "@/utils/error-handler";
import { AvatarInput } from "@/components/molecules/avatar-input";
import {
  updateProfileSchema,
  updateProfileSchemaType,
} from "@/validations/user";

export const EditProfile: React.FC = () => {
  const {
    avatar,
    isLoading,
    info: user,
  } = useAppSelector((state) => state.userInfo);

  const form = useForm<updateProfileSchemaType>({
    resolver: zodResolver(updateProfileSchema),
  });

  const up = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: updateProfile,
    onSuccess: () => toast.success(appMessage.updateProfile),
    onError: extractAxiosError,
  });

  const submit = async (data: updateProfileSchemaType) => {
    const formdata = new FormData();
    formdata.append("avatar", data.avatar || "");
    formdata.append("name", data.name || "");
    up.mutate(formdata);
  };

  useEffect(() => {
    if (!!user?.name) form.reset({ name: user.name });
  }, [user]);

  return (
    <form
      onSubmit={form.handleSubmit(submit)}
      className="gap-y-3 grid grid-cols-1 w-full"
    >
      <AvatarInput
        name="avatar"
        preview={avatar}
        control={form.control}
        disabled={isLoading || up.isPending}
      />
      <Controller
        name="name"
        control={form.control}
        disabled={isLoading || up.isPending}
        render={({ field, fieldState: { error } }) => {
          return (
            <Input placeholder="نام کاربری" error={error?.message} {...field} />
          );
        }}
      />
      <Button disabled={isLoading || up.isPending} type="submit">
        <div className="flex items-center justify-center gap-x-2">
          {up.isPending ? "منتظر بمانید" : "به روز رسانی"}
          {up.isPending && <CgSpinnerTwo className="w-6 h-6 animate-spin" />}
        </div>
      </Button>
      {isLoading && <p>کمی صبر کنید ...</p>}
    </form>
  );
};
