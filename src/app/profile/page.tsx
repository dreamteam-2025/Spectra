"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ROUTES } from "@/shared";

export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");


    if (!token) {
      router.replace(ROUTES.AUTH.LOGIN);
    }
  }, [router]);

  return <div>Profile page</div>;
}
