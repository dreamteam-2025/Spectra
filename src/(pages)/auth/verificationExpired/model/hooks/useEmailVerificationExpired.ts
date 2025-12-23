"use client";

import { useForm } from "react-hook-form";
import { TEmailVerificationForm } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailVerificationSchema } from "../validation";
import { useResendRegistrationEmailMutation } from "@/features/auth/api/authApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { handleErrors } from "@/shared";

export const useEmailVerificationForm = () => {
  const [resendEmail] = useResendRegistrationEmailMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TEmailVerificationForm>({
    resolver: zodResolver(emailVerificationSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: TEmailVerificationForm) => {
    try {
      await resendEmail({
        email: data.email,
        baseUrl: window.location.origin,
      }).unwrap();

      reset();
    } catch (err) {
      handleErrors(err as FetchBaseQueryError);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isValid,
  };
};
