import { AUTH_KEYS, baseApi } from "@/shared";
import type { MeResponse } from "./authApi.types";
import { SignInForm } from "@/(pages)/auth/login/model";

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    me: build.query<MeResponse, void>({
      query: () => "auth/me",
      //...withZodCatch(meResponseSchema)
      providesTags: ["Auth"],
    }),
    login: build.mutation<{ accessToken: string }, SignInForm>({
      query: payload => {
        return {
          method: "POST",
          url: "auth/login",
          body: payload,
        };
      },
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        sessionStorage.setItem(AUTH_KEYS.accessToken, data.accessToken);
        // инвалидация после КАЖДОГО сохранения токенов
        dispatch(authApi.util.invalidateTags(["Auth"]));
      },
    }),

    // logout: builder.mutation({...}),
  }),
});

export const { useMeQuery, useLoginMutation } = authApi;
