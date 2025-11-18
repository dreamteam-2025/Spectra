export const ROUTES = {
  APP: {
    HOME: "/",
    TERMS: "/terms",
    PRIVACY: "/privacy",
    ERROR404: "/error404",
  },
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
    FORGOT_PASSWORD: "/auth/forgot-password",
    PASSWORD_RECOVERY: "/auth/password-recovery",
    CREATE_NEW_PASSWORD: (token: string) => `/auth/create-new-password/${token}`,
    EMAIL_VERIFIED: "/auth/email-verified",
    VERIFICATION_EXPIRED: "/auth/verification-expired",
  },
} as const;
