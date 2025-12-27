import * as z from "zod";
import {
  signInSchema,
  type meResponseSchema,
  registrationConfirmationSchema,
  registrationEmailResendingSchema,
  signUpRequestSchema,
} from "./../model/validation";

export type MeResponse = z.infer<typeof meResponseSchema>;
export type SignInFormType = z.infer<typeof signInSchema>;
export type SignUpArgs = z.infer<typeof signUpRequestSchema>;
export type RegistrationConfirmationArgs = z.infer<typeof registrationConfirmationSchema>;
export type RegistrationEmailResendingArgs = z.infer<typeof registrationEmailResendingSchema>;
