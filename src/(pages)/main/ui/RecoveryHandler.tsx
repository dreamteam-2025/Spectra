"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const RecoveryHandler = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const email = searchParams.get("email");

  useEffect(() => {
    if (code) {
      const qs = new URLSearchParams();
      qs.set("code", code);
      if (email) qs.set("email", email);

      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/check-recovery-code`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ recoveryCode: code }),
      })
        .then(res => {
          if (res.ok) router.push(`/create-new-password?${qs.toString()}`);
          else router.push(`/confirm-email?${qs.toString()}`);
        })
        .catch(() => router.push(`/confirm-email?${qs.toString()}`));
    }
  }, [code, email, router]);

  return null;
};
