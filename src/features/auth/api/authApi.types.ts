// export type MeResponse = {
//   userId: number;
//   userName: string;
//   email: string;
//   isBlocked: boolean;
// };

import * as z from "zod";
import type { passwordRecoverySchema, passwordRecoveryResendingSchema, meResponseSchema } from "./../model/validation";

export type MeResponse = z.infer<typeof meResponseSchema>;
export type PasswordRecovery = z.infer<typeof passwordRecoverySchema>;
export type PasswordRecoveryResending = z.infer<typeof passwordRecoveryResendingSchema>;
