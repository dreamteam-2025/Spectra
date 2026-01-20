import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema, PasswordFormData } from "../validation";
import { useEffect } from "react";

export const useCreateNewPasswordForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    if (password || confirmPassword) {
      trigger();
    }
  }, [password, confirmPassword, trigger]);

  const onSubmit = (data: PasswordFormData) => {
    console.log("Password created:", data);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isValid,
  };
};
