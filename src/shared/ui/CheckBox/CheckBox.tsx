"use client";

import React, { useId } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import s from "./CheckBox.module.scss";
import { Props } from "./CheckBox.types";

export const CheckBox = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { checked, onChange, disabled, required, name, value, className, children, ...rest } = props;

  const id = useId();

  return (
    <div className={`${s.checkboxWrapper} ${className || ""}`}>
      <CheckboxPrimitive.Root
        ref={ref}
        id={id}
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
      {children && (
        <label htmlFor={id} className={s.checkboxLabel}>
          {children}
        </label>
      )}
    </div>
  );
});

// Отображаемое имя для React DevTools (и в стектрейсах ошибок)
CheckBox.displayName = "CheckBox";
