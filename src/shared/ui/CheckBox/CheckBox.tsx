"use client";

import React, { useId } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import s from "./CheckBox.module.scss";
import { Root } from "@radix-ui/react-checkbox";
import { ComponentPropsWithRef } from "react";
import clsx from "clsx";

type RadixRootProps = ComponentPropsWithRef<typeof Root>;

export type Props = Omit<RadixRootProps, "onCheckedChange"> & {
  id?: string;
  checked?: boolean | "indeterminate";
  onChange?: (checked: boolean | "indeterminate") => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  className?: string;
  children?: React.ReactNode;
};

export const CheckBox = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { id, checked, onChange, disabled, required, name, value, className, children, ...rest } = props;

  const generatedId = useId();
  const checkboxId = id || generatedId;

  const wrapperClassName = clsx(s.checkboxWrapper, className);

  return (
    <div className={wrapperClassName}>
      <CheckboxPrimitive.Root
        ref={ref}
        id={checkboxId}
        name={name}
        value={value}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        required={required}
        className={s.checkboxRoot}
        {...rest}
      >
        {/* CheckBox нажат, CheckboxPrimitive.Indicator рендерится */}
        <CheckboxPrimitive.Indicator className={s.checkboxIndicator}>
          <img src={"/icons/checked.svg"} alt="checked" className={s.checkboxIcon} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      {/* Label для CheckBox, при наличии */}
      {children && <span className={s.checkboxLabel}>{children}</span>}
    </div>
  );
});

// Отображаемое имя для React DevTools (и в стектрейсах ошибок)
CheckBox.displayName = "CheckBox";
