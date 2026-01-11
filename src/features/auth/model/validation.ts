import * as z from "zod";

export const meResponseSchema = z.object({
  userId: z.number(),
  userName: z.string(),
  email: z.email({ error: "Incorrect email address" }),
  isBlocked: z.boolean(),
});

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .max(100, { message: "Email is too short" })
    .toLowerCase()
    .trim()
    .pipe(z.email({ message: "Invalid email address" })),

  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { error: "Minimum number of characters 6" })
    .max(20, { error: "Maximum number of characters 20" }),
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

export const passwordRecoverySchema = z.object({
  email: z.email("User with this email doesn't exist"),
  recaptcha: z.string(),
  baseUrl: z.url(),
});

export const passwordRecoveryResendingSchema = z.object({
  email: z.email("User with this email doesn't exist"),
  baseUrl: z.url(),
});
