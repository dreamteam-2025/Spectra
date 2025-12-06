import { useForm } from "react-hook-form";
import { TEmailVerificationForm } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailVerificationSchema } from "../validation";

export const useEmailVerificationForm = () => {
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
    console.log("Resend verification link form: ", data);
    reset();
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isValid,
  };
};
