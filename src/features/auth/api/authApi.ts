import { baseApi } from "@/shared";
import type { MeResponse, PasswordRecovery, PasswordRecoveryResending } from "./authApi.types";

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    me: build.query<MeResponse, void>({
      query: () => "auth/me",
      //...withZodCatch(meResponseSchema)
      providesTags: ["Auth"],
    }),
    passwordRecovery: build.mutation<void, PasswordRecovery>({
      query: payload => ({
        method: "post",
        url: "auth/password-recovery",
        body: payload,
      }),
    }),
    passwordRecoveryResending: build.mutation<void, PasswordRecoveryResending>({
      query: payload => ({
        method: "post",
        url: "auth/password-recovery-resending",
        body: payload,
      }),
    }),
    // login: builder.mutation({...}),
    // logout: builder.mutation({...}),
  }),
});

export const { useMeQuery, usePasswordRecoveryMutation, usePasswordRecoveryResendingMutation } = authApi;
