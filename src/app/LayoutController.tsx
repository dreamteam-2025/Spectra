"use client";

import { Header } from "@/widgets";
import { usePathname } from "next/navigation";
import { RootLoader } from "./providers/notifications/RootLoader";

export function LayoutController({ children, sidebar }: { children: React.ReactNode; sidebar?: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = pathname?.startsWith("/auth/") || pathname?.startsWith("/oauth/");

  return (
    <>
      {/* Мы не покажем Header, если это ouath popup */}
      {!hideLayout && <Header />}
      <RootLoader />

      <div className="appContainer">
        {/* Мы не покажем Sidebar, если это ouath popup */}
        {!hideLayout && (sidebar || <div className="sidebarPlaceholder" />)}
        <main className="mainContent">{children}</main>
      </div>
    </>
  );
}
