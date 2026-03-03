"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { PostCard } from "@/shared";
import s from "./PostList.module.scss";
import { useGetPostsQuery } from "@/features/post/api/postApi";
import { Loader } from "@/shared/ui/Loader/Loader";
import { ViewPostModal } from "@/features/post";
import { useAppDispatch } from "@/shared/lib";
import { postApi } from "@/features/post/api/postApi";
import type { Post } from "@/features/post/api/postApi.types";

type Props = {
  className?: string;
  initialPosts?: Post[];
};

export const PostList = ({ className, initialPosts = [] }: Props) => {
  const dispatch = useAppDispatch();
  const [selectedPostId, setSelectedPostId] = useState<null | number>(null);

  // заполняем кеш RTK Query начальными данными при монтировании (initialPosts из пропсов)
  // после гидратации
  useEffect(() => {
    if (initialPosts.length > 0) {
      dispatch(postApi.util.upsertQueryData("getPosts", { pageSize: 4 }, initialPosts));
    }
  }, [dispatch, initialPosts]);

  // хук RTK Query получает данные из кеша и автоматически обновляет их с polling 60 с
  // (по ТЗ обновление данных каждую минуту)
  const { data: posts, isLoading } = useGetPostsQuery({ pageSize: 4 }, { pollingInterval: 60000 });
  // показываем Loader, если данные ещё не загрузились и нет начальных
  if (isLoading && !initialPosts.length) return <Loader />;

  // отображаем данные: сначала из кеша RTKQ, иначе начальные (пока кеш не заполнится)
  const displayPosts = posts?.length ? posts : initialPosts;

  const openPostHandler = (id: number) => setSelectedPostId(id);
  const closeHandler = () => setSelectedPostId(null);

  return (
    <div className={clsx(s.list, className)}>
      {displayPosts?.map(post => (
        <PostCard
          key={post.id}
          onClick={() => openPostHandler(post.id)}
          slides={post.images.map((img, index) => ({
            id: index,
            postImage: img.url,
          }))}
          avatarImage={post.avatarOwner}
          userName={post.userName}
          createdAt={post.createdAt}
          text={post.description}
        />
      ))}
      {selectedPostId && (
        <ViewPostModal
          postId={selectedPostId}
          open={!!selectedPostId}
          onOpenChange={open => {
            if (!open) closeHandler();
          }}
        />
      )}
    </div>
  );
};
