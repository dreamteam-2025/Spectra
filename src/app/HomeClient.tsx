"use client";

import { useState } from "react";
import { Button } from "@/shared";
import { CreatePostModal } from "@/features/post/ui/CreatePostModal/CreatePostModal";

export function HomeClient() {
  const [open, setOpen] = useState(false);

  return (
    <main style={{ padding: 24 }}>
      <h1>Main Page</h1>
      <p>Some text here. Some text here. Some text here.</p>

      <Button variant="primary" onClick={() => setOpen(true)}>
        Open Create Post
      </Button>

      <CreatePostModal open={open} onOpenChange={setOpen} />
    </main>
  );
}
