import { z } from "zod";

export const forgotPasswordSchema = z
  .object({
    submitType: z.enum(["withCaptcha", "withoutCaptcha"]),

    email: z.string().email(),

    recaptcha: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.submitType === "withCaptcha" && !data.recaptcha) {
      ctx.addIssue({
        path: ["recaptcha"],
        message: "Recaptcha is required",
        code: z.ZodIssueCode.custom,
      });
    }
  });
