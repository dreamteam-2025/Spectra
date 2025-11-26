import React, { ComponentProps } from "react";
import { Primitive } from "@radix-ui/react-primitive";
import s from "./Button.module.scss";

type Props = {
  children: React.ReactNode;
  variant: "primary" | "secondary" | "outlined" | "ghost";
  disabled?: boolean;
  className?: string;
} & ComponentProps<typeof Primitive.button>;

export const Button = ({ children, variant = "primary", disabled = false, className = "", ...rest }: Props) => {
  const classes = [s.button, s[variant], className].filter(Boolean).join(" ");

  return (
    <Primitive.button className={classes} disabled={disabled} {...rest}>
      {children}
    </Primitive.button>
  );
};
