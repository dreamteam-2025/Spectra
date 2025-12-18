import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { isErrorWithProperty } from "./isErrorWithProperty";
import { trimToMaxLength } from "../trimToMaxLength";
import { errorToast } from "../toasts/errorToast";

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

      case 400:
      case 401:
      case 403:
      case 404:
      case 429:
        if (isErrorWithProperty(error.data, "error")) {
          errorToast(error.data.error);
        } else {
          errorToast(JSON.stringify(error.data));
        }
        break;

      default:
        if (error.status >= 500 && error.status < 600) {
          errorToast("Server error occurred. Please try again later.", error);
        } else {
          errorToast("Some error occurred");
        }
    }
  }
};
