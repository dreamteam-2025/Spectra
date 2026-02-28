"use client";

import clsx from "clsx";
import s from "./UserAvatar.module.scss";
import Image, { ImageProps } from "next/image";
import fallbackSrc from "@/shared/assets/images/avatar-fallback.jpg";
import { useCallback, useEffect, useState } from "react";

type Props = {
  width?: number;
  height?: number;
  src?: ImageProps["src"];
  className?: string;
  alt?: string;
  priority?: boolean;
} & Omit<ImageProps, "src" | "alt" | "width" | "height" | "priority" | "className">;

export const UserAvatar = ({
  width = 204,
  height = 204,
  src,
  className,
  alt = "user avatar",
  priority = false,
  ...props
}: Props) => {
  // если в src передали "", то считаем его отсутствующим
  const initialSrc = src && src !== "" ? src : fallbackSrc;
  const [imgSrc, setImgSrc] = useState(initialSrc);

  // обновить состояние при изменении src извне
  useEffect(() => {
    setImgSrc(src && src !== "" ? src : fallbackSrc);
  }, [src]);

  // обработчик ошибки загрузки изображения
  const handleError = useCallback(() => {
    if (imgSrc !== fallbackSrc) setImgSrc(fallbackSrc);
  }, [imgSrc]);

  return (
    <Image
      sizes={"(max-width: 768px) 100vw, 1440px"}
      width={width}
      height={height}
      alt={alt}
      src={imgSrc}
      className={clsx(s.avatar, className)}
      onError={handleError}
      priority={priority}
      {...props}
    />
  );
};
