"use client";

import { Loader, ROUTES } from "@/shared";
import { useEffect } from "react";
import { useLoginGoogleMutation } from "../../api/authApi";

export const GoogleOauthCallback = () => {
  const [loginGoogle] = useLoginGoogleMutation();

  // Универсальная функция отправки сообщений в основное окно
  const sendMessageToOpener = (payload: any) => {
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage(payload, window.location.origin);
    }
  };

  // Обработчик передачи "code" Google
  const handleGoogleCodeDelivering = async (code: string) => {
    try {
      const authRecievedData = await loginGoogle({
        redirectUrl: window.location.origin + ROUTES.AUTH.GOOGLE_OAUTH,
        code,
      }).unwrap();

      // передача результата в основное окно
      sendMessageToOpener(authRecievedData);
    } catch (error: any) {
      // передача ошибки в основное окно
      sendMessageToOpener({ error, errorDescription: "OAuth2 error" });
    } finally {
      // Закрываем попап
      window.close();
    }
  };

  useEffect(() => {
    // выцепляем параметры из текущего URL
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");
    const error = params.get("error");

    // раннее прерывание, если есть ошибка от Google
    if (error) {
      //console.error("Google OAuth error:", error);
      sendMessageToOpener({ error, errorDescription: "Authorization has been cancelled" });
      window.close();
      return;
    }

    // проверяем state (защита от CSRF)
    const savedState = sessionStorage.getItem("google-oauth-state");

    // прерывание, если они не совпали
    if (state !== savedState) {
      //console.error("State mismatch. Possible CSRF attack!");
      sendMessageToOpener({ error, errorDescription: "State mismatch. Possible CSRF attack!" });
      window.close();
      return;
    } else {
      // удаляем проверочный state из sessionStorage
      sessionStorage.removeItem("google-oauth-state");
    }

    // если есть код, отправляем его на бекенд
    if (code) {
      handleGoogleCodeDelivering(code);
    } else {
      // если код не пришел
      //console.error("Google OAuth error: no code received");
      sendMessageToOpener({ error: "OAuth2 error, ", errorDescription: "No code received" });

      window.close();
      return;
    }
  }, []);

  return (
    <>
      <Loader />
      <p>Logging you in Google...</p>
    </>
  );
};
