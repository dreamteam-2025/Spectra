import { Button } from "@/shared";
import Image from "next/image";
import s from "./PasswordRecovery.module.scss";

export const PasswordRecovery = () => {
  return (
    <main>
      <h1 className={s.heading}>Email verification link expired</h1>
      <div className={s.wrapper}>
        <p className={s.constrainedWidth}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </p>
        <Button variant={"primary"} className={s.constrainedWidth}>
          Resend link
        </Button>
        <Image src="/images/time-management_rafiki.svg" alt="time-management" width={473} height={353} />
      </div>
    </main>
  );
};
