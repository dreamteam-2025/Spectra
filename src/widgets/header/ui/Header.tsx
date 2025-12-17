"use client";

import s from "./Header.module.scss";
import { Button } from "@/shared";
import Link from "next/link";
import { ROUTES } from "@/shared";
import { LanguageSelect, useMeQuery } from "@/features";
import { NotificationBell } from "@/entities";

export const Header = () => {
  // вызываем хук, он выполняет GET-запрос
  // для получения информации о статусе авторизации тебя в приложении
  const { data: meResponse } = useMeQuery();

  return (
    <header className={s.header}>
      <div className={s.inner}>
        <div className={s.row}>
          <div className={s.logo}>
            <span className="largeHeading">Spectra</span>
          </div>

          <div className={s.right}>
            {meResponse?.userName && (
              <NotificationBell count={5} clickHandlerAction={() => alert("click the bell")}></NotificationBell>
            )}

            <LanguageSelect />

            {!meResponse?.userName && (
              <>
                <Link href={ROUTES.AUTH.LOGIN}>
                  <Button variant="ghost">Log In</Button>
                </Link>
                <Link href={ROUTES.AUTH.SIGNUP}>
                  <Button variant="primary">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
