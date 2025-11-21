import React from "react";
import * as Radix from "@radix-ui/react-primitive";
import s from "./Button.module.scss";

type Props = {
  children: React.ReactNode;
  variant: "primary" | "secondary" | "outlined" | "small";
  disabled?: boolean;
  className?: string;
};

export const Button = ({ children, variant = "primary", disabled = false, className = "", ...rest }: Props) => {
  const classes = `${s.button} ${s[variant]} ${className}`.trim();

  return (
    <Radix.Primitive.button className={classes} disabled={disabled} {...rest}>
      {children}
    </Radix.Primitive.button>
  );
};
