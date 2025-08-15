"use client";

import { useForm } from "react-hook-form";
import { CgSpinner } from "react-icons/cg";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/input";
import { Button } from "@/components/buttons";
import { addAuthorRequest } from "@/requests/authors";
import { signupSchema, signupSchemaType } from "@/validations/auth";

export default function SignupPage() {
  const signupForm = useForm<signupSchemaType>({
    resolver: zodResolver(signupSchema),
  });

  const addAuthor = useMutation({
    mutationFn: addAuthorRequest,
  });

  const signup = (data: signupSchemaType) => {
    addAuthor.mutate(data);
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
        disabled={addAuthor.isPending}
        {...signupForm.register("email")}
        error={signupForm.formState.errors?.email?.message}
      />
      <Input
        label="پسورد"
        type="password"
        placeholder="****"
        disabled={addAuthor.isPending}
        {...signupForm.register("password")}
        error={signupForm.formState.errors?.password?.message}
      />
      <Input
        label="تکرار پسورد"
        type="password"
        placeholder="****"
        disabled={addAuthor.isPending}
        {...signupForm.register("rpassword")}
        error={signupForm.formState.errors?.rpassword?.message}
      />
      <Button disabled={addAuthor.isPending} className="mt-2" type="submit">
        <div className="flex items-center gap-2 justify-center">
          <span>تایید</span>
          {addAuthor.isPending && (
            <CgSpinner className="w-6 h-6 animate-spin" />
          )}
        </div>
      </Button>
    </form>
  );
}
