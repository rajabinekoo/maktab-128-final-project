"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { CgSpinner } from "react-icons/cg";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/input";
import { Button } from "@/components/buttons";
import { signinUserRequest } from "@/requests/users";
import { signinSchema, signinSchemaType } from "@/validations/auth";

export default function SigninPage() {
  const signupForm = useForm<signinSchemaType>({
    resolver: zodResolver(signinSchema),
  });

  const login = useMutation({
    mutationFn: signinUserRequest,
  });

  const signup = (data: signinSchemaType) => {
    login.mutate(data);
  };

  return (
    <form
      onSubmit={signupForm.handleSubmit(signup)}
      className="w-[500px] space-y-3"
    >
      <h2 className="font-bold text-xl pb-2">ورود</h2>
      <Input
        label="ایمیل"
        placeholder="test@gmail.com"
        disabled={login.isPending}
        {...signupForm.register("email")}
        error={signupForm.formState.errors?.email?.message}
      />
      <Input
        label="پسورد"
        type="password"
        placeholder="****"
        disabled={login.isPending}
        {...signupForm.register("password")}
        error={signupForm.formState.errors?.password?.message}
      />
      <Button disabled={login.isPending} className="mt-2" type="submit">
        <div className="flex items-center gap-2 justify-center">
          <span>تایید</span>
          {login.isPending && <CgSpinner className="w-6 h-6 animate-spin" />}
        </div>
      </Button>
      <Link
        className="block text-center text-blue-800 font-medium hover:underline text-xs"
        href="/signup"
      >
        اکانت ندارم و میخواهم بسازم
      </Link>
    </form>
  );
}
