"use client";

import { AUTH_KEYS, errorToast, generateSecureState, isOauthData, isOauthError, ROUTES } from "@/shared/lib";
import { useRouter } from "next/navigation";

// Хук только для инициализации процесса OAuth2 Google
export const useGoogleOauthLogin = () => {
  const router = useRouter();

  // Возвращаем функцию для открытия popup с нужным сформированным URL
  const openGoogleOauthPopup = () => {
    // ID интервала и таймера для очистки
    // (тип number - потому что наша среда браузер)
    let checkInterval: number;
    let cleanupTimeout: number;

    // генерация secure state для Google
    const state = generateSecureState();
    sessionStorage.setItem("google-oauth-state", state);

    // генерация url для Google (не для бэка)
    const redirectUri = window.location.origin + ROUTES.AUTH.GOOGLE_OAUTH;

    // собираем параметры для googleAuthUrl
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "profile email",
      state,
      prompt: "select_account",
    });

    // формируем googleAuthUrl с параметрами
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

    // открыть popup на Google
    const popup = window.open(googleAuthUrl, "oauthPopup", "width=500,height=600");

    // раннее прерывание, если popup по какой-либо причине не открылся
    if (!popup) {
      errorToast("Popup has been blocked by browser");
      return;
    }

    // обработчик сообщений
    const recieveMessage = (event: MessageEvent) => {
      // раннее прерывание, если popup был открыт не на нашем доменном адресе
      // проверяем hostname вместо полного origin, чтобы OAuth не ломался из-за www/http/port различий
      const allowedHost = new URL(process.env.NEXT_PUBLIC_DOMAIN_ADDRESS!).hostname;
      const originHost = new URL(event.origin).hostname;

      if (originHost !== allowedHost) return;

      const data = event.data;

      // раннее прерывание, если пришедшее в event.data !== необходимому
      if (!data || typeof data !== "object" || Array.isArray(data)) {
        console.log("Ignoring trash messages");
        return;
      }

      // если в data объект { accessToken, email }
      if (isOauthData(data)) {
        const { accessToken, email } = data;

        // если accessToken не пришел - раннее прерывание
        if (!accessToken) {
          console.error("No access token received");
          return;
        }

        // если initial accessToken прилетел, то запишем в sessionStorage
        // указываем также, что токен установлен именно при oauth via google
        sessionStorage.setItem(AUTH_KEYS.accessToken, accessToken);
        sessionStorage.setItem(AUTH_KEYS.authProvider, "google");

        cleanup();
        // и редиректим на страницу user profile
        router.push(ROUTES.APP.PROFILE);
        return;
      }

      // если в data объект ошибки
      if (isOauthError(data)) {
        console.error("OAuth error received:", data.error, data.errorDescription);
        cleanup();
        if (popup && !popup.closed) popup.close();
        errorToast(data.errorDescription || "Authentication cancelled");
        return;
      }
    };

    window.addEventListener("message", recieveMessage);

    // Функция полной очистки
    const cleanup = () => {
      // удаляем проверочный state из sessionStorage
      sessionStorage.removeItem("google-oauth-state");
      window.removeEventListener("message", recieveMessage);
      clearInterval(checkInterval);
      if (cleanupTimeout) clearTimeout(cleanupTimeout);
    };

    // Проверяем закрытие popup каждые 500 мс
    checkInterval = window.setInterval(() => {
      if (popup.closed) {
        // удаляем EventListener если popup закрыт
        cleanup();
        console.log("Popup closed - cleanup performed");
      }
    }, 500);

    // Общий таймаут очистки на 2 минуты
    cleanupTimeout = window.setTimeout(
      () => {
        if (popup && !popup.closed) {
          popup.close();
        }
        cleanup();
      },
      2 * 60 * 1000
    );
  };

  return { openGoogleOauthPopup };
};
