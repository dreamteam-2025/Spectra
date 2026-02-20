"use client";

import { useRef, useEffect, useId, useState } from "react";
import { DayPicker } from "react-day-picker";
import clsx from "clsx";
import s from "./DatePicker.module.scss";
import "react-day-picker/dist/style.css";

type Props = {
  label?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
};

export const DatePicker = ({ label = "Date of Birth", value, onChange, error, disabled, className }: Props) => {
  const id = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const formatted = value ? value.toLocaleDateString("en-GB") : "";

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={wrapperRef} className={clsx(s.wrapper, className)}>
      {label && (
        <label htmlFor={id} className={clsx(s.label, disabled && s.labelDisabled)}>
          {label}
        </label>
      )}

      <div
        className={clsx(s.inputWrapper, open && s.open, error && !disabled && s.error, disabled && s.disabled)}
        onClick={() => !disabled && setOpen(prev => !prev)}
      >
        <input id={id} readOnly disabled={disabled} value={formatted} placeholder="00/00/0000" className={s.input} />
        <span className={s.icon} />
      </div>

      {open && !disabled && (
        <div className={s.popover}>
          <DayPicker
            mode="single"
            selected={value}
            onSelect={date => {
              onChange?.(date);
              setOpen(false);
            }}
            showOutsideDays
            fixedWeeks
            className={s.calendar}
          />
        </div>
      )}

      {error && !disabled && <div className={s.errorText}>{error}</div>}
    </div>
  );
};
