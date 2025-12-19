import { baseApi } from "@/shared";
import type { MeResponse } from "./authApi.types";

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    me: build.query<MeResponse, void>({
      query: () => "auth/me",
      //...withZodCatch(meResponseSchema)
      providesTags: ["Auth"],
    }),
    // login: builder.mutation({...}),
    // logout: builder.mutation({...}),
  }),
});

export const { useMeQuery } = authApi;
