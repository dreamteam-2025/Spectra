import { ROUTES } from "@/shared/lib/constants";
import Link from "next/link";

export default function ForgotPassword() {
  return (
    <main>
      <h1>Forgot Password</h1>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <label>Email</label>
        <input type="text" placeholder="Email@email.com" />
        <button>Send Link</button>
        <Link href={ROUTES.AUTH.LOGIN}>Back to Sign In</Link>
      </div>
    </main>
  );
}
