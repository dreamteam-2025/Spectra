"use client";

import s from "./NotificationBell.module.scss";

type Props = {
  count?: number;
  clickHandlerAction?: () => void;
};

export function NotificationBell({ count = 0, clickHandlerAction }: Props) {
  const bellUrl = "/icons/bell.svg";
  return (
    <div className={s.notificationIcon} onClick={clickHandlerAction}>
      <img src={bellUrl} alt="Notification bell icon" />
      {count > 0 && <span className={s.badge}>{count}</span>}
    </div>
  );
}
