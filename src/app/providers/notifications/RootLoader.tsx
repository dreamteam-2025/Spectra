"use client";

import { useGlobalLoading } from "./hooks/useGlobalLoading";
import { LinearProgress, useIsClient } from "@/shared";

export function RootLoader() {
  const isClient = useIsClient();
  const isGlobalLoading = useGlobalLoading();

  // раннее прерывание, на сервере - всегда возвращаем null
  // нам это необходимо, чтобы корректно отрабатывал SSG
  if (!isClient) return null;

  // на клиенте - показываем лоадер только если есть глобальная загрузка
  if (!isGlobalLoading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        width: "100%",
      }}
    >
      <LinearProgress />
    </div>
  );
}
