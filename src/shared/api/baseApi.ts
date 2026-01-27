// store/api/baseApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["Auth"],
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getPublicUsersCount: builder.query<{ totalCount: number }, void>({
      query: () => ({
        url: "public-user",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPublicUsersCountQuery } = baseApi;
