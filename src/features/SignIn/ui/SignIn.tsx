'use client';

import { ROUTES } from "@/shared/lib/constants";
import Link from "next/link";
import s from "./SignIn.module.scss";
import Image from "next/image";
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import { useForm } from "react-hook-form";

interface SignInForm {
  email: string;
  password: string;
}

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>();

  const onSubmit = (data: SignInForm) => {
    console.log(data);
    // Здесь будет логика авторизации
  };

  return (
    <main className={s.main}>
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
          <Input 
            label="Email" 
            fullWidth 
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            error={errors.email?.message}
          />
          
          <Input 
            label="Password" 
            fullWidth 
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
            error={errors.password?.message}
          />
        </div>

        <Link className={s.forgotPass} href={ROUTES.AUTH.FORGOT_PASSWORD}>
          Forgot Password
        </Link>
        
        <Button type="submit" className={s.signInBtn} variant="primary">
          Sign In
        </Button>
        
        <p className={s.text}>Don't have an account?</p>
        <Link className={s.signUpLink} href={ROUTES.AUTH.SIGNUP}>
          Sign Up
        </Link>
      </form>
    </main>
  );
}