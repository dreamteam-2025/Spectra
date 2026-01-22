import { useRef, useState } from "react";
import type ReCAPTCHA from "react-google-recaptcha";
import { TForgotPasswordForm } from "../types";
import { usePasswordRecoveryMutation, usePasswordRecoveryResendingMutation } from "@/features/auth/api/authApi";
import { UseFormSetError, UseFormSetValue, UseFormClearErrors } from "react-hook-form";

type Params = {
  setError: UseFormSetError<TForgotPasswordForm>;
  setValue: UseFormSetValue<TForgotPasswordForm>;
  clearErrors: UseFormClearErrors<TForgotPasswordForm>;
  onSuccess?: () => void;
};

export const useForgotPassword = ({ setError, setValue, clearErrors, onSuccess }: Params) => {
  const [isLinkSent, setIsLinkSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const [sendRecovery, { isLoading }] = usePasswordRecoveryMutation();
  const [resendRecovery] = usePasswordRecoveryResendingMutation();

  const submit = async (data: TForgotPasswordForm) => {
    if (!isLinkSent && !data.recaptcha) {
      setError("recaptcha", {
        type: "manual",
        message: "Recaptcha is required",
      });
      return;
    }

    setSubmittedEmail(data.email);

    try {
      if (!isLinkSent) {
        await sendRecovery({
          email: data.email,
          recaptcha: data.recaptcha!,
          baseUrl: window.location.origin,
        }).unwrap();

        setIsLinkSent(true);
        setValue("recaptcha", undefined);
        clearErrors("recaptcha");
        setValue("submitType", "withoutCaptcha", {
          shouldValidate: true,
          shouldDirty: true,
        });
      } else {
        await resendRecovery({
          email: data.email,
          baseUrl: window.location.origin,
        }).unwrap();
      }
      onSuccess?.();
    } catch (err: any) {
      if (err.data?.messages?.[0].field === "email") {
        setError("email", {
          type: "server",
          message: "User with this email doesn't exist",
        });
      }
      recaptchaRef.current?.reset();
      setValue("recaptcha", "", { shouldValidate: false });
    }
  };

  const handleCaptchaChange = (token: string | null) => {
    setValue("recaptcha", token ?? "", { shouldValidate: true });
  };

  return {
    isLinkSent,
    isLoading,
    submittedEmail,
    recaptchaRef,
    submit,
    handleCaptchaChange,
  };
};
