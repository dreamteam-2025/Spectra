"use client";

import { useMeQuery } from "@/features/auth/api/authApi";
import { redirect } from "next/navigation";
import { isFetchError } from "@/shared";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isLoading, error } = useMeQuery();

  if (isLoading) return <div>Загрузка...</div>; // временный лоадер

  if (error && isFetchError(error) && error.status === 401) {
    redirect("/login");
  }

  return <>{children}</>;
}
