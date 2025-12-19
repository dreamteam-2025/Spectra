import { SignIn } from "./SignIn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../model/validation";
import { Card } from "@/shared/ui/Card/Card";
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import Image from "next/image";
import Link from "next/link";
import s from "./SignIn.module.scss";
import z from "zod";
import { Meta, StoryObj } from "@storybook/nextjs";
import { ROUTES } from "@/shared";

type SignInForm = z.infer<typeof signInSchema>;

const meta: Meta<typeof SignIn> = {
  title: "Auth/SignIn",
  component: SignIn,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SignIn>;

// Простая история по умолчанию
export const Default: Story = {};

// Компонент для демонстрации ошибок
const SignInWithErrors = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "invalid-email",
      password: "123",
    },
  });

  const onSubmit = (data: SignInForm) => {
    console.log(data);
  };

  // Ручная установка ошибок для демонстрации
  const demoErrors = {
    email: { message: "Invalid email address" },
    password: { message: "Password must be at least 8 characters" },
  };

  return (
    <main>
      <Card className={s.main}>
        <h1 className={s.h1}>Sign In</h1>
        <div className={s.icons}>
          <button type="button">
            <Image src="/icons/google.svg" alt="google" width={36} height={36} />
          </button>
          <button type="button">
            <Image src="/icons/github.svg" alt="github" width={36} height={36} />
          </button>
        </div>

        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.inputs}>
            <Input
              label="Email"
              fullWidth
              {...register("email")}
              error={demoErrors.email.message}
              defaultValue="invalid-email"
            />

            <Input
              label="Password"
              fullWidth
              type="password"
              {...register("password")}
              error={demoErrors.password.message}
              defaultValue="123"
            />
          </div>

          <Link className={s.forgotPass} href={ROUTES.AUTH.FORGOT_PASSWORD}>
            Forgot Password
          </Link>

          <Button type="submit" className={s.signInBtn} variant="primary">
            Sign In
          </Button>

          <p className={s.text}>Don't have an account?</p>
          <Link className={s.signUpLink} href={ROUTES.AUTH.SIGNUP}>
            Sign Up
          </Link>
        </form>
      </Card>
    </main>
  );
};

export const WithErrors: Story = {
  render: () => <SignInWithErrors />,
};
