"use client";

import React, { useState } from "react";
import { Primitive } from "@radix-ui/react-primitive";
import s from "./ForgotPassword.module.scss";
import { Button, Input, Recaptcha, ROUTES } from "@/shared";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { TForgotPasswordForm } from "@/(pages)/auth/forgotPassword/model/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/(pages)/auth/forgotPassword/model/validation";
import clsx from "clsx";

export const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
  });

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const onSubmit = (data: TForgotPasswordForm) => {
    console.log("Forgot password form:", data);

    // we don't have api right now, but it's success example response
    setIsSuccess(true);
  };

  const handleCaptchaChange = (token: string | null) => {
    setValue("captcha", token ?? "", { shouldValidate: true });
  };

  const buttonText = isSuccess ? "Send Link Again" : "Send Link";

  // can't add error 'User with this email doesn't exist' under input, because we don't have api right now

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
          {!isSuccess && <Recaptcha onChangeAction={handleCaptchaChange} className={s.recaptcha} />}
        </Primitive.form>
      </section>
    </main>
  );
};
