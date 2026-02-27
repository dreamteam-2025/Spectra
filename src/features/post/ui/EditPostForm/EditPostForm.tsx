"use client";

import { useState, useEffect, FormEvent } from "react";
import s from "./EditPostFrom.module.scss";
import { Button } from "@/shared/ui";
import { TextArea } from "@/shared/ui/TextArea/TextArea";
import { useUpdatePostMutation } from "@/features/post/api/postApi";

type Props = {
  postId: number;
  initialDescription: string;
  onDirtyChange: (isDirty: boolean) => void;
  onSuccess: () => void;
};

export const EditPostForm = ({ postId, initialDescription, onSuccess, onDirtyChange }: Props) => {
  const [description, setDescription] = useState(initialDescription);
  const [updatePost, { isLoading }] = useUpdatePostMutation();

  useEffect(() => {
    const isDirty = description !== initialDescription;
    onDirtyChange(isDirty);
  }, [description, initialDescription, onDirtyChange]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await updatePost({
      postId,
      body: { description },
    }).unwrap();

    onSuccess();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <div className={s.textareaWrapper}>
        <TextArea
          value={description}
          onChange={e => setDescription(e.target.value)}
          maxLength={500}
          label="Add publication descriptions"
          className={s.textarea}
        />
        <span className={s.counter}>{description.length}/500</span>
      </div>

      <div className={s.footer}>
        <Button type="submit" variant="primary" disabled={isLoading || description.trim() === initialDescription}>
          Save Changes
        </Button>
      </div>
    </form>
  );
};
