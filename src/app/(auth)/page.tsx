import { ROUTES } from "@/shared/lib/constants";
import { redirect } from "next/navigation";

export default function Auth() {
  redirect(ROUTES.AUTH.LOGIN);
}
