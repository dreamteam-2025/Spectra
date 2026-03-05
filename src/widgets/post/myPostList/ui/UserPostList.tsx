"use client";

import clsx from "clsx";
import { useMemo, useState } from "react";
import { PostCard } from "@/shared";
import s from "./UserPostList.module.scss";
import { useGetUserPostsInfiniteQuery } from "@/features/post/api/postApi";
import { useInfiniteScroll } from "@/widgets/post/postList/model/hooks/useInfinityScroll";
import { Loader } from "@/shared/ui/Loader/Loader";
import { ViewPostModal } from "@/features";

interface Props {
  className?: string;
  userId: number;
}

export const UserPostList = ({ userId, className }: Props) => {
  const [selectedPostId, setSelectedPostId] = useState<null | number>(null);

  const { data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetUserPostsInfiniteQuery({
    userId,
    pageSize: 10,
  });

  const posts = useMemo(() => data?.pages.flatMap(page => page.items) ?? [], [data]);

  const loadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  if (isLoading) return <Loader />;
  if (error) return <p>Failed to load posts</p>;
  if (!posts.length) return <p>User has no posts</p>;

  const openPostHandler = (id: number) => {
    setSelectedPostId(id);
  };

  const closeHandler = () => {
    setSelectedPostId(null);
  };

  return (
    <div className={clsx(s.list, className)}>
      {posts.map(post => (
        <PostCard
          key={post.id}
          onClick={() => openPostHandler(post.id)}
          slides={post.images.map((img, index) => ({
            id: index,
            postImage: img.url,
          }))}
          variant="thumb"
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
      {hasNextPage && <div ref={loadMoreRef} />}
    </div>
  );
};
