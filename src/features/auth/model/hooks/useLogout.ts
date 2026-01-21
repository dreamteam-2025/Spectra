"use client";

import { useRouter } from "next/navigation";
import { useLogoutMutation } from "@/features/auth";
import { ROUTES } from "@/shared";
import { useEffect } from "react";

export const useLogout = () => {
  const router = useRouter();
  const [logoutMutation, { isLoading, isSuccess, isError }] = useLogoutMutation();

  // Обрабатываем успешный выход
  useEffect(() => {
    if (isSuccess) {
      sessionStorage.removeItem("accessToken");
      router.push(ROUTES.AUTH.LOGIN);
      router.refresh();
    }
  }, [isSuccess, router]);

  // Обрабатываем ошибку
  useEffect(() => {
    if (isError) {
      console.error("Logout failed");
    }
  }, [isError]);

  const logout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return { logout, isLoading };
};
