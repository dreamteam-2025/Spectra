import * as z from "zod";
import {
  signInSchema,
  type meResponseSchema,
  registrationConfirmationSchema,
  registrationEmailResendingSchema,
  signUpRequestSchema,
  passwordRecoverySchema,
  passwordRecoveryResendingSchema,
} from "./../model/validation";

export type MeResponse = z.infer<typeof meResponseSchema>;
export type SignInFormType = z.infer<typeof signInSchema>;
export type SignUpArgs = z.infer<typeof signUpRequestSchema>;
export type RegistrationConfirmationArgs = z.infer<typeof registrationConfirmationSchema>;
export type RegistrationEmailResendingArgs = z.infer<typeof registrationEmailResendingSchema>;
export type PasswordRecovery = z.infer<typeof passwordRecoverySchema>;
export type PasswordRecoveryResending = z.infer<typeof passwordRecoveryResendingSchema>;
