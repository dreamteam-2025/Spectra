export const isOauthData = (data: unknown): data is { accessToken: string; email: string } => {
  return (
    typeof data === "object" &&
    data !== null &&
    "accessToken" in data &&
    "email" in data &&
    typeof (data as any).accessToken === "string" &&
    typeof (data as any).email === "string"
  );
};
