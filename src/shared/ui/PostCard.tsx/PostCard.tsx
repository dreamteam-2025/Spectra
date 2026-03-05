"use client";

import React, { ComponentProps } from "react";
import s from "./PostCard.module.scss";
import { StaticImageData } from "next/image";
import clsx from "clsx";
import { formatPostDate } from "@/shared/lib/utils/formatPostDate/formatPostDate";
import { ImageSlider } from "@/shared/ui/ImageSlider/ImageSlider";
import { UserAvatar } from "@/entities";
import Link from "next/link";

type Slide = {
  id: number;
  postImage: string | StaticImageData;
};

type BaseProps = {
  slides: Slide[];
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & ComponentProps<"article">;

type FullVariantProps = BaseProps & {
  variant: "full";
  avatarImage?: string | StaticImageData;
  userName: string;
  createdAt: string;
  text?: string;
  userId: number;
};

type ThumbVariantProps = BaseProps & {
  variant: "thumb";
  avatarImage?: never;
  userName?: never;
  createdAt?: never;
  text?: never;
  userId?: never;
};

type Props = FullVariantProps | ThumbVariantProps;

export const PostCard = ({
  slides,
  avatarImage,
  userName,
  createdAt,
  text,
  className,
  variant,
  userId,
  onClick,
  ...props
}: Props) => {
  const [expanded, setExpanded] = React.useState(false);

  const hasText = Boolean(text?.trim());

  const expandedHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(prev => !prev);
  };

  return (
    <article className={clsx(s.card, variant === "thumb" && s.thumb, className)} {...props}>
      <div className={s.media} onClick={onClick}>
        <ImageSlider slides={slides} />
      </div>

      {variant === "full" && (
        <>
          {(avatarImage || userName) && (
            <div className={s.content}>
              <UserAvatar src={avatarImage} alt={userName} width={36} height={36} className={s.avatar} />
              {userName && (
                <Link href={`/profile/${userId}`}>
                  <h3 className={s.userName}>{userName}</h3>
                </Link>
              )}
            </div>
          )}
          {createdAt && (
            <time className={s.time} dateTime={createdAt}>
              {formatPostDate(createdAt)}
            </time>
          )}
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
        </>
      )}
    </article>
  );
};
