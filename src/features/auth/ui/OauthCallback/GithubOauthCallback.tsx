// Компонент, срабатывающий после успешной OAuth github авторизации
import { useEffect } from "react";

// его цель - извлечь из адресной строки (в query-параметрах) accessToken
// и отправить обратно в главное окно приложения, закрыв popup
export const GithubOauthCallback = () => {
  //debugger;
  useEffect(() => {
    // Получаем текущий URL
    const url = new URL(window.location.href);
    // Извлекаем accessToken из параметров запроса
    const accessToken = url.searchParams.get("accessToken");

    // Если в query-параметрах URL есть accessToken
    // и window.opener - ссылка на основное окно (откуда открылось новое)
    if (accessToken && window.opener) {
      window.opener.postMessage({ accessToken }, process.env.NEXT_PUBLIC_DOMAIN_ADDRESS);
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
