import z from "zod";

const passwdRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/g;

export const signupSchema = z
  .object({
    email: z.email("ایمیل نامعتبر است"),
    password: z
      .string()
      .regex(
        passwdRegex,
        "باید بیشتر یا مساوی ۸ کاراکتر باشد و شامل عدد، کاراکتر های ویژه، حرف کوچک و بزرگ باشد"
      ),
    rpassword: z.string().min(8, "باید بیشتر یا مساوری ۸ کاراکتر باشد"),
  })
  .superRefine(({ password, rpassword }, ctx) => {
    if (password !== rpassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "پسورد و تکرار آن باید با هم برابر باشند",
        path: ["rpassword"],
      });
    }
  });

export type signupSchemaType = z.infer<typeof signupSchema>;

export const signupServerSchema = z.object({
  email: z.email(),
  password: z.string().regex(passwdRegex),
});

export type signupServerSchemaType = z.infer<typeof signupServerSchema>;
