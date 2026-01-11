"use client";

import { ROUTES } from "@/shared";
import Link from "next/link";
import s from "./SignIn.module.scss";
import Image from "next/image";
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import { Card } from "@/shared/ui/Card/Card";
import { useSignIn } from "../model/hooks";

export const SignIn = () => {
  const {
    form: {
      register,
      handleSubmit,
      formState: { errors, isValid },
    },
    onSubmit,
    isLoading,
  } = useSignIn();

  return (
    <main>
      <Card className={s.main}>
        <h1 className={s.h1}>Sign In</h1>

        <div className={s.icons}>
          <button type="button">
            <Image src="/icons/google.svg" alt="google" width={36} height={36} />
          </button>
          <button type="button">
            <Image src="/icons/github.svg" alt="github" width={36} height={36} />
          </button>
        </div>

        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.inputs}>
            <Input label="Email" fullWidth {...register("email")} error={errors.email?.message} />

            <Input
              label="Password"
              type="password"
              fullWidth
              {...register("password")}
              error={errors.password?.message}
            />
          </div>

          <Link className={s.forgotPass} href={ROUTES.AUTH.FORGOT_PASSWORD}>
            Forgot Password
          </Link>

          <Button type="submit" className={s.signInBtn} variant="primary" disabled={!isValid || isLoading}>
            Sign In
          </Button>
        </form>

        <p className={s.text}>Don't have an account?</p>
        <Link className={s.signUpLink} href={ROUTES.AUTH.SIGNUP}>
          Sign Up
        </Link>
      </Card>
    </main>
  );
};
