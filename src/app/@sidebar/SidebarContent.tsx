"use client";

import { useMeQuery } from "@/features";
import { SideBar } from "@/widgets";

export const SidebarContent = () => {
  const { data: meResponse, isLoading } = useMeQuery();

  if (isLoading) {
    //   return <SidebarSkeleton />;
    return null;
  }

  if (!meResponse?.userName) {
    // если пользователь не авторизован, то не показывать sidebar
    return null;
  }

  return <SideBar />;
};
