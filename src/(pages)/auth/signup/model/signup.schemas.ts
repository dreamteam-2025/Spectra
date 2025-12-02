import * as z from "zod";

export const signupSchema = z
  .object({
    username: z.string().min(3, { error: "Имя не должно быть меньше 3 символов!" }),
    email: z.email("Невалидный email"),
    password: z.string().min(3, { error: "Минимальное значение 3 символа" }),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine(val => val === true, {
      message: "Вам необходимо принять условия, чтобы продолжить!",
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Пароль должен совпадать",
    path: ["confirmPassword"],
  });

export type SignUpInputs = z.infer<typeof signupSchema>;
