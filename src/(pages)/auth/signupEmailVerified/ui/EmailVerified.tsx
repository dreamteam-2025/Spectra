"use client";

import { Button, ROUTES } from "@/shared";
import Image from "next/image";
import s from "./EmailVerified.module.scss";
import { useRouter } from "next/navigation";

export const EmailVerified = () => {
  const router = useRouter();

  return (
    <main>
      <h1 className={s.heading}>Congratulations!</h1>
      <div className={s.wrapper}>
        <p className={s.confirmationText}>Your email has been confirmed</p>
        <Button variant={"primary"} className={s.signinBtn} onClick={() => router.push(ROUTES.AUTH.LOGIN)}>
          Sign In
        </Button>
        <Image src="/images/email-verified.svg" alt="email successfully verified" width={432} height={300} />
      </div>
    </main>
  );
};
