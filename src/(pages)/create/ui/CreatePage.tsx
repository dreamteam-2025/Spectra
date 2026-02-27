"use client";

import { useEffect, useState } from "react";
import { CreatePostModal } from "@/features/post/ui/CreatePostModal/CreatePostModal";

export function CreatePostPage() {
  const [open, setOpen] = useState(false);

  // Открываем модалку сразу при переходе на страницу
  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <main>
      <CreatePostModal open={open} onOpenChange={setOpen} />
    </main>
  );
}
