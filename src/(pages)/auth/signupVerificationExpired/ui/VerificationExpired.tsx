"use client";

import { Button, Input } from "@/shared";
import Image from "next/image";
import s from "./VerifictaionExpired.module.scss";
import { useEmailVerificationForm } from "../model/hooks/useEmailVerificationExpired";

export const VerificationExpired = () => {
  const { register, handleSubmit, onSubmit, errors, isValid } = useEmailVerificationForm();

  return (
    <main className={s.page}>
      <h1 className={s.heading}>Email verification link expired!</h1>
      <div className={s.wrapper}>
        {/* Пояснительный текст перед формой ввода */}
        <p className={s.description}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </p>

        {/* Форма с полями ввода email и кнопкой resend link */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className={s.form}>
          <Input
            type="email"
            label="Email"
            className={s.emailInput}
            placeholder="Epam@epam.com"
            fullWidth
            error={errors.email?.message}
            {...register("email")}
          />
          <Button type="submit" variant={"primary"} className={s.resendBtn} disabled={!isValid}>
            Resend verification link
          </Button>
        </form>

        <Image src="/images/time-management_rafiki.svg" alt="resend verification link" width={473} height={352} />
      </div>
    </main>
  );
};
