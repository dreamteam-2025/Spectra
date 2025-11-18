import { ROUTES } from "@/shared/lib/constants";
import Link from "next/link";

export default function SignIn() {
  return (
    <main>
      <h1>Sign In</h1>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <label>Email</label>
        <input type="text" placeholder="Email@email.com" />
        <label>Password</label>
        <input type="password" placeholder="" />
        <button>Sign In</button>
        <Link href={ROUTES.AUTH.FORGOT_PASSWORD}>Forgot Password</Link>
        <p>Don't have an account?</p>
        <Link href={ROUTES.AUTH.SIGNUP}>Sign Up</Link>
      </div>
    </main>
  );
}
