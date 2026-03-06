import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { trimToMaxLength } from "../trimToMaxLength";
import { errorToast } from "../toasts/errorToast";
import { isErrorWithMessagesArray } from "./isErrorWithMessagesArray";
import { isErrorWithProperty } from "./isErrorWithProperty";

export const handleErrors = (error: FetchBaseQueryError) => {
  if (error) {
    switch (error.status) {
      case "FETCH_ERROR":
      case "PARSING_ERROR":
      case "CUSTOM_ERROR":
      case "TIMEOUT_ERROR":
        errorToast(error.error);
        break;

      // Статус-коды 4xx: ошибка на стороне клиента
      case 400:
      case 403:
      case 404:
      case 429:
        // проверяем есть ли в объекте ошибки массив messages
        if (isErrorWithMessagesArray(error.data)) {
          errorToast(trimToMaxLength(error.data.messages[0].message));
        } else {
          // проверяем есть ли в объекте ошибки свойство messages
          if (isErrorWithProperty(error.data, "messages")) {
            errorToast(trimToMaxLength(error.data.messages));
          } else {
            // роверяем есть ли в объекте ошибки свойство error
            if (isErrorWithProperty(error.data, "error")) {
              errorToast(trimToMaxLength(error.data.error));
            } else {
              // если вообще ничего из вышепроверенного нет в объекте ошибки
              console.log(JSON.stringify(error.data)); // для разрабов
              errorToast("Some error occurred"); // видит пользователь
            }
          }
        }
        break;

      // Статус-коды 5xx: ошибка на стороне сервера
      default:
        if (error.status >= 500 && error.status < 600) {
          errorToast("Server error occurred. Please try again later.", error);
        } else {
          // остальные ошибки
          errorToast("Some error occurred");
        }
    }
  }
};
