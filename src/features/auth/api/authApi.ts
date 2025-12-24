import { AUTH_KEYS, baseApi } from "@/shared";
import type { LoginOauthGithubArgs, MeResponse } from "./authApi.types";

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    me: build.query<MeResponse, void>({
      query: () => "auth/me",
      //...withZodCatch(meResponseSchema)
      providesTags: ["Auth"],
    }),
    // loginGithub: build.query<void, LoginOauthGithubArgs>({
    //   query: ({ redirectUrl }) => ({
    //     method: "get",
    //     url: "auth/github/login",
    //     params: { redirect_url: redirectUrl },
    //   }),
    // }),
    updateGithubTokens: build.mutation<{ accessToken: string }, void>({
      query: () => ({
        url: "auth/github/update-tokens",
        method: "POST",
        body: {},
      }),
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        sessionStorage.setItem(AUTH_KEYS.accessToken, data.accessToken);
        sessionStorage.removeItem(AUTH_KEYS.authProvider);
        // инвалидация после КАЖДОГО сохранения токенов
        dispatch(authApi.util.invalidateTags(["Auth"]));
      },
    }),
    logout: build.mutation<void, void>({
      query: () => {
        return {
          url: "auth/logout",
          method: "post",
          body: {},
        };
      },
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        sessionStorage.removeItem(AUTH_KEYS.accessToken);
        sessionStorage.removeItem(AUTH_KEYS.authProvider);
        // инвалидация после КАЖДОГО удаления токенов
        dispatch(baseApi.util.resetApiState());
      },
    }),
  }),
});

export const { useMeQuery, useLogoutMutation, useUpdateGithubTokensMutation } = authApi;
