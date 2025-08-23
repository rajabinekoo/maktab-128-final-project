"use client";

import { useContext } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../molecules/input";
import { Button } from "../molecules/buttons";
import { appMessage } from "@/utils/messages";
import { Textarea } from "../molecules/textarea";
import { newArticle } from "@/requests/articles";
import { ImageInput } from "../molecules/image-input";
import { extractAxiosError } from "@/utils/error-handler";
import { EditorProviderContext } from "@/providers/editor.provider";
import { newArticleSchema, newArticleSchemaType } from "@/validations/article";

export const NewArticle: React.FC = () => {
  const { value: body } = useContext(EditorProviderContext);
  const form = useForm({ resolver: zodResolver(newArticleSchema) });
  const { push } = useRouter();

  const ca = useMutation({
    mutationKey: ["create-article"],
    mutationFn: newArticle,
    onSuccess: () => {
      toast.success(appMessage.createArticle);
      push("/profile");
    },
    onError: extractAxiosError,
  });

  const submit = (data: newArticleSchemaType) => {
    if (body.trim().length < 200) {
      return toast.error(appMessage.invalidArticleBody);
    }
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("description", data.description);
    const blob = new Blob([body], { type: "text/html" });
    formdata.append("body", blob);
    formdata.append("thumbnail", data.thumbnail);
    ca.mutate(formdata);
  };

  return (
    <form
      dir="rtl"
      onSubmit={form.handleSubmit(submit)}
      className="py-2 space-y-4"
    >
      <ImageInput
        name="thumbnail"
        control={form.control}
        disabled={ca.isPending}
      />
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
