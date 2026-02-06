"use client";

import { Loader } from "@/shared";
// Компонент, срабатывающий после успешной OAuth github авторизации
import { useEffect } from "react";

// его цель - извлечь из адресной строки (в query-параметрах) accessToken
// и отправить обратно в главное окно приложения, закрыв popup
export const GithubOauthCallback = () => {
  useEffect(() => {
    // Получаем текущий URL
    const url = new URL(window.location.href);
    // Извлекаем accessToken из параметров запроса
    const accessToken = url.searchParams.get("accessToken");
    const email = url.searchParams.get("email");
    // Извлекаем error из параметров запроса (понадобится для обработки ошибок)
    const error = url.searchParams.get("error");
    const errorDescription = url.searchParams.get("error_description");

    // раннее прерывание, если в url есть query-параметр error
    // обычно это если юзер отменил вход через github вручную (нажав cancel)
    if (error && window.opener) {
      console.log("error:", error);
      window.opener.postMessage({ error, errorDescription }, window.location.origin);
      window.close();
      return;
    }

    if (accessToken && window.opener) {
      // Если в query-параметрах URL есть accessToken
      // и window.opener - ссылка на основное окно (откуда открылось новое)
      window.opener.postMessage({ accessToken, email }, window.location.origin);
    }

    // Очищаем URL от токена
    if (window.history.replaceState) {
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }

    // Закрываем окно
    window.close();
  }, []);

  return (
    <>
      <Loader />
      <p>Logging you in GitHub...</p>
    </>
  );
};
