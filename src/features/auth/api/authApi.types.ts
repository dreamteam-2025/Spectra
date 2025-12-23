import * as z from "zod";
import { type meResponseSchema } from "./../model/validation";

export type MeResponse = z.infer<typeof meResponseSchema>;

//
export type LoginOauthGithubArgs = {
  redirectUrl: string;
};
