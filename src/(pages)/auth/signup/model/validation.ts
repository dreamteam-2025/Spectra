import * as z from "zod";

const hasNumber = /[0-9]/;
const hasLower = /[a-z]/;
const hasUpper = /[A-Z]/;
const hasSpecial = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;

export const signupSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(6, { error: "Minimum number of characters 6" })
      .max(30, { error: "Maximum number of characters 30" }),
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .pipe(z.email("The email must match the format example@example.com")),
    password: z
      .string()
      .trim()
      .min(6, { error: "Minimum number of characters 6" })
      .max(20, { error: "Maximum number of characters 20" })
      .refine(v => hasNumber.test(v) && hasLower.test(v) && hasUpper.test(v) && hasSpecial.test(v), {
        message: "Password must contain lowercase, uppercase, and a symbol",
      }),
    confirmPassword: z.string().trim(),
    acceptTerms: z.boolean().refine(val => val === true, {
      message: "You need to accept the terms to continue!",
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignUpInputs = z.infer<typeof signupSchema>;
