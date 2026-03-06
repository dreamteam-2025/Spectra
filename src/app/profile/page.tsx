"use client";

import { useMeQuery } from "@/features/auth/api/authApi";
import { redirect } from "next/navigation";
import { Loader, ROUTES } from "@/shared";

export default function ProfileRedirectPage() {
  // делаем me-зарпос
  const { data: user, isLoading, error } = useMeQuery();

  // отображаем Loader при загрузке
  if (isLoading) return <Loader />;

  // если неавторизован или данные не прилетели
  if (error || !user) {
    // редирект на главную страницу
    redirect("/");
  }

  // иначе - редирект на страницу профиля с конкретным userId
  redirect(ROUTES.APP.PROFILE + "/" + user.userId);
}
