"use client";

import type React from "react";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";

import s from "./PublishStep.module.scss";
import { TextArea } from "@/shared/ui/TextArea/TextArea";
import { useCreatePostMutation, useUploadPostImagesMutation } from "@/features/post/api/postApi";
import type { CropPayload } from "../croppingStep/CroppingStep";

type Props = {
  previewUrl: string;
  cropped: CropPayload;
  submitRef: React.MutableRefObject<null | (() => void)>;
  onPublished: () => void;
};

const MAX_DESC = 500;

function isPromise<T = unknown>(v: unknown): v is Promise<T> {
  return typeof v === "object" && v !== null && "then" in (v as any) && typeof (v as any).then === "function";
}

export function PublishStep({ previewUrl, cropped, submitRef, onPublished }: Props) {
  const [description, setDescription] = useState("");
  const [uiError, setUiError] = useState<string | null>(null);

  const [uploadImages, { isLoading: uploading }] = useUploadPostImagesMutation();
  const [createPost, { isLoading: creating }] = useCreatePostMutation();

  const isLoading = uploading || creating;

  const counter = useMemo(() => `${description.length}/${MAX_DESC}`, [description.length]);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > MAX_DESC) return;
    setDescription(value);
    setUiError(null);
  };

  const onPublish = useCallback(async () => {
    if (isLoading) return;

    try {
      setUiError(null);

      // ✅ 1) гарантированно получаем реальный Blob
      const raw = (cropped as any).blob;
      const blob: Blob = isPromise<Blob>(raw) ? await raw : raw;

      if (!(blob instanceof Blob)) {
        throw new Error("Cropped blob is not a Blob");
      }

      // ✅ 2) blob -> File (mime корректный)
      const mime = blob.type || "image/jpeg";
      const ext = mime === "image/png" ? "png" : "jpg";
      const file = new File([blob], `post.${ext}`, { type: mime });

      // ✅ 3) upload
      const uploadRes = await uploadImages([file]).unwrap();
      const uploadIds = uploadRes.images.map(i => i.uploadId);

      // ✅ 4) create
      const trimmed = description.trim();
      await createPost({
        description: trimmed.length ? trimmed : undefined,
        childrenMetadata: uploadIds.map(uploadId => ({ uploadId })),
      }).unwrap();

      onPublished();
    } catch (e: any) {
      console.error("Publish failed:", e?.status, e?.data ?? e);
      setUiError("Something went wrong. Please try again.");
    }
  }, [createPost, cropped, description, isLoading, onPublished, uploadImages]);

  useEffect(() => {
    submitRef.current = onPublish;
    return () => {
      submitRef.current = null;
    };
  }, [onPublish, submitRef]);

  console.log("cropped.previewUrl =", cropped.previewUrl);
  console.log("typeof cropped.blob =", typeof (cropped as any).blob, "isBlob =", (cropped as any).blob instanceof Blob);
  console.log("blob value =", (cropped as any).blob);

  return (
    <div className={s.root}>
      {/* LEFT */}
      <div className={s.left}>
        <div className={s.imageWrap}>
          {/* ✅ Картинку показываем из cropped.previewUrl (самый стабильный вариант) */}
          <img className={s.image} src={cropped.previewUrl} alt="Publication preview" />

          <div style={{ color: "white", fontSize: 12, marginBottom: 8 }}>src: {String(cropped.previewUrl)}</div>
        </div>
      </div>

      {/* RIGHT */}
      <div className={s.right}>
        <div className={s.profileRow}>
          <div className={s.avatar} aria-hidden />
          <div className={s.userName}>URLProfile</div>
        </div>

        <div className={s.fieldLabel}>Add publication descriptions</div>

        <div className={s.textAreaWrap}>
          <TextArea
            value={description}
            onChange={onChange}
            placeholder="Text-area"
            rows={5}
            disabled={isLoading}
            error={uiError ?? undefined}
          />
          <div className={s.counter}>{counter}</div>
        </div>
      </div>
    </div>
  );
}
