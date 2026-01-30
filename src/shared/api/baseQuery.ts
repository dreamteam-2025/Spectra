import { AUTH_KEYS } from "../lib";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: "include", // для того, чтобы отправлялись куки (важно для refreshToken)

  // это по сути interceptor
  prepareHeaders: (headers, { endpoint }) => {
    // accessToken храним в sessionStorage
    const accessToken = sessionStorage.getItem(AUTH_KEYS.accessToken);
    // если он там есть, цепляем к каждому запросу в заголовках

    // не цепляем
    if (endpoint === "getPosts") return headers;

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});








