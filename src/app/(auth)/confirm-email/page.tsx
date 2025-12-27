"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useConfirmRegistrationMutation } from "@/features/auth/api/authApi";
import { ROUTES } from "@/shared";

export default function ConfirmEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const [confirmRegistration] = useConfirmRegistrationMutation();

  useEffect(() => {
    if (!code) {
      router.replace(ROUTES.AUTH.VERIFICATION_EXPIRED);
      return;
    }

    const confirmEmail = async () => {
      try {
        await confirmRegistration({ confirmationCode: code }).unwrap();
        router.replace(ROUTES.AUTH.EMAIL_VERIFIED);
      } catch (err) {
        console.log("Email confirmation failed", err);
        router.replace(ROUTES.AUTH.VERIFICATION_EXPIRED);
      }
    };

    confirmEmail();
  }, [code, confirmRegistration, router]);

  return null;
}
