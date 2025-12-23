import { AUTH_KEYS, baseApi } from "@/shared";
import type { LoginOauthGithubArgs, MeResponse } from "./authApi.types";

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    me: build.query<MeResponse, void>({
      query: () => "auth/me",
      //...withZodCatch(meResponseSchema)
      providesTags: ["Auth"],
    }),
    loginGithub: build.mutation<void, LoginOauthGithubArgs>({
      query: ({ redirectUrl }) => ({
        method: "get",
        url: "auth/github/login",
        params: { redirect_url: redirectUrl },
      }),
    }),
    // logout: builder.mutation({...}),
  }),
});

export const { useMeQuery, useLoginGithubMutation } = authApi;
