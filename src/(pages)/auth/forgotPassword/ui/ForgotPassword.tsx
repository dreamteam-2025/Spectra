"use client";

import { TForgotPasswordForm } from "@/(pages)/auth/forgotPassword/model/types";
import { forgotPasswordSchema } from "@/(pages)/auth/forgotPassword/model/validation";
import { Button, Dialog, Input, Recaptcha, ROUTES } from "@/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { Primitive } from "@radix-ui/react-primitive";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useForgotPassword } from "../model/hooks/useForgotPassword";
import s from "./ForgotPassword.module.scss";

export const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    setError,
    clearErrors,
    reset,
  } = useForm<TForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
    defaultValues: {
      submitType: "withCaptcha",
    },
  });

  const { isLinkSent, isLoading, submittedEmail, recaptchaRef, submit, handleCaptchaChange } = useForgotPassword({
    setError,
    setValue,
    clearErrors,
    onSuccess: () => setIsDialogOpen(true),
  });

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleDialogOpen = (open: boolean) => {
    setIsDialogOpen(open);
  };
  const buttonText = isLinkSent ? "Send Link Again" : "Send Link";

  return (
    <main className={s.page}>
      <section className={s.card}>
        <h1 className={s.title}>Forgot Password</h1>
        <Primitive.form className={s.form} onSubmit={handleSubmit(submit)} noValidate>
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
            <Primitive.p className={clsx(s.description, { [s.descriptionSuccess]: isLinkSent })}>
              Enter your email address and we will send you further instructions
            </Primitive.p>
            {isLinkSent && (
              <Primitive.p className={s.descriptionSuccessText}>
                The link has been sent by email. If you don’t receive an email send link again
              </Primitive.p>
            )}
          </Primitive.div>
          <Button variant={"primary"} className={s.submit} disabled={!isValid || isLoading}>
            {buttonText}
          </Button>
          <Link href={ROUTES.AUTH.LOGIN} className={s.backLink}>
            Back to Sign In
          </Link>
          {!isLinkSent && <Recaptcha ref={recaptchaRef} onChangeAction={handleCaptchaChange} className={s.recaptcha} />}
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
