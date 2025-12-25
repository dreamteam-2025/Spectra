import * as z from "zod";

export const meResponseSchema = z.object({
  userId: z.number(),
  userName: z.string(),
  email: z.email({ error: "Incorrect email address" }),
  isBlocked: z.boolean(),
});

export const passwordRecoverySchema = z.object({
  email: z.email("User with this email doesn't exist"),
  recaptcha: z.string(),
  baseUrl: z.url(),
});

export const passwordRecoveryResendingSchema = z.object({
  email: z.email("User with this email doesn't exist"),
  baseUrl: z.url(),
});
