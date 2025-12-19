"use client";

import React, { useId } from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import s from "./RadioGroup.module.scss";
import { ComponentPropsWithRef } from "react";

type RadixRootProps = ComponentPropsWithRef<typeof RadioGroupPrimitive.Root>;
type RadixItemProps = ComponentPropsWithRef<typeof RadioGroupPrimitive.Item>;

// Компонент RadioGroup для группировки радиокнопок
export type RadioGroupProps = Omit<RadixRootProps, "onValueChange" | "onChange"> & {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  className?: string;
  children?: React.ReactNode;
};

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {
  const { value, onChange, disabled, required, name, className, children, ...rest } = props;

  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      value={value}
      onValueChange={onChange}
      disabled={disabled}
      required={required}
      name={name}
      className={`${s.radioGroup} ${className || ""}`}
      {...rest}
    >
      {children}
    </RadioGroupPrimitive.Root>
  );
});

RadioGroup.displayName = "RadioGroup";

// Компонент Radio - ТОЛЬКО для использования внутри RadioGroup
export type RadioProps = Omit<RadixItemProps, "onCheckedChange"> & {
  value: string;
  className?: string;
  children?: React.ReactNode;
};

export const Radio = React.forwardRef<HTMLButtonElement, RadioProps>((props, ref) => {
  const { value, className, children, ...rest } = props;

  const id = useId();
  const itemId = `radio-${value}-${id}`;

  return (
    <div className={`${s.radioWrapper} ${className || ""}`}>
      <RadioGroupPrimitive.Item ref={ref} id={itemId} value={value} className={s.radioItem} {...rest}>
        <RadioGroupPrimitive.Indicator className={s.radioIndicator} />
      </RadioGroupPrimitive.Item>

      {children && (
        <label htmlFor={itemId} className={s.radioLabel}>
          {children}
        </label>
      )}
    </div>
  );
});

// Отображаемое имя для React DevTools
Radio.displayName = "Radio";
