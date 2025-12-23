"use client";

import { useForm } from "react-hook-form";
import { TEmailVerificationForm } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailVerificationSchema } from "../validation";
import { useResendRegistrationEmailMutation } from "@/features/auth/api/authApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { handleErrors } from "@/shared";
import { useState } from "react";

export const useEmailVerificationForm = () => {
  const [resendEmail] = useResendRegistrationEmailMutation();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [submitEmail, setSubmitEmail] = useState<string>("");

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

      setSubmitEmail(data.email);
      reset();
      setIsDialogOpen(true);
    } catch (err) {
      handleErrors(err as FetchBaseQueryError);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    setIsDialogOpen,
    errors,
    isValid,
    submitEmail,
    isDialogOpen,
  };
};
