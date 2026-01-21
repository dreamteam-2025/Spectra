"use client";

import { AUTH_KEYS, isOauthData, ROUTES, isOauthError } from "@/shared";
import { errorToast } from "@/shared/lib/utils/toasts/errorToast";
import { useUpdateGithubTokensMutation } from "../../api/authApi";
import { useRouter } from "next/navigation";

export const useGithubOauthLogin = () => {
  const [updateTokens] = useUpdateGithubTokensMutation();
  const router = useRouter();

  const openOauthPopup = () => {
    // ID интервала и таймера для очистки
    // (тип number - потому что наша среда браузер)
    let checkInterval: number;
    let cleanupTimeout: number;

    const redirectUrl = process.env.NEXT_PUBLIC_DOMAIN_ADDRESS + ROUTES.AUTH.GITHUB_OAUTH;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/github/login?redirect_url=${redirectUrl}`;

    const popup = window.open(url, "oauthPopup", "width=500,height=600");

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
      // более строгая проверка:
      //if (event.origin !== process.env.NEXT_PUBLIC_DOMAIN_ADDRESS) return;

      // раннее прерывание, если пришедшее в event.data !== необходимому
      //if (!event.data || typeof event.data !== "object" || Array.isArray(event.data) || !isOauthData(event.data)) {
      if (!event.data || typeof event.data !== "object" || Array.isArray(event.data)) {
        console.log("Ignoring trash messages");
        return;
      }

      const data = event.data;

      // если в data объект { accessToken, email }
      if (isOauthData(data)) {
        const { accessToken, email } = event.data;

        // если accessToken не пришел - раннее прерывание
        if (!accessToken) {
          console.error("No access token received");
          return;
        }

        // если initial accessToken прилетел, то запишем в sessionStorage
        // указываем также, что токен установлен именно при oauth via github (важно при первом обновлении токена)
        sessionStorage.setItem(AUTH_KEYS.accessToken, accessToken);
        sessionStorage.setItem(AUTH_KEYS.authProvider, "github");

        cleanup();
        handleOAuthSuccess();
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

    // Функция полной очистки
    const cleanup = () => {
      window.removeEventListener("message", recieveMessage);
      clearInterval(checkInterval);
      if (cleanupTimeout) clearTimeout(cleanupTimeout);
    };

    const handleOAuthSuccess = async () => {
      try {
        // затем сразу же инициируем первоначальный запрос на обновление токена
        // (это нужно после получения initial токена, только в первый раз, для github)
        const updateTokensResult = await updateTokens().unwrap();

        // затем в случае успеха перезапишем новым токеном
        sessionStorage.setItem(AUTH_KEYS.accessToken, updateTokensResult.accessToken);
        // (и удалим запись о авторизации через гитхаб в sessionStorage) - ?
        //sessionStorage.removeItem(AUTH_KEYS.authProvider);

        // и редиректим на страницу user profile
        router.push(ROUTES.APP.PROFILE);

        //console.log("accessToken after update: ", updateTokensResult.accessToken);
      } catch (error) {
        console.error("Error with update-tokens: ", error);
      } finally {
        // удаляем обработчик
        cleanup();
      }
    };

    window.addEventListener("message", recieveMessage);

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

  return { openOauthPopup };
};
