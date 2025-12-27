"use client";

import type { RootState } from "@/app/providers";
import { authApi } from "@/features";
import { useSelector } from "react-redux";

// Список эндпоинтов для исключения из глобального индикатора
const excludedEndpoints = [authApi.endpoints.me.name];

export const useGlobalLoading = () => {
  return useSelector((state: RootState) => {
    // Получаем все активные запросы из RTK Query API
    const queries = Object.values(state.baseApi.queries || {});
    const mutations = Object.values(state.baseApi.mutations || {});

    // Проверяем, есть ли активные запросы (статус "pending")
    const hasActiveQueries = queries.some(query => {
      // раннее прерывание если статус не "peding"
      if (query?.status !== "pending") return;
      // если массив с исключениями включает данный запрос
      if (excludedEndpoints.includes(query.endpointName)) {
        const completedQueries = queries.filter(q => q?.status === "fulfilled");
        return completedQueries.length > 0;
      }
    });
    const hasActiveMutations = mutations.some(mutation => mutation?.status === "pending");

    return hasActiveQueries || hasActiveMutations;
  });
};
