"use client";

import * as Select from "@radix-ui/react-select";
import s from "./SelectBox.module.scss";
import { Props } from "./SelectBox.types";
import { useId } from "react";

export const SelectBox = (props: Props) => {
  const { value, label, options, disabled, placeholder, onChange, width, height, ...rest } = props;
  const selected = options.find(o => o.value === value);

  const id = useId();

  return (
    <>
      <div className="wrapper">
        {label && (
          <label htmlFor={id} className={s.label}>
            {label}
          </label>
        )}
        <Select.Root {...rest} value={value} onValueChange={onChange} disabled={disabled}>
          <Select.Trigger
            id={id}
            className={s.trigger}
            style={
              {
                "--select-width": width,
                "--select-height": height,
              } as React.CSSProperties
            }
            aria-label={label || placeholder || ""}
          >
            {selected?.icon && (
              <Select.Icon className={s.iconLeft}>
                <img src={`/icons/${selected.icon}.svg`} alt="icon" />
              </Select.Icon>
            )}

            <Select.Value placeholder={placeholder} />

            <Select.Icon className={s.icon}>
              <img src="icons/arrow.svg" alt="arrow" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className={s.content} sideOffset={-1} position="popper">
              <Select.Viewport className={s.viewport}>
                {options.map(option => (
                  <Select.Item key={option.value} value={option.value} className={s.item}>
                    <Select.ItemText>{option.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </>
  );
};
