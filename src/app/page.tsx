import { MainPage } from "@/(pages)";
import type { Post } from "@/features/post/api/postApi.types";

// ISR с ревалидацией каждые 60 с
export const revalidate = 60;

export default async function HomePage() {
  // 4 поста на сервере
  // изначально пустой массив
  let initialPosts: Post[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/all/0?pageSize=4`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const postsData = await res.json();
      // достаем массив posts.items
      initialPosts = postsData.items;
    }
  } catch (error) {
    console.error("Failed to fetch initial posts:", error);
  }

  // прокидываем полученные данные о постах в props
  return <MainPage initialPosts={initialPosts} />;
}
