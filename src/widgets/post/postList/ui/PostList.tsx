import clsx from "clsx";
import React from "react";
import { mockPosts } from "../model/mock";
import { PostCard } from "@/shared";
import s from "./PostList.module.scss";

type Props = {
  className?: string;
};

export const PostList = ({ className }: Props) => {
  return (
    <div className={clsx(s.list, className)}>
      {mockPosts.map(post => (
        <PostCard
          key={post.id}
          postImage={post.postImage}
          avatarImage={post.avatarImage}
          userName={post.userName}
          createdAt={post.createdAt}
          text={post.text}
        />
      ))}
    </div>
  );
};
