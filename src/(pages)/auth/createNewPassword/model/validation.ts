import { z } from "zod";

export const passwordSchema = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be no more than 20 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "The passwords must match",
  path: ["confirmPassword"],
});

export type PasswordFormData = z.infer<typeof passwordSchema>;