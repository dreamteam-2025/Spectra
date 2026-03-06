"use client";

import s from "./Header.module.scss";
import { Button } from "@/shared";
import Link from "next/link";
import { ROUTES } from "@/shared";
import { LanguageSelect, useMeQuery } from "@/features";
import { NotificationBell } from "@/entities";
import clsx from "clsx";

export const Header = () => {
  // вызываем хук, он выполняет GET-запрос
  // для получения информации о статусе авторизации тебя в приложении
  const { data: meResponse } = useMeQuery();

  return (
    <header className={s.header}>
      <div className={s.inner}>
        <div className={s.row}>
          <div className={s.logo}>
            <Link href={ROUTES.APP.HOME} className={s.largeHeading}>
              Spectra
            </Link>
            {/* <span className="largeHeading">Spectra</span> */}
          </div>

          <div className={s.right}>
            {meResponse?.userName && (
              <NotificationBell count={5} clickHandlerAction={() => alert("click the bell")}></NotificationBell>
            )}

            <LanguageSelect />

            {!meResponse?.userName && (
              <>
                <Link href={ROUTES.AUTH.LOGIN} className={s.link}>
                  Log In
                </Link>
                <Link href={ROUTES.AUTH.SIGNUP} className={clsx(s.link, s.button)}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
