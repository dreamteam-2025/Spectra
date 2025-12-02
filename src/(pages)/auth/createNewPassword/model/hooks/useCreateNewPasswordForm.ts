import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema, PasswordFormData } from "../validation";

export const useCreateNewPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
  });

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