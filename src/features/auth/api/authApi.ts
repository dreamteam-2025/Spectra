import { AUTH_KEYS, baseApi } from "@/shared";
import type {
  LoginOauthGithubArgs,
  MeResponse,
  RegistrationConfirmationArgs,
  RegistrationEmailResendingArgs,
  SignUpArgs,
  PasswordRecovery,
  PasswordRecoveryResending,
  NewPassword,
  LoginGoogleResponse,
  LoginGoogleArgs,
} from "./authApi.types";
import { SignInForm } from "@/(pages)/auth/login/model";

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    me: build.query<MeResponse, void>({
      query: () => "auth/me",
      providesTags: ["Auth"],
      keepUnusedDataFor: 300,
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

    newPassword: build.mutation<void, NewPassword>({
      query: payload => ({
        method: "POST",
        url: "auth/new-password",
        body: payload,
      }),
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        sessionStorage.removeItem(AUTH_KEYS.accessToken);
        // инвалидация после КАЖДОГО удаления токенов
        dispatch(baseApi.util.resetApiState());
      },
    }),

    // OAuth2 Github
    loginGithub: build.query<void, LoginOauthGithubArgs>({
      query: ({ redirectUrl }) => ({
        method: "get",
        url: "auth/github/login",
        params: { redirect_url: redirectUrl },
      }),
    }),
    updateGithubTokens: build.mutation<{ accessToken: string }, void>({
      query: () => ({
        url: "auth/github/update-tokens",
        method: "POST",
        body: {},
      }),
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        sessionStorage.setItem(AUTH_KEYS.accessToken, data.accessToken);
        // инвалидация после КАЖДОГО сохранения токенов
        dispatch(authApi.util.invalidateTags(["Auth"]));
      },
    }),

    // OAuth2 Google
    loginGoogle: build.mutation<LoginGoogleResponse, LoginGoogleArgs>({
      query: payload => ({
        method: "post",
        url: "auth/google/login",
        body: payload,
      }),
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        try {
          // ждем успешного завершения запроса
          await queryFulfilled;
          // здесь только инвалидация кеша, сохранение токена будет в основном окне
          // (p.s. так нужно)
          dispatch(authApi.util.invalidateTags(["Auth"]));
        } catch (error) {
          console.error("Error in onQueryStarted:", error);
        }
      },
    }),

    updateAuthToken: build.mutation<{ accessToken: string }, void>({
      query: () => ({
        url: "auth/update",
        method: "POST",
        body: {},
      }),
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        sessionStorage.setItem(AUTH_KEYS.accessToken, data.accessToken);
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
        //dispatch(baseApi.util.resetApiState());
        dispatch(authApi.util.resetApiState());
      },
    }),
  }),
});

// экспорт всех генерируемых RTK Query хуков
export const {
  useMeQuery,
  useLogoutMutation,
  useUpdateGithubTokensMutation,
  useLoginMutation,
  useSignUpMutation,
  useConfirmRegistrationMutation,
  useResendRegistrationEmailMutation,
  usePasswordRecoveryMutation,
  usePasswordRecoveryResendingMutation,
  useNewPasswordMutation,
  useLoginGoogleMutation,
  useUpdateAuthTokenMutation,
} = authApi;
