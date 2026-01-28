import { baseApi } from "@/shared/api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPublicUsersCount: builder.query<{ totalCount: number }, void>({
      query: () => ({
        url: "public-user",
        method: "GET",
      }),
      providesTags: () => [{ type: "User" }],
    }),
  }),
});

export const { useGetPublicUsersCountQuery } = userApi;
