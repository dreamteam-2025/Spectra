"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const email = searchParams.get("email");

  useEffect(() => {
    if (!code) return;

    const qs = new URLSearchParams();
    qs.set("code", code);
    if (email) qs.set("email", email);

    router.replace(`/confirm-email?${qs.toString()}`);
  }, [code, email]);

  return (
    <main>
      <h1>Main Page</h1>
      <p>Some text here. Some text here. Some text here.</p>
    </main>
  );
}
