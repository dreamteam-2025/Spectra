import { z } from "zod";
import { forgotPasswordSchema } from "@/(pages)/auth/forgotPassword/model/validation";

export type TForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
