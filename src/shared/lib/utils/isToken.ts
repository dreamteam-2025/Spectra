export const isToken = (data: unknown): data is { accessToken: string } => {
  return typeof data === "object" && data !== null && "accessToken" in data;
};
