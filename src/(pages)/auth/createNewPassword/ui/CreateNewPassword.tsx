"use client";

import { Card } from "@/shared/ui/Card/Card";
import s from "./CreateNewPassword.module.scss";
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import { useForm } from "react-hook-form";
import { PasswordFormData, passwordSchema } from "../model/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useNewPasswordMutation } from "@/features/auth/api/authApi";
import { ROUTES } from "@/shared";
import { useCreateNewPasswordForm } from "../model/hooks/useCreateNewPasswordForm";

export const CreateNewPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  const [newPassword, { isLoading }] = useNewPasswordMutation();
  const code = searchParams.get("code");

  async function onSubmit(data: PasswordFormData) {
    if (code) {
      try {
        await newPassword({
          newPassword: data.password,
          recoveryCode: code,
        }).unwrap();
        reset();
        router.push(ROUTES.AUTH.LOGIN);
      } catch (err) {
        reset();
        console.log(err);
      }
    }
  }

  return (
    <main className={s.container}>
      <Card width={378} height={432} className={s.wrapper}>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <div className={s.title}>Create New Password</div>

          <div className={s.inputs}>
            <Input
              type="password"
              label="New password"
              className={s.input}
              wrapperClassName={s.wrapperInput}
              error={errors.password?.message}
              fullWidth
              {...register("password")}
            />

            <Input
              type="password"
              label="Password confirmation"
              className={s.input}
              wrapperClassName={s.wrapperInput}
              error={errors.confirmPassword?.message}
              fullWidth
              {...register("confirmPassword")}
            />

            <label className={s.labelPassword}>Your password must be between 6 and 20 characters</label>
          </div>

          <Button type="submit" variant="primary" className={s.button} disabled={!isValid && isLoading}>
            Create new password
          </Button>
        </form>
      </Card>
    </main>
  );
};
