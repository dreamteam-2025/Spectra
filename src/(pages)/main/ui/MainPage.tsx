import { PostList, RegisteredUsersCounter } from "@/widgets";
import { redirect } from "next/navigation";
import s from "./MainPage.module.scss";

type Props = {
  searchParams: Promise<{
    code?: string;
    email?: string;
  }>;
};

export const MainPage = async ({ searchParams }: Props) => {
  const { code, email } = await searchParams;

  if (code) {
    const qs = new URLSearchParams();
    qs.set("code", code);
    if (email) qs.set("email", email);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/check-recovery-code`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ recoveryCode: code }),
      cache: "no-store",
    });

    if (res.ok) redirect(`/create-new-password?${qs.toString()}`);
    else redirect(`/confirm-email?${qs.toString()}`);
  }

  return (
    <main className={s.contentWrapper}>
      <RegisteredUsersCounter />
      <PostList />
    </main>
  );
};
