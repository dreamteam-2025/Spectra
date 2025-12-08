"use client";

import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { SignUpInputs, signupSchema } from "../model/signup.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CheckBox, Input, ROUTES } from "@/shared";
import s from "./SignUp.module.scss";
import Link from "next/link";
import clsx from "clsx";

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid, touchedFields },
  } = useForm<SignUpInputs>({
    defaultValues: { username: "", email: "", password: "", confirmPassword: "", acceptTerms: false },
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const googleLogoUrl = "/icons/google.svg";
  const githubLogoUrl = "/icons/github.svg";

  function onSubmit(data: SignUpInputs) {
    reset();
    console.log("Submitted data:", data);
    alert("Form submitted!");
  }

  return (
    <Card className={s.container}>
      <h1 className={clsx(s.title, s.center)}>Sign Up</h1>
      <div className={clsx(s.logos, s.center)}>
        <div onClick={() => alert("Logged in from google account")}>
          <img src={googleLogoUrl} alt="Google Logo" />
        </div>
        <div onClick={() => alert("Logged in from github account")}>
          <img src={githubLogoUrl} alt="Github Logo" />
        </div>
      </div>
      <form noValidate onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <Input
          fullWidth
          label="Username"
          {...register("username")}
          error={touchedFields.username ? errors.username?.message : undefined}
        ></Input>
        <Input
          fullWidth
          label="Email"
          {...register("email")}
          error={touchedFields.email ? errors.email?.message : undefined}
        ></Input>
        <Input
          fullWidth
          type="password"
          label="Password"
          {...register("password")}
          error={touchedFields.password ? errors.password?.message : undefined}
        ></Input>
        <Input
          fullWidth
          type="password"
          label="Password confirmation"
          {...register("confirmPassword")}
          error={touchedFields.confirmPassword ? errors.confirmPassword?.message : undefined}
        ></Input>

        <Controller
          control={control}
          name="acceptTerms"
          render={({ field }) => (
            <CheckBox className={s.center} checked={field.value} onChange={field.onChange}>
              <span className="small-text">
                I agree to the&nbsp;
                <Link href={ROUTES.APP.TERMS}>
                  <span className={s.link}>Terms of Service</span>
                </Link>
                &nbsp;and&nbsp;
                <Link href={ROUTES.APP.PRIVACY}>
                  <span className={s.link}>Privacy Policy</span>
                </Link>
              </span>
            </CheckBox>
          )}
        />

        <Button type="submit" variant="primary" disabled={!isValid}>
          Sign Up
        </Button>

        <div className={s.center}> Do you have an account? </div>

        <Link className={s.center} href={ROUTES.AUTH.LOGIN}>
          <Button variant="ghost">Sign In</Button>
        </Link>
      </form>
    </Card>
  );
};
