export const ROUTES = {
  APP: {
    HOME: "/",
    TERMS: "/terms",
    PRIVACY: "/privacy",
    ERROR404: "/error404",
  },
  AUTH: {
    LOGIN: "/login",
    SIGNUP: "/signup",
    FORGOT_PASSWORD: "/forgot-password",
    PASSWORD_RECOVERY: "/password-recovery",
    CREATE_NEW_PASSWORD: (token: string) => `/create-new-password/${token}`,
    EMAIL_VERIFIED: "/email-verified",
    VERIFICATION_EXPIRED: "/verification-expired",
  },
} as const;
