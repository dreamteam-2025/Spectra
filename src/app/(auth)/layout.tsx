"use client";

import { useMeQuery } from "@/features/auth/api/authApi";
import { useRouter } from "next/navigation";
import { Loader, ROUTES } from "@/shared";
import { useEffect, useState } from "react";

export default function AuthProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isLoading, data } = useMeQuery();

  // Состояние для контроля рендеринга
  const [shouldShowContent, setShouldShowContent] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      //Если пользователь уже авторизован, перенаправляем на главную
      if (data && data.userId) {
        router.push(ROUTES.APP.HOME);
        return;
      } else {
        // Не авторизован - показываем контент
        setShouldShowContent(true);
      }
    }
  }, [data, router, isLoading]);

  // Отображаем Loader пока идёт запрос
  if (isLoading || !shouldShowContent) {
    return <Loader />;
  }

  return <>{children}</>;
}
