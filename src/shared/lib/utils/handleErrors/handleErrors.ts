import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { trimToMaxLength } from "../trimToMaxLength";
import { errorToast } from "../toasts/errorToast";
import { isErrorWithMessagesArray } from "./isErrorWithMessagesArray";

export const handleErrors = (error: FetchBaseQueryError) => {
  debugger;
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
        if (isErrorWithMessagesArray(error.data)) {
          errorToast(trimToMaxLength(error.data.messages[0].message));
        } else {
          errorToast(JSON.stringify(error.data));
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
