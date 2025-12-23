// export type MeResponse = {
//   userId: number;
//   userName: string;
//   email: string;
//   isBlocked: boolean;
// };

import * as z from "zod";
import {
  type meResponseSchema,
  registrationConfirmationSchema,
  registrationEmailResendingSchema,
  signUpRequestSchema,
} from "./../model/validation";

export type MeResponse = z.infer<typeof meResponseSchema>;
export type SignUpArgs = z.infer<typeof signUpRequestSchema>;
export type RegistrationConfirmationArgs = z.infer<typeof registrationConfirmationSchema>;
export type RegistrationEmailResendingArgs = z.infer<typeof registrationEmailResendingSchema>;
