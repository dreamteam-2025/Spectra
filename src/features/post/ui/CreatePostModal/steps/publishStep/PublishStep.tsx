"use client";

import type React from "react";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import s from "./PublishStep.module.scss";
import { TextArea } from "@/shared/ui/TextArea/TextArea";
import { useCreatePostMutation, useUploadPostImagesMutation } from "@/features/post/api/postApi";
import type { CropPayload } from "../croppingStep/CroppingStep";
import { MeResponse } from "@/features/auth/api/authApi.types";

type Props = {
  previewUrl: string;
  cropped: CropPayload;
  submitRef: React.RefObject<(() => void) | null>;
  onPublished: () => void;
  user: MeResponse;
};

const MAX_DESC = 500;

export function PublishStep({ previewUrl, cropped, submitRef, onPublished, user }: Props) {
  const [uploadImages, { isLoading: uploading }] = useUploadPostImagesMutation();
  const [createPost, { isLoading: creating }] = useCreatePostMutation();

  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const isSubmitting = uploading || creating;
  const submittedRef = useRef(false);

  const counter = useMemo(() => `${description.length}/${MAX_DESC}`, [description.length]);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > MAX_DESC) return;
    setDescription(value);
    setError(null);
  };

  const onPublish = async () => {
    if (isSubmitting || submittedRef.current) return;

    submittedRef.current = true;
    setError(null);

    try {
      const blob = cropped.blob instanceof Blob ? cropped.blob : await cropped.blob;
      const mime = blob.type || "image/jpeg";
      const ext = mime === "image/png" ? "png" : "jpg";
      const file = new File([blob], `post.${ext}`, { type: mime });

      const uploadRes = await uploadImages([file]).unwrap();
      if (!uploadRes.images.length) {
        throw new Error("Upload failed");
      }

      await createPost({
        description: description.trim() || undefined,
        childrenMetadata: uploadRes.images.map(img => ({ uploadId: img.uploadId })),
      }).unwrap();

      onPublished();
    } catch {
      submittedRef.current = false;
      setError("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    submitRef.current = onPublish;
    return () => {
      submitRef.current = null;
    };
  }, [onPublish, submitRef]);

  return (
    <div className={s.root}>
      <div className={s.left}>
        <div className={s.imageWrap}>
          <img className={s.image} src={previewUrl} alt="Publication preview" />
        </div>
      </div>

      <div className={s.right}>
        <div className={s.profileRow}>
          <div className={s.avatar} aria-hidden />
          {user && <div className={s.userName}>{user.userName}</div>}
        </div>

        <div className={s.fieldLabel}>Add publication descriptions</div>

        <div className={s.textAreaWrap}>
          <TextArea
            value={description}
            onChange={onChange}
            placeholder="Text-area"
            rows={5}
            disabled={isSubmitting}
            error={error ?? undefined}
          />
          <div className={s.counter}>{counter}</div>
        </div>
      </div>
    </div>
  );
}
