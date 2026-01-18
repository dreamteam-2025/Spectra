"use client";
import s from "./SideBar.module.scss";
import { useState } from "react";
import { menuItems, logoutItem } from "./menuConfig";
import * as Icons from "./icons/Icons";

export const SideBar = () => {
  const [activeItem, setActiveItem] = useState("feed");

  const group1Items = menuItems.filter(item => item.group === 1);
  const group2Items = menuItems.filter(item => item.group === 2);

  return (
    <aside className={s.sideBar}>
      <div className={s.wrapperUlCenterWidth}>
        <div className={s.mainUlSideBar}>
          <ul className={s.Ul1}>
            {group1Items.map(item => {
              const IconComponent = Icons[item.component as keyof typeof Icons];
              const isActive = activeItem === item.id;

              return (
                <li key={item.id} className={isActive ? s.active : ""} onClick={() => setActiveItem(item.id)}>
                  <IconComponent isActive={isActive} />
                  {item.label}
                </li>
              );
            })}
          </ul>

          <ul className={s.Ul2}>
            {group2Items.map(item => {
              const IconComponent = Icons[item.component as keyof typeof Icons];
              const isActive = activeItem === item.id;

              return (
                <li key={item.id} className={isActive ? s.active : ""} onClick={() => setActiveItem(item.id)}>
                  <IconComponent isActive={isActive} />
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>

        <ul className={s.Ul3}>
          <li className={activeItem === logoutItem.id ? s.active : ""} onClick={() => setActiveItem(logoutItem.id)}>
            <Icons.LogoutIcon isActive={activeItem === logoutItem.id} />
            {logoutItem.label}
          </li>
        </ul>
      </div>
    </aside>
  );
};
