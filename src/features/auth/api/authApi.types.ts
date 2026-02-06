import * as z from "zod";
import {
  signInSchema,
  type meResponseSchema,
  registrationConfirmationSchema,
  registrationEmailResendingSchema,
  signUpRequestSchema,
  passwordRecoverySchema,
  passwordRecoveryResendingSchema,
  newPasswordSchema,
} from "./../model/validation";

export type MeResponse = z.infer<typeof meResponseSchema>;
export type SignInFormType = z.infer<typeof signInSchema>;
export type SignUpArgs = z.infer<typeof signUpRequestSchema>;
export type RegistrationConfirmationArgs = z.infer<typeof registrationConfirmationSchema>;
export type RegistrationEmailResendingArgs = z.infer<typeof registrationEmailResendingSchema>;
export type PasswordRecovery = z.infer<typeof passwordRecoverySchema>;
export type PasswordRecoveryResending = z.infer<typeof passwordRecoveryResendingSchema>;
export type NewPassword = z.infer<typeof newPasswordSchema>;

// OAuth2, типизация Responses для Github OAuth2-авторизации
export type LoginOauthGithubArgs = {
  redirectUrl: string;
};

// OAuth2, типизация Responses для Google OAuth2-авторизации
export type LoginGoogleResponse = {
  accessToken: string;
  email: string;
};

// OAuth2, типизация Request Body для Google OAuth2-авторизации
export type LoginGoogleArgs = {
  redirectUrl: string;
  code: string;
};
