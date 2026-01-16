"use client";

import { useRef, useState } from "react";
import { Primitive } from "@radix-ui/react-primitive";
import s from "./ForgotPassword.module.scss";
import { Button, Dialog, Input, Recaptcha, ROUTES } from "@/shared";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { TForgotPasswordForm } from "@/(pages)/auth/forgotPassword/model/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/(pages)/auth/forgotPassword/model/validation";
import clsx from "clsx";
import { usePasswordRecoveryMutation, usePasswordRecoveryResendingMutation } from "@/features/auth/api/authApi";
import type ReCAPTCHA from "react-google-recaptcha";

export const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    reset,
  } = useForm<TForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
  });

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [submittedEmail, setSubmittedEmail] = useState<string>("");
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const [ForgotPassword, { isLoading }] = usePasswordRecoveryMutation();
  const [ForgotPasswordResending] = usePasswordRecoveryResendingMutation();
  async function onSubmit(data: TForgotPasswordForm) {
    setSubmittedEmail(data.email);
    try {
      if (!isSuccess) {
        await ForgotPassword({
          email: data.email,
          recaptcha: data.captcha!,
          baseUrl: window.location.origin,
        }).unwrap();
      } else {
        await ForgotPasswordResending({
          email: data.email,
          baseUrl: window.location.origin,
        }).unwrap();
      }
      reset();
      setIsDialogOpen(true);
      setIsSuccess(true);
    } catch (err: any) {
      recaptchaRef.current?.reset();
      setValue("captcha", "", { shouldValidate: false });

      if (err?.message?.field === "email") {
        setError("email", {
          type: "server",
          message: "User with this email doesn't exist",
        });
      }
    }
  }

  const handleCaptchaChange = (token: string | null) => {
    setValue("captcha", token ?? "", { shouldValidate: true });
  };

  const handleDialogOpen = (open: boolean) => {
    setIsDialogOpen(open);
  };
  const buttonText = isSuccess ? "Send Link Again" : "Send Link";

  return (
    <main className={s.page}>
      <section className={s.card}>
        <h1 className={s.title}>Forgot Password</h1>
        <Primitive.form className={s.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <Primitive.div className={s.field}>
            <Input
              label="Email"
              type="email"
              placeholder="Epam@epam.com"
              fullWidth
              className={s.forgotPasswordInput}
              error={errors.email?.message}
              {...register("email")}
            />
            <Primitive.p className={clsx(s.description, { [s.descriptionSuccess]: isSuccess })}>
              Enter your email address and we will send you further instructions
            </Primitive.p>
            {isSuccess && (
              <Primitive.p className={s.descriptionSuccessText}>
                The link has been sent by email. If you don’t receive an email send link again
              </Primitive.p>
            )}
          </Primitive.div>
          <Button variant={"primary"} className={s.submit}>
            {buttonText}
          </Button>
          <Link href={ROUTES.AUTH.LOGIN} className={s.backLink}>
            Back to Sign In
          </Link>
          {!isSuccess && <Recaptcha ref={recaptchaRef} onChangeAction={handleCaptchaChange} className={s.recaptcha} />}
        </Primitive.form>
        <Dialog
          open={isDialogOpen}
          onOpenChange={handleDialogOpen}
          title="Email sent"
          description={`We have sent a link to confirm your email to ${submittedEmail}`}
        />
      </section>
    </main>
  );
};
