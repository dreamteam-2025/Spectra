import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { PasswordFormData, passwordSchema } from "../validation";
import { useNewPasswordMutation } from "@/features/auth/api/authApi";
import { ROUTES } from "@/shared";

export const useCreateNewPasswordForm = () => {
  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const [newPassword, { isLoading }] = useNewPasswordMutation();

  const onSubmit = async (data: PasswordFormData) => {
    if (!code) return;

    try {
      await newPassword({
        newPassword: data.password,
        recoveryCode: code,
      }).unwrap();

      form.reset();
      router.push(ROUTES.AUTH.LOGIN);
    } catch (err) {
      form.reset();
      console.error(err);
    }
  };

  return {
    ...form,
    onSubmit,
    isLoading,
  };
};
