"use client";

import React, { useState, useId } from "react";
import { Primitive } from "@radix-ui/react-primitive";
import s from "./Input.module.scss";

// Типы пропсов компонента
type Props = {
  label?: string;
  error?: string;
  className?: string;
  wrapperClassName?: string;
  fullWidth?: boolean;
} & React.ComponentPropsWithoutRef<typeof Primitive.input>;

/**
 * Универсальный компонент Input с поддержкой различных типов и состояний
 * - Поддерживает типы: text, password, search
 * - Отображает иконки для password (переключение видимости) и search
 * - Валидация с отображением ошибок
 * - Полная доступность (ARIA-атрибуты)
 */
export const Input = ({
  label,
  error,
  className = "",
  wrapperClassName = "",
  id,
  type = "text",
  disabled,
  fullWidth = false,
  ...rest
}: Props) => {
  // Генерация уникального ID для связки label-input и сообщения об ошибке
  const generatedId = useId();
  const inputId = id || `input-${generatedId}`;

  //Иконки
  const eyeIcon = "/icons/eye-outline.svg";
  const eyeOffIcon = "/icons/eye-off-outline.svg";
  const searchIcon = "/icons/search.svg";

  // Состояние для переключения видимости пароля
  const [showPassword, setShowPassword] = useState(false);

  // Определяем реальный тип input'а с учетом переключения видимости пароля
  const inputType = type === "password" && showPassword ? "text" : type;

  // Флаг наличия иконки (для корректных отступов)
  const hasIcon = type === "password" || type === "search";

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  /**
   * Рендер иконок в зависимости от типа input'а
   * - Password: кнопка переключения видимости
   * - Search: статичная иконка поиска
   */
  const renderIcon = () => {
    if (type === "password") {
      return (
        <button
          type="button"
          className={s.iconButton}
          onClick={togglePasswordVisibility}
          tabIndex={-1} // Исключаем из последовательной навигации по Tab
          disabled={disabled}
          aria-label={showPassword ? "Hide password" : "Show password"}
          aria-pressed={showPassword}
        >
          <img
            src={showPassword ? eyeIcon : eyeOffIcon}
            alt=""
            width={24}
            height={24}
            className={s.icon}
            aria-hidden="true"
          />
        </button>
      );
    }

    if (type === "search") {
      return (
        <div className={s.search} aria-hidden="true">
          <img src={searchIcon} alt="" width={24} height={24} className={`${s.icon} ${s.iconSearch}`} />
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`${s.wrapper} ${wrapperClassName} ${fullWidth ? s.fullWidth : ""}`}>
      {/* Опциональный label с связью через htmlFor */}
      {label && (
        <label htmlFor={inputId} className={s.label}>
          {label}
        </label>
      )}

      {/* Обертка для позиционирования иконок относительно input'а */}
      <div className={s.inputWrapper}>
        <Primitive.input
          id={inputId}
          type={inputType}
          className={`
            ${s.input} 
            ${error ? s.errorInput : ""} 
            ${type === "search" ? s.searchInput : ""}
            ${hasIcon ? s.withIcon : ""}
            ${className}
          `}
          disabled={disabled}
          aria-invalid={!!error} // Индикатор ошибки для скринридеров
          aria-describedby={error ? `${inputId}-error` : undefined} // Связь с сообщением об ошибке
          {...rest}
        />
        {renderIcon()}
      </div>

      {/* Отображение ошибки с ролью alert для скринридеров */}
      {error && (
        <div id={`${inputId}-error`} className={s.error} role="alert">
          {error}
        </div>
      )}
    </div>
  );
};
