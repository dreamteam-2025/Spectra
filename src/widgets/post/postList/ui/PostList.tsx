"use client";

import clsx from "clsx";
import { useMemo } from "react";
import { PostCard } from "@/shared";
import s from "./PostList.module.scss";
import { useGetPostsInfiniteQuery } from "@/features/post/api/postApi";
import { useInfiniteScroll } from "@/widgets/post/postList/model/hooks/useInfinityScroll";
import { Loader } from "@/shared/ui/Loader/Loader";

type Props = { className?: string };

export const PostList = ({ className }: Props) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetPostsInfiniteQuery({
    pageSize: 10,
  });

  const posts = useMemo(() => data?.pages.flatMap(page => page.items) ?? [], [data]);

  const loadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

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
