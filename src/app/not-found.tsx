"use client";

import { Button, ROUTES } from "@/shared";
import { useRouter } from "next/navigation";

export default function Error404() {
  const router = useRouter();

  return (
    <main
      style={{ display: "flex", flexDirection: "column", gap: "24px", justifyContent: "center", alignItems: "center" }}
    >
      <h1 className="largeHeading">404 - Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Button children={"Home"} variant={"primary"} onClick={() => router.push(ROUTES.APP.HOME)} />
    </main>
  );
}
