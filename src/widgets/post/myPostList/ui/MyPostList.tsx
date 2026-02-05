"use client";

import clsx from "clsx";
import { useMemo } from "react";
import { PostCard } from "@/shared";
import s from "./MyPostList.module.scss";
import { useGetMyPostsInfiniteQuery } from "@/features/post/api/postApi";
import { useInfiniteScroll } from "@/widgets/post/postList/model/hooks/useInfinityScroll";
import { Loader } from "@/shared/ui/Loader/Loader";
import { useMeQuery } from "@/features";
import { skipToken } from "@reduxjs/toolkit/query";

interface Props {
  className?: string;
}

export const MyPostList = ({ className }: Props) => {
  const { data: me, isLoading: isMeLoading } = useMeQuery();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetMyPostsInfiniteQuery(
    me?.userId ? { userId: me.userId, pageSize: 10 } : skipToken
  );

  const posts = useMemo(() => data?.pages.flatMap(page => page.items) ?? [], [data]);

  const loadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  if (isMeLoading) {
    return <Loader />;
  }

  if (!me) {
    return null;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={clsx(s.list, className)}>
      {posts.map(post => (
        <PostCard
          key={post.id}
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

      {hasNextPage && <div ref={loadMoreRef} />}
    </div>
  );
};
