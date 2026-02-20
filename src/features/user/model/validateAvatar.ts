export const MAX_AVATAR_SIZE = 10 * 1024 * 1024; // 10Mb
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png"]);

export type ValidateAvatarResult =
  | { isValid: true }
  | { isValid: false; error: string };

export function validateAvatar(file: File): ValidateAvatarResult {
  const okType = ALLOWED_TYPES.has(file.type);
  const okSize = file.size <= MAX_AVATAR_SIZE;

  if (!okType || !okSize) {
    return {
      isValid: false,
      error: "The photo must be less than 10 Mb and have JPEG or PNG format",
    };
  }

  return { isValid: true };
}
