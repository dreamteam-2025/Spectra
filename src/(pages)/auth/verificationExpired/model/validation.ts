import { z } from "zod";

export const emailVerificationSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .max(100, "Email is too short")
    .toLowerCase()
    .trim()
    .pipe(z.email("Invalid email format")),
});
