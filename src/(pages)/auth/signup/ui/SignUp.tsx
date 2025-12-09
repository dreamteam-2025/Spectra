"use client";

import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { SignUpInputs, signupSchema } from "../model/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CheckBox, Input, ROUTES } from "@/shared";
import s from "./SignUp.module.scss";
import Link from "next/link";
import Image from "next/image";

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

  function onSubmit(data: SignUpInputs) {
    reset();
    console.log("Submitted data:", data);
    alert("Form submitted!");
  }

  return (
    <Card className={s.container}>
      <h1 className={s.title}>Sign Up</h1>
      <section className={s.logos}>
        <button type="button" onClick={() => alert("Logged in from google account")}>
          <Image src="/icons/google.svg" alt="google" width={36} height={36} />
        </button>
        <button type="button" onClick={() => alert("Logged in from github account")}>
          <Image src="/icons/github.svg" alt="Github Logo" width={36} height={36} />
        </button>
      </section>
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
            <CheckBox checked={field.value} onChange={field.onChange}>
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
      </form>
      <p className={s.prompt}> Do you have an account? </p>

      <Link className={s.loginLink} href={ROUTES.AUTH.LOGIN}>
        Sign In
      </Link>
    </Card>
  );
};
