export function isErrorWithMessagesArray(error: unknown): error is { messages: { message: string }[] } {
  return (
    typeof error === "object" &&
    error !== null &&
    "messages" in error &&
    Array.isArray((error as any).messages) &&
    (error as any).messages.length > 0 &&
    typeof (error as any).messages[0].message === "string"
  );
}
