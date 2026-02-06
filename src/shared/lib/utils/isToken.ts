// export const isToken = (data: unknown): data is { accessToken: string } => {
//   return typeof data === "object" && data !== null && "accessToken" in data;
// };

export const isToken = (data: unknown): data is { accessToken: string } => {
  if (typeof data !== "object" || data === null) return false;

  const obj = data as Record<string, unknown>;

  // Проверяем что это минимальный объект refresh токена
  // (только accessToken, без email, user и т.д.)
  const hasOnlyAccessToken = Object.keys(obj).length === 1 && "accessToken" in obj;

  return hasOnlyAccessToken && typeof obj.accessToken === "string";
};
