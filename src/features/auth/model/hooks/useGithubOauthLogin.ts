"use client";

import { useCallback } from "react";
import { AUTH_KEYS, ROUTES } from "@/shared";
import { errorToast } from "@/shared/lib/utils/toasts/errorToast";
import { useUpdateGithubTokensMutation } from "../../api/authApi";

export const useGithubOauthLogin = () => {
  const [updateTokens] = useUpdateGithubTokensMutation();

  const openOauthPopup = useCallback(() => {
    const redirectUrl = process.env.NEXT_PUBLIC_DOMAIN_ADDRESS + ROUTES.AUTH.GITHUB_OAUTH;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/github/login?redirect_url=${redirectUrl}`;

    const popup = window.open(url, "oauthPopup", "width=500, height=600");

    // раннее прерывание, если popup по какой-либо причине не открылся
    if (!popup) {
      errorToast("Popup has been blocked by browser");
      return;
    }

    // обработчик сообщений
    const recieveMessage = async (event: MessageEvent) => {
      // раннее прерывание, если popup был открыт не на нашем доменном адресе
      if (event.origin !== process.env.NEXT_PUBLIC_DOMAIN_ADDRESS) return;

      const { accessToken } = event.data;

      try {
        // если accessToken не пришел - раннее прерывание
        if (!accessToken) {
          console.log("No access token received");
          return;
        }

        // если initial accessToken прилетел, то запишем в sessionStorage
        // указываем также, что токен установлен именно при oauth via github (важно при первом обновлении токена)
        sessionStorage.setItem(AUTH_KEYS.accessToken, accessToken);
        sessionStorage.setItem(AUTH_KEYS.authProvider, "github");

        console.log("accessToken before update: ", accessToken);

        // затем сразу же инициируем первоначальный запрос на обновление токена
        // (это нужно после получения initial токена, только в первый раз, для github)
        const updateTokensResult = await updateTokens().unwrap();

        /*// затем в случае успеха перезапишем новым токеном и удалим запись о гитхаб в sessionStorage
        sessionStorage.setItem(AUTH_KEYS.accessToken, updateTokensResult.accessToken);
        sessionStorage.removeItem(AUTH_KEYS.authProvider);

        console.log("accessToken after update: ", updateTokensResult.accessToken);*/
      } catch (error) {
        console.log("Error with update-tokens: ", error);
      } finally {
        // удаляем обработчик
        window.removeEventListener("message", recieveMessage);
      }
    };

    window.addEventListener("message", recieveMessage);
  }, [updateTokens]);

  return { openOauthPopup };
};
