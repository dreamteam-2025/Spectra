"use client";

import { useParams, useSearchParams } from "next/navigation";

export default function UserProfile() {
  const params = useParams();
  const searchParams = useSearchParams();

  return (
    <main>
      <h1>Profile {params.id}</h1>
      <div>{searchParams.get("postId")}</div>
    </main>
  );
}
