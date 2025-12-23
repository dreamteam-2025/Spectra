import * as z from "zod";

export const meResponseSchema = z.object({
  userId: z.number(),
  userName: z.string(),
  email: z.email({ error: "Incorrect email address" }),
  isBlocked: z.boolean(),
});

export const signUpRequestSchema = z.object({
  userName: z.string().min(1),
  email: z.email(),
  password: z.string().min(1),
  baseUrl: z.url(),
});

export const registrationConfirmationSchema = z.object({
  confirmationCode: z.string().min(1),
});

export const registrationEmailResendingSchema = z.object({
  email: z.email(),
  baseUrl: z.url(),
});
