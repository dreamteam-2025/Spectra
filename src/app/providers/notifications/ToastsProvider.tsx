"use client";

import { ToastContainer } from "react-toastify";

export function ToastsProvider() {
  return (
    <ToastContainer
      // общие настройки
      position="bottom-left"
      autoClose={5000}
      hideProgressBar
      newestOnTop
      closeOnClick={false}
      pauseOnFocusLoss
      pauseOnHover
      icon={false}
      theme="colored"
      // общая стилизация
      style={{
        left: "24px",
        bottom: "24px",
        zIndex: 9999,
      }}
      // стилизация конкретно самого "тоста"
      toastStyle={{
        position: "relative",
        padding: "12px 56px 12px 24px",
        marginBottom: "20px",
        maxWidth: "387px",
        minHeight: "48px",
        fontFamily: "Inter, sans-serif",
        fontSize: "16px",
        fontWeight: "400",
        lineHeight: "1.5",
      }}
      // кастомная кнопка закрытия "тоста"
      closeButton={({ closeToast }) => (
        <button
          onClick={closeToast}
          style={{
            position: "absolute",
            width: "24px",
            height: "24px",
            top: "50%",
            right: "16px",
            transform: "translateY(-50%)",

            background: "transparent",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
          }}
          aria-label="close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
              fill="white"
            />
          </svg>
        </button>
      )}
    />
  );
}
