import { ROUTES } from "@/shared/";
import Link from "next/link";
import s from "./BackToSignUp.module.scss";

export const BackToSignUp = () => {
  return (
    <div className={s.wrapper}>
      <Link href={ROUTES.AUTH.SIGNUP} className={s.backToSignUp}>
        <img src="icons/arrow-back-outline.svg" alt="Back to Sign Up" />
        Back to Sign Up
      </Link>
    </div>
  );
};
