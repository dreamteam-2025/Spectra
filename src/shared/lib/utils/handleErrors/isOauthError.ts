type OauthErrorData = {
  error: string;
  errorDescription?: string;
};

export const isOauthError = (data: unknown): data is OauthErrorData => {
  return typeof data === "object" && data !== null && "error" in data && typeof (data as any).error === "string";
};
