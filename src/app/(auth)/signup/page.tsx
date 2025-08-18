"use client";

import Link from "next/link";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { CgSpinner } from "react-icons/cg";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/input";
import { setToken } from "@/utils/session";
import { Button } from "@/components/buttons";
import { appMessage } from "@/utils/messages";
import { signupUserRequest } from "@/requests/users";
import { extractAxiosError } from "@/utils/error-handler";
import { signupSchema, signupSchemaType } from "@/validations/auth";

export default function SignupPage() {
  const signupForm = useForm<signupSchemaType>({
    resolver: zodResolver(signupSchema),
  });

  const registeration = useMutation({
    mutationFn: signupUserRequest,
  });

  const signup = async (data: signupSchemaType) => {
    try {
      const result = await registeration.mutateAsync(data);
      setToken(result.token);
      toast.success(appMessage.auth);
    } catch (error) {
      extractAxiosError(error);
    }
  };

  return (
    <form
      onSubmit={signupForm.handleSubmit(signup)}
      className="w-[500px] space-y-3"
    >
      <h2 className="font-bold text-xl pb-2">ثبت نام</h2>
      <Input
        label="ایمیل"
        placeholder="test@gmail.com"
        disabled={registeration.isPending}
        {...signupForm.register("email")}
        error={signupForm.formState.errors?.email?.message}
      />
      <Input
        label="پسورد"
        type="password"
        placeholder="****"
        disabled={registeration.isPending}
        {...signupForm.register("password")}
        error={signupForm.formState.errors?.password?.message}
      />
      <Input
        label="تکرار پسورد"
        type="password"
        placeholder="****"
        disabled={registeration.isPending}
        {...signupForm.register("rpassword")}
        error={signupForm.formState.errors?.rpassword?.message}
      />
      <Button disabled={registeration.isPending} className="mt-2" type="submit">
        <div className="flex items-center gap-2 justify-center">
          <span>تایید</span>
          {registeration.isPending && (
            <CgSpinner className="w-6 h-6 animate-spin" />
          )}
        </div>
      </Button>
      <Link
        className="block text-center text-blue-800 font-medium hover:underline text-xs"
        href="/signin"
      >
        اکانت دارم و میخواهم وارد شوم
      </Link>
    </form>
  );
}
