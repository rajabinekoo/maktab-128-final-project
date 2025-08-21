import z from "zod";
import { passwdRegex } from "@/validations/auth";

const validFormats = ["image/png", "image/jpg", "image/jpeg"];
const validSize = 2000000;

export const updateProfileSchema = z.object({
  name: z.string().optional(),
  avatar: z
    .custom<File>()
    .optional()
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

export type updateProfileSchemaType = z.infer<typeof updateProfileSchema>;

export const changePasswordSchema = z
  .object({
    opassword: z
      .string()
      .regex(
        passwdRegex,
        "باید بیشتر یا مساوی ۸ کاراکتر باشد و شامل عدد، کاراکتر های ویژه، حرف کوچک و بزرگ باشد"
      ),
    password: z
      .string()
      .regex(
        passwdRegex,
        "باید بیشتر یا مساوی ۸ کاراکتر باشد و شامل عدد، کاراکتر های ویژه، حرف کوچک و بزرگ باشد"
      ),
    rpassword: z.string().min(8, "باید بیشتر یا مساوری ۸ کاراکتر باشد"),
  })
  .superRefine(({ password, rpassword, opassword }, ctx) => {
    if (password !== rpassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "پسورد و تکرار آن باید با هم برابر باشند",
        path: ["rpassword"],
      });
    }
    if (password === opassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "پسورد جدید انتخاب کنید",
        path: ["password"],
      });
    }
  });

export type changePasswordSchemaType = z.infer<typeof changePasswordSchema>;

export const changePasswordServerSchema = z
  .object({
    opassword: z
      .string()
      .regex(
        passwdRegex,
        "باید بیشتر یا مساوی ۸ کاراکتر باشد و شامل عدد، کاراکتر های ویژه، حرف کوچک و بزرگ باشد"
      ),
    password: z
      .string()
      .regex(
        passwdRegex,
        "باید بیشتر یا مساوی ۸ کاراکتر باشد و شامل عدد، کاراکتر های ویژه، حرف کوچک و بزرگ باشد"
      ),
  })
  .superRefine(({ password, opassword }, ctx) => {
    if (password === opassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "پسورد جدید انتخاب کنید",
        path: ["password"],
      });
    }
  });

export type changePasswordServerSchemaType = z.infer<
  typeof changePasswordServerSchema
>;
