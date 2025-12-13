"use client";

import { CSSProperties, HTMLAttributes, forwardRef } from "react";
import clsx from "clsx";
import s from "./Card.module.scss";

type Props = {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
} & HTMLAttributes<HTMLDivElement>;

export const Card = forwardRef<HTMLDivElement, Props>(
  ({ width, height, className = "", style, children, ...rest }, ref) => {
    const cardStyle: CSSProperties = {
      width,
      height,
      ...style,
    };

    const cardClassName = clsx(s.card, className);

    return (
      <div ref={ref} style={cardStyle} className={cardClassName} {...rest}>
        {children}
      </div>
    );
  }
);

// Отображаемое имя для React DevTools (и в стектрейсах ошибок)
Card.displayName = "Card";
