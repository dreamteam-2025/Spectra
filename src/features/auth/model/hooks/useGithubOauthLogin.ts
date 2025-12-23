"use client";

import { useCallback } from "react";
import { useLoginGithubMutation } from "../../api/authApi";
import { ROUTES } from "@/shared";
import { errorToast } from "@/shared/lib/utils/toasts/errorToast";

export const useGithubOauthLogin = () => {
  //const [login] = useLoginGithubMutation();

  const openOauthPopup = useCallback(() => {
    //debugger;
    const redirectUrl = process.env.NEXT_PUBLIC_DOMAIN_ADDRESS + ROUTES.AUTH.GITHUB_OAUTH;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/github/login?redirect_url=${redirectUrl}`;

    const popup = window.open(url, "oauthPopup", "width=500, height=600");

    // раннее прерывание, если popup по какой-либо причине не открылся
    if (!popup) {
      errorToast("Popup has been blocked by browser");
      return;
    }

    // обработчик сообщений
    const recieveMessage = (event: MessageEvent) => {
      // раннее прерывание, если popup был открыт не на нашем доменном адресе
      if (event.origin !== process.env.NEXT_PUBLIC_DOMAIN_ADDRESS) return;

      const { accessToken } = event.data;

      console.log("accessToken: ", accessToken);

      // если accessToken не пришел - раннее прерывание
      if (!accessToken) return;

      // удаляем обработчик
      window.removeEventListener("message", recieveMessage);

      //login({ redirectUrl });
    };

    window.addEventListener("message", recieveMessage);
  }, []);

  return { openOauthPopup };
};
