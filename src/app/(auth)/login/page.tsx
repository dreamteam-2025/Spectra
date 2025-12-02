import { ROUTES } from "@/shared/lib/constants";
import Link from "next/link";
import { SignIn } from "@/(pages)/auth/login/ui/SignIn";

export default function SignInPage() {
  return (
    <main>
      <SignIn />
    </main>
  );
}
