"use client";

import { useMeQuery } from "@/features/auth/api/authApi";
import { redirect } from "next/navigation";
import { isFetchError } from "@/shared";
import { Loader } from "@/shared/ui/Loader/Loader";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isLoading, error } = useMeQuery();

  if (isLoading) return <Loader/>

  if (error && isFetchError(error) && error.status === 401) {
    redirect("/login");
  }

  return <>{children}</>;
}
