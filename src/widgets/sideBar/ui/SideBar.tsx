"use client";
import s from "./SideBar.module.scss";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { menuItems, logoutItem } from "./menuConfig";
import * as Icons from "./icons/Icons";

export const SideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState("feed");

  // Синхронизация активного элемента с текущим путем
  useEffect(() => {
    // Находим элемент меню, соответствующий текущему пути
    const currentMenuItem = menuItems.find(item => item.path === pathname);
    if (currentMenuItem) {
      setActiveItem(currentMenuItem.id);
    }
  }, [pathname]);

  const group1Items = menuItems.filter(item => item.group === 1);
  const group2Items = menuItems.filter(item => item.group === 2);

  // Функция для безопасного получения компонента иконки
  const getIconComponent = (iconName: string) => {
    const iconKey = iconName as keyof typeof Icons;
    if (iconKey in Icons && Icons[iconKey]) {
      return Icons[iconKey];
    }

    // Если иконка не найдена, вернем заглушку
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

  // Обработчик выхода из системы
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });

      // Очищаем состояние
      setActiveItem("feed");

      // Перенаправляем на страницу логина
      router.push("/login");
      router.refresh(); // Обновляем данные на странице
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  return (
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
          <li onClick={handleLogout} className={s.logoutItem}>
            {/* Проверяем наличие LogoutIcon */}
            {Icons.LogoutIcon ? (
              <Icons.LogoutIcon isActive={false} />
            ) : (
              <div style={{ width: 20, height: 20, backgroundColor: "#ccc", marginRight: 10 }} />
            )}
            {logoutItem.label}
          </li>
        </ul>
      </div>
    </aside>
  );
};
