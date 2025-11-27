"use client";

import { Card } from "@/shared/ui/Card/Card";
import s from "./CreateNewPassword.module.scss";
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const passwordSchema = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be no more than 20 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "The passwords must match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof passwordSchema>;

export const CreateNewPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    console.log("Password created:", data);
  };

  return (
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
          
          <label className={s.labelPassword}>
            Your password must be between 6 and 20 characters
          </label>
        </div>
        
        <Button 
          type="submit" 
          variant="primary" 
          className={s.button}
          disabled={!isValid}
        >
          Create new password
        </Button>
      </form>
    </Card>
  );
};