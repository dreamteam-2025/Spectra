"use client";

import { useState } from "react";
import { Button } from "@/shared";
import { CreatePostModal } from "@/features/post/ui/CreatePostModal/CreatePostModal";

export function CreatePostPage() {
  const [open, setOpen] = useState(false);

  return (
    <main>
      <h1>Create Post Page</h1>

      <Button variant="primary" onClick={() => setOpen(true)}>
        Open Create Post
      </Button>

      <CreatePostModal open={open} onOpenChange={setOpen} />
    </main>
  );
}
