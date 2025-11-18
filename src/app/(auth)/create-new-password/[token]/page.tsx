"use client";

import { useParams, useSearchParams } from "next/navigation";

export default function CreateNewPassword() {
  const params = useParams();
  //const searchParams = useSearchParams();

  return (
    <main>
      <h1>Create New Password</h1>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <label>New password</label>
        <input type="password" placeholder="" />
        <label>Password confirmation</label>
        <input type="password" placeholder="" />
        <button>Create new password</button>
      </div>
      <div>
        <p>Params: {params.token}</p>
      </div>
    </main>
  );
}
