import { AUTH_KEYS, baseApi } from "@/shared";
import type {
  MeResponse,
  RegistrationConfirmationArgs,
  RegistrationEmailResendingArgs,
  SignUpArgs,
} from "./authApi.types";
import { SignInForm } from "@/(pages)/auth/login/model";

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    me: build.query<MeResponse, void>({
      query: () => "auth/me",
      providesTags: ["Auth"],
    }),

    login: build.mutation<{ accessToken: string }, SignInForm>({
      query: payload => ({
        method: "POST",
        url: "auth/login",
        body: payload,
      }),
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        sessionStorage.setItem(AUTH_KEYS.accessToken, data.accessToken);
        // инвалидация после сохранения токена
        dispatch(authApi.util.invalidateTags(["Auth"]));
      },
    }),

    signUp: build.mutation<void, SignUpArgs>({
      query: payload => ({
        method: "POST",
        url: "auth/registration",
        body: payload,
      }),
    }),

    confirmRegistration: build.mutation<void, RegistrationConfirmationArgs>({
      query: payload => ({
        method: "POST",
        url: "auth/registration-confirmation",
        body: payload,
      }),
    }),

    resendRegistrationEmail: build.mutation<void, RegistrationEmailResendingArgs>({
      query: payload => ({
        method: "POST",
        url: "auth/registration-email-resending",
        body: payload,
      }),
    }),
  }),
});

export const {
  useMeQuery,
  useLoginMutation,
  useSignUpMutation,
  useConfirmRegistrationMutation,
  useResendRegistrationEmailMutation,
} = authApi;
