export const ROUTES = {
  APP: {
    HOME: "/",
    TERMS: "/terms",
    PRIVACY: "/privacy",
    ERROR404: "/error404",
    PROFILE: "/profile", // 👈 новый защищённый роут
  },
  AUTH: {
    LOGIN: "/login",
    SIGNUP: "/signup",
    FORGOT_PASSWORD: "/forgot-password",
    PASSWORD_RECOVERY: "/password-recovery",
    CREATE_NEW_PASSWORD: "/create-new-password",
    EMAIL_VERIFIED: "/signup-email-verified",
    VERIFICATION_EXPIRED: "/verification-expired",
  },
} as const;
