"use client";

import { useState } from "react";
import { Button } from "@/shared";
import { ProfileAvatarModal } from "../../../features/user/ui/ProfileAvatarModal/ProfileAvatarModal";
import { MyPostList } from "@/widgets/post/myPostList/ui/MyPostList";

export const Profile = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
        Select Profile Photo
      </Button>

      <ProfileAvatarModal open={open} onOpenChange={setOpen} onSaved={() => {}} />
      <MyPostList />
    </>
  );
};
