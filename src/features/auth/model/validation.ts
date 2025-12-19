import * as z from "zod";

export const meResponseSchema = z.object({
  userId: z.number(),
  userName: z.string(),
  email: z.email({ error: "Incorrect email address" }),
  isBlocked: z.boolean(),
});
