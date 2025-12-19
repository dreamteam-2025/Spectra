"use client";

import { ROUTES } from "@/shared";
import Link from "next/link";
import s from "./SignIn.module.scss";
import Image from "next/image";
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import { useForm } from "react-hook-form";
import { Card } from "@/shared/ui/Card/Card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../model/validation";
import { useLoginMutation } from "@/features/auth/api/authApi";
import { useRouter } from "next/navigation";

export type SignInForm = z.infer<typeof signInSchema>;

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur", // ⬅️ валидация при blur
    reValidateMode: "onBlur", // ⬅️ повторная валидация тоже при blur
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login] = useLoginMutation();

  const router = useRouter();

  const onSubmit = async (data: SignInForm) => {
    try {
      const result = await login(data).unwrap();

      // сохранить токен
      sessionStorage.setItem("accessToken", result.accessToken);

      // редирект
      router.push(ROUTES.APP.PROFILE);
    } catch (e) {
      console.error("Login error", e);
    }
  };

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
              fullWidth
              type="password"
              {...register("password")}
              error={errors.password?.message}
            />
          </div>

          <Link className={s.forgotPass} href={ROUTES.AUTH.FORGOT_PASSWORD}>
            Forgot Password
          </Link>

          <Button type="submit" className={s.signInBtn} variant="primary">
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
