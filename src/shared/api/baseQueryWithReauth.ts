// import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
// import { Mutex } from "async-mutex";
// import { baseQuery } from "./baseQuery";
// import { AUTH_KEYS, handleErrors, isToken } from "../lib";
// import { baseApi } from "./baseApi";

// // создаем объект мьютекса
// const mutex = new Mutex();

// export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
//   args,
//   api,
//   extraOptions
// ) => {
//   // ждем пока мьютекс будет доступен (разблочен)
//   await mutex.waitForUnlock();

//   let result = await baseQuery(args, api, extraOptions);

//   // если есть ошибка и это именно 401 ошибка
//   if (result.error && result.error.status === 401) {
//     // проверка залочен ли мьютекс
//     if (!mutex.isLocked()) {
//       const release = await mutex.acquire();
//       try {
//         // делаем запрос за JWT accessToken
//         // (а refreshToken прилетает нам в куках)
//         const refreshResult = await baseQuery(
//           {
//             url: "auth/update",
//             method: "post",
//             body: {},
//           },
//           api,
//           extraOptions
//         );

//         // проверка прилетели ли данные и соответствие
//         if (refreshResult.data && isToken(refreshResult.data)) {
//           // удалить, если была запись о том, что токен полученный ранее для гитхаб
//           //sessionStorage.removeItem(AUTH_KEYS.authProvider);
//           // кладем в sessionStorage новый accessToken
//           sessionStorage.setItem(AUTH_KEYS.accessToken, refreshResult.data.accessToken);
//           // повтор первоначального запроса
//           result = await baseQuery(args, api, extraOptions);
//         } else {
//           /*// @ts-expect-error
//           api.dispatch(baseApi.endpoints.logout.initiate());*/
//         }
//       } finally {
//         // вызывается только когда необходимо "освободить" мьютекс
//         release();
//       }
//     } else {
//       // дожидаемся пока мьютекс станет доступен
//       await mutex.waitForUnlock();
//       // результат запроса
//       result = await baseQuery(args, api, extraOptions);
//     }
//   }

//   // если ошибка не 401, обработчик общий
//   if (result.error && result.error.status !== 401) {
//     // обработчик ошибок
//     handleErrors(result.error);
//   }

//   return result;
// };













import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { baseQuery, baseQueryNoAuth } from "./baseQuery";
import { AUTH_KEYS, handleErrors, isToken } from "../lib";

const mutex = new Mutex();

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // ✅ refresh БЕЗ Authorization
        const refreshResult = await baseQueryNoAuth(
          { url: "auth/update", method: "POST", body: {} },
          api,
          extraOptions
        );

        if (refreshResult.data && isToken(refreshResult.data)) {
          sessionStorage.setItem(AUTH_KEYS.accessToken, refreshResult.data.accessToken);

          // ✅ повторяем оригинальный запрос уже с новым access
          result = await baseQuery(args, api, extraOptions);
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  if (result.error && result.error.status !== 401) {
    handleErrors(result.error);
  }

  return result;
};
