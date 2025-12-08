"use client";

import { Button } from "@/shared";
import Image from "next/image";
import s from "./EmailVerified.module.scss";
import { useRedirectToSignIn } from "../model/hooks/useRedirectToSignin";

export const EmailVerified = () => {
  const handleSignInRedirect = useRedirectToSignIn();

  return (
    <main className={s.page}>
      <h1 className={s.heading}>Congratulations!</h1>
      <div className={s.wrapper}>
        <p className={s.confirmationText}>Your email has been confirmed</p>
        <Button variant={"primary"} className={s.signinBtn} onClick={handleSignInRedirect}>
          Sign In
        </Button>
        <Image src="/images/email-verified.svg" alt="email successfully verified" width={432} height={300} />
      </div>
    </main>
  );
};
