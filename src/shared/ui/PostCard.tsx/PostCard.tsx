"use client";

import React, { ComponentProps } from "react";
import s from "./PostCard.module.scss";
import Image, { StaticImageData } from "next/image";
import clsx from "clsx";
import { formatPostDate } from "@/shared/lib/utils/formatPostDate/formatPostDate";

type Props = {
  postImage: StaticImageData;
  avatarImage: StaticImageData;
  userName: string;
  createdAt: string;
  text: string;
  className?: string;
} & ComponentProps<"article">;

export const PostCard = ({ postImage, avatarImage, userName, createdAt, text, className }: Props) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const expandedHandler = () => {
    setExpanded(prev => !prev);
  };

  return (
    <article className={clsx(s.card, className)}>
      <div className={s.media}>
        <Image className={s.postImage} src={postImage} alt="post-image" />
      </div>
      <div className={s.content}>
        <Image className={s.avatar} src={avatarImage} alt="avatar-image" />
        <h3 className={s.userName}>{userName}</h3>
      </div>
      <time className={s.time} dateTime={createdAt}>
        {formatPostDate(createdAt)}
      </time>
      <div className={s.textWrapper}>
        {!expanded && (
          <>
            <p className={clsx(s.text, s.collapsed)}>{text}</p>

            <button type="button" className={clsx(s.toggle, s.toggleAbsolute)} onClick={expandedHandler}>
              Show more
            </button>
          </>
        )}

        {expanded && (
          <p className={s.text}>
            {text}{" "}
            <button type="button" className={clsx(s.toggle, s.toggleInline)} onClick={expandedHandler}>
              Hide
            </button>
          </p>
        )}
      </div>
    </article>
  );
};
