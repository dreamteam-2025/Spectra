import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{
    code?: string;
    email?: string;
  }>;
};

export default async function Home({ searchParams }: Props) {
  const { code, email } = await searchParams;

  if (code) {
    const qs = new URLSearchParams();
    qs.set("code", code);
    if (email) qs.set("email", email);

    redirect(`/confirm-email?${qs.toString()}`);
  }

  return (
    <main>
      <h1>Main Page</h1>
      <p>Some text here. Some text here. Some text here.</p>
    </main>
  );
}
