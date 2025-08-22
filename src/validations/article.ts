import z from "zod";

const validFormats = ["image/png", "image/jpg", "image/jpeg"];
const validSize = 2000000;

export const newArticleSchema = z.object({
  title: z
    .string("الزامی")
    .trim()
    .min(5, "عنوان مقاله باید حداقل ۵ کاراکتر باشد"),
  description: z
    .string("الزامی")
    .trim()
    .min(30, "توضیحات مقاله باید حداقل ۳۰ کاراکتر باشد"),
  thumbnail: z
    .custom<File>()
    .refine(
      (f) => {
        return Boolean(f);
      },
      { message: "الزامی" }
    )
    .refine(
      (f) => {
        if (!f) return true;
        return validFormats.includes(f.type);
      },
      { message: "فرمت تصویر نامعتبر است. باید png یا jpg باشد" }
    )
    .refine(
      (f) => {
        if (!f) return true;
        return f.size <= validSize;
      },
      { message: "حجم فایل ارسالی باید حداکثر ۲ مگابایت باشد" }
    ),
});

export type newArticleSchemaType = z.infer<typeof newArticleSchema>;
