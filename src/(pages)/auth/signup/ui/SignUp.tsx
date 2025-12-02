"use client";

import { Form } from "react-hook-form";
import { useForm } from "react-hook-form";
import { SignUpInputs, signupSchema } from "../model/signup.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared";

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<SignUpInputs>({
    defaultValues: { username: "", email: "", password: "", confirmPassword: "", acceptTerms: false },
    resolver: zodResolver(signupSchema),
  });

  function onSubmit() {
    alert("Form is submeted!");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button type="submit" variant="primary">
        Sign Up
      </Button>
      <Button variant="ghost">Sign In</Button>
    </form>
  );
};
