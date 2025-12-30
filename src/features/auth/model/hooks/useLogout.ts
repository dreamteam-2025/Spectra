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
      router.push(ROUTES.AUTH.LOGIN);
      // Обновляем данные на странице
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      //   // Даже при ошибке делаем редирект
      //   router.push("/login");
    }
  };

  return { logout, isLoading };
};
