import { PostList, RegisteredUsersCounter } from "@/widgets";
import s from "./MainPage.module.scss";
import type { Post } from "@/features/post/api/postApi.types";
import { RecoveryHandler } from "./RecoveryHandler";
import { Suspense } from "react";

type Props = {
  initialPosts: Post[];
};

export const MainPage = ({ initialPosts }: Props) => {
  return (
    <main className={s.contentWrapper}>
      <Suspense fallback={null}>
        <RecoveryHandler />
        <RegisteredUsersCounter />
      </Suspense>
      {/* Отрисовка 4 постов на главной странице, посты загружены на сервере */}
      <PostList initialPosts={initialPosts} />
    </main>
  );
};
