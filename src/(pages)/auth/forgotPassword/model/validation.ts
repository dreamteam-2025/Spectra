import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email format" }),
  captcha: z.string().min(1, { message: "Captcha is required" }),
});
