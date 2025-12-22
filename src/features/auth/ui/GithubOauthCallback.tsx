// Компонент, срабатывающий после успешной OAuth github авторизации
import { useEffect } from "react";

// его цель - отправить код обратно в главное окно приложения и закрыть popup
export const GithubOauthCallback = () => {
  useEffect(() => {
    // Получаем текущий URL
    const url = new URL(window.location.href);
    // Извлекаем code из параметров запроса
    const accessToken = url.searchParams.get("accessToken");

    // Если в query-параметрах URL есть accessToken
    // и window.opener - ссылка на основное окно (откуда открылось новое)
    if (accessToken && window.opener) {
      window.opener.postMessage({ accessToken }, process.env.NEXT_PUBLIC_DOMAIN_ADDRESS + "/login");
    }

    // Очищаем URL от токена
    if (window.history.replaceState) {
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }

    // Закрываем окно
    window.close();
  }, []);

  return <p>Logging you in GitHub...</p>;
};
