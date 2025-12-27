import { z } from "zod";
import { emailVerificationSchema } from "./validation";

export type TEmailVerificationForm = z.infer<typeof emailVerificationSchema>;
