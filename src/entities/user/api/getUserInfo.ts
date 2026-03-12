import { UserInfoByIdResponse } from "@/features/user/api/userApi.types";
import { cache } from "react";

export const getUserInfo = cache(async (userId: string): Promise<UserInfoByIdResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/public-user/profile/${userId}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    console.error("Failed to fetch user info");
  }
  return res.json();
});
