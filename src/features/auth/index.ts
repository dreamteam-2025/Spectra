export { GoogleOauthCallback } from "./ui/OauthCallback/GoogleOauthCallback";
export { useGoogleOauthLogin } from "@/features/auth/model/hooks/useGoogleOauthLogin";
export { GithubOauthCallback } from "./ui/OauthCallback/GithubOauthCallback";
export { useGithubOauthLogin } from "./model/hooks/useGithubOauthLogin";

export {
  authApi,
  useMeQuery,
  useConfirmRegistrationMutation,
  useLoginMutation,
  useLogoutMutation,
  useResendRegistrationEmailMutation,
  useSignUpMutation,
  useUpdateGithubTokensMutation,
  useLoginGoogleMutation,
} from "./api/authApi";
