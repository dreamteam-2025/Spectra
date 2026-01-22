import { ImageSlider } from "@/shared/ui/ImageSlider/ImageSlider";
import { redirect } from "next/navigation";

// пока временно моковые данные, да, по-уродски:
import postImage1 from "../../public/images/post-image-mock.png";
import postImage2 from "../../public/images/post-image-mock2.png";
import postImage3 from "../../public/images/post-image-mock3.png";
import postImage4 from "../../public/images/post-image-mock4.png";

type Props = {
  searchParams: Promise<{
    code?: string;
    email?: string;
  }>;
};

export default async function Home({ searchParams }: Props) {
  const { code, email } = await searchParams;

  const mockImageSlides = [
    { id: 0, postImage: postImage1 },
    { id: 1, postImage: postImage2 },
    { id: 2, postImage: postImage3 },
    // { id: 3, postImage: postImage4 },
    { id: 3, postImage: "/images/post-image-mock4.png" },
  ];

  if (code) {
    const qs = new URLSearchParams();
    qs.set("code", code);
    if (email) qs.set("email", email);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/check-recovery-code`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ recoveryCode: code }),
      cache: "no-store",
    });

    if (res.ok) redirect(`/create-new-password?${qs.toString()}`);
    else redirect(`/confirm-email?${qs.toString()}`);
  }

  return (
    <>
      <h1>Main Page</h1>
      <ImageSlider slides={mockImageSlides} />
    </>
  );
}
