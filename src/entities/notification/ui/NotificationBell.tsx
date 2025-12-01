"use client";

import s from "./NotificationBell.module.scss";

type Props = {
  count?: number;
  clickHandler?: () => void;
};

export function NotificationBell({ count = 0, clickHandler }: Props) {
  const bellUrl = "/icons/bell.svg";
  return (
    <div className={s.notificationIcon} onClick={clickHandler}>
      <img src={bellUrl} alt="Notification bell icon" />
      {count > 0 && <span className={s.badge}>{count}</span>}
    </div>
  );
}
