"use client";

import React, { ComponentProps } from "react";
import s from "./PostCard.module.scss";
import { StaticImageData } from "next/image";
import clsx from "clsx";
import { formatPostDate } from "@/shared/lib/utils/formatPostDate/formatPostDate";
import { ImageSlider } from "@/shared/ui/ImageSlider/ImageSlider";

type Slide = {
  id: number;
  postImage: string | StaticImageData;
};

type Props = {
  slides: Slide[];
  avatarImage?: string;
  userName: string;
  createdAt: string;
  text: string;
  className?: string;
} & ComponentProps<"article">;

export const PostCard = ({ slides, avatarImage, userName, createdAt, text, className }: Props) => {
  const [expanded, setExpanded] = React.useState(false);

  const hasText = Boolean(text?.trim());

  const expandedHandler = () => {
    setExpanded(prev => !prev);
  };

  return (
    <article className={clsx(s.card, className)}>
      <div className={s.media}>
        <ImageSlider slides={slides} />
      </div>

      <div className={s.content}>
        <img className={s.avatar} src={avatarImage || "/images/post-image-mock.png"} alt="avatar-image" />
        <h3 className={s.userName}>{userName}</h3>
      </div>

      <time className={s.time} dateTime={createdAt}>
        {formatPostDate(createdAt)}
      </time>

      {hasText && (
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
      )}
    </article>
  );
};
