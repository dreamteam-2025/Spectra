export const ROUTES = {
  APP: {
    HOME: "/",
    TERMS: "/terms",
    PRIVACY: "/privacy",
    ERROR404: "/error404",
    PROFILE: "/profile",
  },
  AUTH: {
    LOGIN: "/login",
    SIGNUP: "/signup",
    FORGOT_PASSWORD: "/forgot-password",
    PASSWORD_RECOVERY: "/password-recovery",
    CREATE_NEW_PASSWORD: "/create-new-password",
    EMAIL_VERIFIED: "/signup-email-verified",
    VERIFICATION_EXPIRED: "/verification-expired",
    GITHUB_OAUTH: "/github-login",
  },
} as const;
