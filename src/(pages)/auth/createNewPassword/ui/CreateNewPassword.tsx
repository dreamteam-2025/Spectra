"use client";

import { Card } from "@/shared/ui/Card/Card";
import s from "./CreateNewPassword.module.scss";
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import { useCreateNewPasswordForm } from "../model/hooks/useCreateNewPasswordForm";
// import { Header } from "@/widgets";

export const CreateNewPassword = () => {
  const { register, handleSubmit, onSubmit, errors, isValid } = useCreateNewPasswordForm();

  return (
    // <div className={s.wrapperContainer}>
    // <Header />
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

          <Button type="submit" variant="primary" className={s.button} disabled={!isValid}>
            Create new password
          </Button>
        </form>
      </Card>
    </main>
    // </div>
  );
};
