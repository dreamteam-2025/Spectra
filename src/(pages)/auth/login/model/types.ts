import { signInSchema } from "@/features/auth/model/validation";
import z from "zod";

export type SignInForm = z.infer<typeof signInSchema>;
