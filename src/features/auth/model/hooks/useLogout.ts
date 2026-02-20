"use client";

import { useRouter } from "next/navigation";
import { useLogoutMutation } from "@/features/auth";
import { ROUTES } from "@/shared";

export const useLogout = () => {
  const router = useRouter();
  const [logoutMutation, { isLoading }] = useLogoutMutation();

  const logout = async () => {
    try {
      // Выполняем logout на сервере через RTK Query
      await logoutMutation().unwrap();

      // Редирект на страницу login
      // (replace чтобы не сохранять в истории браузера, предпочтительно при logout)
      router.replace(ROUTES.APP.HOME);
      // Обновляем данные на странице
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return { logout, isLoading };
};
