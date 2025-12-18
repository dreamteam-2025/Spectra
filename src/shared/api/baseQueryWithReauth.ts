import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { baseQuery } from "./baseQuery";
import { AUTH_KEYS, handleErrors, isToken } from "../lib";
import { baseApi } from "./baseApi";

// создаем объект мьютекса
const mutex = new Mutex();

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  // ждем пока мьютекс будет доступен (разблочен)
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  // если есть ошибка и это именно 401 ошибка
  if (result.error && result.error.status === 401) {
    debugger;
    handleErrors(result.error);
    // проверка залочен ли мьютекс
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // делаем запрос за JWT accessToken
        // (а refreshToken прилетает нам в куках)
        const refreshResult = await baseQuery(
          {
            url: "auth/update",
            method: "post",
            body: {}, // пустое "тело" запроса, т.к. refreshToken в куках
          },
          api,
          extraOptions
        );

        // проверка прилетели ли данные и соответствие
        if (refreshResult.data && isToken(refreshResult.data)) {
          // если ок, кладем в sessionStorage новый accessToken
          sessionStorage.setItem(AUTH_KEYS.accessToken, refreshResult.data.accessToken);
          // повтор первоначального запроса
          result = await baseQuery(args, api, extraOptions);
        } else {
          // тут не трогать пока что, это необходимо для initiate logout-запроса
          // // @ts-expect-error
          // api.dispatch(baseApi.endpoints.logout.initiate());
        }
      } finally {
        // вызывается только когда необходимо "освободить" мьютекс
        release();
      }
    } else {
      // дожидаемся пока мьютекс станет доступен
      await mutex.waitForUnlock();
      // результат запроса
      result = await baseQuery(args, api, extraOptions);
    }
  }

  // если ошибка не 401, обработчик общий
  if (result.error && result.error.status !== 401) {
    // обработчик ошибок
    handleErrors(result.error);
  }

  return result;
};
