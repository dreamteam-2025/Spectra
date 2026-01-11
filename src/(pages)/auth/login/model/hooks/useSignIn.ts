"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/features/auth/api/authApi";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared";
import { SignInForm } from "../types";
import { signInSchema } from "@/features/auth/model/validation";

export const useSignIn = () => {
  const form = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login, { isLoading, error }] = useLoginMutation();
  const router = useRouter();

  const onSubmit = async (data: SignInForm) => {
    await login(data).unwrap();
    router.push(ROUTES.APP.PROFILE);
  };

  return {
    form,
    onSubmit,
    isLoading,
    error,
  };
};
