"use client";
import cx from "clsx";
import s from "./RegisteredUsersCounter.module.scss";
import { useGetPublicUsersCountQuery } from "@/shared/api";

export const RegisteredUsersCounter = () => {
  const { data } = useGetPublicUsersCountQuery();
  const number = data?.totalCount || 0;

  const formattedNumber = String(number).padStart(6, "0");
  const digits = formattedNumber.split("");

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Registered users:</h2>
      <div className={s.count}>
        {digits.map((digit, index) => (
          <div
            key={index}
            className={cx(s.digit, {
              [s.withBorder]: index < digits.length - 1,
            })}
          >
            {digit}
          </div>
        ))}
      </div>
    </div>
  );
};
