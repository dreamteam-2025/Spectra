"use client";

import { useGlobalLoading } from "./hooks/useGlobalLoading";
import { LinearProgress } from "@/shared";

export function RootLoader() {
  const isGlobalLoading = useGlobalLoading();

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
