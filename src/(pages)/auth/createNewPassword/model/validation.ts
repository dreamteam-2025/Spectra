import { z } from "zod";

const hasNumber = /[0-9]/;
const hasLower = /[a-z]/;
const hasUpper = /[A-Z]/;
const hasSpecial = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;

export const passwordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(1, "Password is required")
      .min(6, { error: "Minimum number of characters 6" })
      .max(20, { error: "Maximum number of characters 20" })
      .refine(v => hasNumber.test(v) && hasLower.test(v) && hasUpper.test(v) && hasSpecial.test(v), {
        message: "Password must contain lowercase, uppercase, and a symbol",
      }),
    confirmPassword: z.string().trim().min(1, "Password is required"),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "The passwords must match",
    path: ["confirmPassword"],
  });

export type PasswordFormData = z.infer<typeof passwordSchema>;
