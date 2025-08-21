"use client";

import { useContext } from "react";
import { EditorProviderContext } from "@/providers/editor.provider";
import { Input } from "../molecules/input";
import { Textarea } from "../molecules/textarea";
import { Button } from "../molecules/buttons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newArticleSchema, newArticleSchemaType } from "@/validations/article";
import { toast } from "react-toastify";
import { appMessage } from "@/utils/messages";
import { useMutation } from "@tanstack/react-query";
import { newArticle } from "@/requests/articles";
import { extractAxiosError } from "@/utils/error-handler";

interface INewArticleProps {}

export const NewArticle: React.FC<INewArticleProps> = () => {
  const { value: body } = useContext(EditorProviderContext);
  const form = useForm({ resolver: zodResolver(newArticleSchema) });

  const ca = useMutation({
    mutationKey: ["create-article"],
    mutationFn: newArticle,
    onSuccess: () => toast.success(appMessage.createArticle),
    onError: extractAxiosError,
  });

  const submit = (data: newArticleSchemaType) => {
    if (body.trim().length < 200) {
      return toast.error(appMessage.invalidArticleBody);
    }
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("description", data.description);
    const blob = new Blob([body], { type: 'text/html' });
    formdata.append("body", blob);
    ca.mutate(formdata);
  };

  return (
    <form
      dir="rtl"
      onSubmit={form.handleSubmit(submit)}
      className="py-2 space-y-4"
    >
      <Input
        {...form.register("title")}
        error={form.formState.errors.title?.message}
        placeholder="عنوان مقاله"
      />
      <Textarea
        {...form.register("description")}
        error={form.formState.errors.description?.message}
        placeholder="توضیحات مقاله"
      />
      <Button type="submit">ثبت مقاله</Button>
    </form>
  );
};
