"use client";

import { useMeQuery } from "@/features/auth/api/authApi";
import { redirect } from "next/navigation";
import { isFetchError, ROUTES } from "@/shared";
import { Loader } from "@/shared";

// Layout-защита роутов (от неавторизованных)
export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  // me-запрос вернет нам isLoading и ошибку (если неавторизован = 401)
  const { isLoading, error } = useMeQuery();

  // Пока запрос идёт - показываем Loader
  if (isLoading) return <Loader />;

  // Если прилетела ошибка и это именно 401 "Unauthorized"
  if (error && isFetchError(error) && error.status === 401) {
    // серверный редирект на страницу "/login"
    redirect(ROUTES.AUTH.LOGIN);
  }

  // если всё ок, отрисует чилды
  return <>{children}</>;
}
