import { ROUTES } from "@/shared/lib/constants";
import Link from "next/link";

export default function SignUp() {
  return (
    <main>
      <h1>Sign Up</h1>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <label>Username</label>
        <input type="text" placeholder="Name" />
        <label>Email</label>
        <input type="text" placeholder="Email@email.com" />
        <label>Password</label>
        <input type="password" placeholder="" />
        <label>Password confirmation</label>
        <input type="password" placeholder="" />
        <button>Sign Up</button>
        <p>Do you have an account?</p>
        <Link href={ROUTES.AUTH.LOGIN}>Sign In</Link>
      </div>
    </main>
  );
}
