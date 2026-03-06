import { ROUTES } from "@/shared";
import { useRouter } from "next/navigation";

export const useRedirectToSignIn = () => {
  const router = useRouter();
  return () => router.push(ROUTES.AUTH.LOGIN);
};
