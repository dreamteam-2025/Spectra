import { ROUTES } from "@/shared/lib/constants";
import Link from "next/link";
import s from "./SignIn.module.scss";
import Image from "next/image";

export default function SignIn1() {
  return (
    <main style={{background: 'black'}}>
      <h1>Sign In</h1>
      <div className={s.icons}>
        <Image src="/icons/google.svg" alt="google" width={36} height={36} />
        <Image src="/icons/github.svg" alt="github" width={36} height={36} />

      </div>
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
