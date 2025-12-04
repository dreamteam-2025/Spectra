"use client";

import s from "./Header.module.scss";
import { Button } from "@/shared";
import Link from "next/link";
import { ROUTES } from "@/shared";
import { LanguageSelect } from "@/features";
import { NotificationBell } from "@/entities";

export const Header = () => {
  const isLoggedIn = true;

  return (
    <header className={s.header}>
      <div className={s.inner}>
        <div className={s.row}>
          <div className={s.logo}>
            <span className="largeHeading">Spectra</span>
          </div>

          <div className={s.right}>
            {isLoggedIn && <NotificationBell count={5} clickHandler={() => alert("click the bell")}></NotificationBell>}

            <LanguageSelect />

            {!isLoggedIn && (
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
