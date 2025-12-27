import { baseApi } from "@/shared";
import {
  RegistrationConfirmationArgs,
  RegistrationEmailResendingArgs,
  SignUpArgs,
  type MeResponse,
} from "./authApi.types";

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    me: build.query<MeResponse, void>({
      query: () => "auth/me",
      providesTags: ["Auth"],
    }),
    // login: builder.mutation({...}),
    // logout: builder.mutation({...}),
    signUp: build.mutation<void, SignUpArgs>({
      query: payload => ({
        method: "post",
        url: "auth/registration",
        body: payload,
      }),
    }),
    confirmRegistration: build.mutation<void, RegistrationConfirmationArgs>({
      query: payload => ({
        method: "post",
        url: "auth/registration-confirmation",
        body: payload,
      }),
    }),
    resendRegistrationEmail: build.mutation<void, RegistrationEmailResendingArgs>({
      query: payload => ({
        method: "post",
        url: "auth/registration-email-resending",
        body: payload,
      }),
    }),
  }),
});

export const { useMeQuery, useSignUpMutation, useConfirmRegistrationMutation, useResendRegistrationEmailMutation } =
  authApi;
