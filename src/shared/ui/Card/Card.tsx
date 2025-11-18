import { CSSProperties, HTMLAttributes } from "react";
import s from "./Card.module.scss";

type Props = {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
} & HTMLAttributes<HTMLDivElement>;

export const Card = ({ width, height, className = "", style, children, ...rest }: Props) => {
  const cardStyle: CSSProperties = {
    width,
    height,
    ...style,
  };

  const cardClassName = `${s.card} ${className}`.trim();

  return (
    <div style={cardStyle} className={cardClassName} {...rest}>
      {children}
    </div>
  );
};
