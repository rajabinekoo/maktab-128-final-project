import z from "zod";

export const newArticleSchema = z.object({
  title: z
    .string("الزامی")
    .trim()
    .min(5, "عنوان مقاله باید حداقل ۵ کاراکتر باشد"),
  description: z
    .string("الزامی")
    .trim()
    .min(30, "توضیحات مقاله باید حداقل ۳۰ کاراکتر باشد"),
});

export type newArticleSchemaType = z.infer<typeof newArticleSchema>;
