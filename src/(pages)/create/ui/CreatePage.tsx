"use client";

import { CreatePostModal } from "@/features/post/ui/CreatePostModal/CreatePostModal";
import { useEffect, useState } from "react";
<<<<<<< I1-105
=======
import { CreatePostModal } from "@/features/post/ui/CreatePostModal/CreatePostModal";
>>>>>>> dev

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
