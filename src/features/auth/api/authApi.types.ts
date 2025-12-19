// export type MeResponse = {
//   userId: number;
//   userName: string;
//   email: string;
//   isBlocked: boolean;
// };

import * as z from "zod";
import { type meResponseSchema } from "./../model/validation";

export type MeResponse = z.infer<typeof meResponseSchema>;

