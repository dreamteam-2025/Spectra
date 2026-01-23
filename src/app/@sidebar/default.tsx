"use client";

import { useMeQuery } from "@/features";
import { SideBar } from "@/widgets";

export default function SidebarSlot() {
  const { data: meResponse, isLoading } = useMeQuery();

  //   if (isLoading) {
  //     return <SidebarSkeleton />;
  //   }

  if (!meResponse?.userName) {
    // если пользователь не авторизован, то не показывать sidebar
    return null;
  }

  //return <Sidebar />;
  return <SideBar />;
}
