// export type MeResponse = {
//   userId: number;
//   userName: string;
//   email: string;
//   isBlocked: boolean;
// };

import * as z from "zod";
import { signInSchema, type meResponseSchema } from "./../model/validation";

export type MeResponse = z.infer<typeof meResponseSchema>;
export type SignInFormType = z.infer<typeof signInSchema>;
