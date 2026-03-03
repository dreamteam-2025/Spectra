"use client";

import clsx from "clsx";
import { useState } from "react";
import { PostCard } from "@/shared";
import s from "./PostList.module.scss";
import { useGetPostsQuery } from "@/features/post/api/postApi";
import { Loader } from "@/shared/ui/Loader/Loader";
import { ViewPostModal } from "@/features/post";

type Props = { className?: string };

export const PostList = ({ className }: Props) => {
  const { data: posts, isLoading } = useGetPostsQuery({ pageSize: 4 }, { pollingInterval: 60000 }); // по ТЗ обновление каждую минуту);

  const [selectedPostId, setSelectedPostId] = useState<null | number>(null);

  if (isLoading) {
    return <Loader />;
  }

  const openPostHandler = (id: number) => {
    setSelectedPostId(id);
  };

  const closeHandler = () => {
    setSelectedPostId(null);
  };

  return (
    <div className={clsx(s.list, className)}>
      {posts?.map(post => (
        <PostCard
          key={post.id}
          onClick={() => openPostHandler(post.id)}
          slides={post.images.map((img, index) => ({
            id: index,
            postImage: img.url,
          }))}
          avatarImage={post.avatarOwner}
          userId={post.ownerId}
          userName={post.userName}
          createdAt={post.createdAt}
          text={post.description}
          variant="full"
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
