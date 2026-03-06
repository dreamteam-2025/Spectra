"use client";

import s from "./SideBar.module.scss";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { menuItems, logoutItem } from "./menuConfig";
import * as Icons from "./icons/Icons";
import { useLogout } from "@/features/auth/model/hooks/useLogout";
import { Dialog, Button } from "@/shared";

export const SideBar = () => {
  const { logout, isLoading } = useLogout();
  const router = useRouter();
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState("home");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Синхронизация активного элемента с текущим путем
  useEffect(() => {
    // const currentMenuItem = menuItems.find(item => item.path === pathname);
    // if (currentMenuItem) {
    //   setActiveItem(currentMenuItem.id);
    // } else {
    //   setActiveItem("home");
    // }

    const currentMenuItem = menuItems.find(item => {
      if (item.id === "profile") {
        // Разбиваем путь (pathname) на сегменты
        const segments = pathname.split("/").filter(Boolean);

        return segments[0] === item.id && segments.length <= 2;
      }
      return item.path === pathname;
    });

    setActiveItem(currentMenuItem?.id || "home");
  }, [pathname]);

  const group1Items = menuItems.filter(item => item.group === 1);
  const group2Items = menuItems.filter(item => item.group === 2);

  // Функция для безопасного получения компонента иконки
  const getIconComponent = (iconName: string) => {
    const iconKey = iconName as keyof typeof Icons;
    if (iconKey in Icons && Icons[iconKey]) {
      return Icons[iconKey];
    }

    console.warn(`Иконка "${iconName}" не найдена в модуле Icons`);
    return () => <div style={{ width: 20, height: 20, backgroundColor: "#ccc", marginRight: 10 }} />;
  };

  // Обработчик клика по обычным пунктам меню
  const handleMenuItemClick = (item: any) => {
    setActiveItem(item.id);
    if (item.path) {
      router.push(item.path);
    }
  };

  // Обработчик выхода из системы (после подтверждения)
  const handleLogoutConfirm = async () => {
    try {
      await logout();
      setActiveItem("home");
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  // Открытие диалога при клике на Log Out
  const handleLogoutClick = () => {
    if (!isLoading) {
      setIsDialogOpen(true);
    }
  };

  return (
    <>
      <aside className={s.sideBar}>
        <div className={s.wrapperUlCenterWidth}>
          <div className={s.mainUlSideBar}>
            <ul className={s.Ul1}>
              {group1Items.map(item => {
                const IconComponent = getIconComponent(item.component);
                const isActive = activeItem === item.id;

                return (
                  <li key={item.id} className={isActive ? s.active : ""} onClick={() => handleMenuItemClick(item)}>
                    <IconComponent isActive={isActive} />
                    {item.label}
                  </li>
                );
              })}
            </ul>

            <ul className={s.Ul2}>
              {group2Items.map(item => {
                const IconComponent = getIconComponent(item.component);
                const isActive = activeItem === item.id;

                return (
                  <li key={item.id} className={isActive ? s.active : ""} onClick={() => handleMenuItemClick(item)}>
                    <IconComponent isActive={isActive} />
                    {item.label}
                  </li>
                );
              })}
            </ul>
          </div>

          <ul className={s.Ul3}>
            <li
              onClick={handleLogoutClick}
              className={s.logoutItem}
              style={isLoading ? { opacity: 0.6, cursor: "not-allowed" } : {}}
            >
              {Icons.LogoutIcon ? (
                <Icons.LogoutIcon isActive={false} />
              ) : (
                <div style={{ width: 20, height: 20, backgroundColor: "#ccc", marginRight: 10 }} />
              )}
              {logoutItem.label}
              {isLoading && " (Выход...)"}
            </li>
          </ul>
        </div>
      </aside>

      {/* Диалоговое окно подтверждения выхода */}
      <Dialog
        open={isDialogOpen}
        className={s.dialogWrap}
        onOpenChange={setIsDialogOpen}
        title="Log Out"
        description="Are you really want to log out of your account Epam@epam.com?"
      >
        <div className={s.dialogButtons}>
          <Button variant="outlined" onClick={handleLogoutConfirm} disabled={isLoading} className={s.confirmButton}>
            Yes
          </Button>
          <Button
            variant="primary"
            onClick={() => setIsDialogOpen(false)}
            disabled={isLoading}
            className={s.cancelButton}
          >
            No
          </Button>
        </div>
      </Dialog>
    </>
  );
};
