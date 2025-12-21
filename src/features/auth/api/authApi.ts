import { baseApi } from "@/shared";
import type { MeResponse } from "./authApi.types";
import { SignInForm } from "@/(pages)/auth/login/ui/SignIn";

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
    }),

    // logout: builder.mutation({...}),
  }),
});

export const { useMeQuery, useLoginMutation } = authApi;
