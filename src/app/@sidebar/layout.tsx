import { SidebarContent } from "./SidebarContent";

// Это один "общий родитель" для всех состояний слота sidebar
export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarContent />
      {children}
    </>
  );
}
