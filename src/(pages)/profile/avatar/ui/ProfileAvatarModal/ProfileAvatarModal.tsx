"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { Dialog } from "@/shared/ui/Dialog/Dialog";
import { Button } from "@/shared";
import { SelectPhotoStep } from "@/features/post/ui/CreatePostModal/steps/selectPhotoStep/SelectPhotoStep";

import s from "./ProfileAvatarModal.module.scss";
import { useUploadAvatarMutation } from "../../api/avatarApi";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved?: () => void;
};

type Step = "select" | "preview";

const MAX_AVATAR_SIZE = 10 * 1024 * 1024;
const isValidAvatar = (f: File) => (f.type === "image/jpeg" || f.type === "image/png") && f.size <= MAX_AVATAR_SIZE;

export function ProfileAvatarModal({ open, onOpenChange, onSaved }: Props) {
  const [step, setStep] = useState<Step>("select");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [uploadAvatar, { isLoading }] = useUploadAvatarMutation();

  // ✅ чистим objectURL на размонтировании компонента (без влияния на шаги)
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const reset = () => {
    setStep("select");
    setFile(null);
    setPreviewUrl(prev => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
  };

  const close = () => {
    reset();
    onOpenChange(false);
  };

  const onSelected = (files: File[]) => {
    const f = files[0];
    if (!f) return;
    if (!isValidAvatar(f)) return;
    setFile(f);
    setPreviewUrl(prev => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(f);
    });
    setStep("preview");
  };

  const onSave = async () => {
    if (!file) return;

    try {
      await uploadAvatar(file).unwrap();
      close();
      onSaved?.();
    } catch (e) {
      console.error(e);
    }
  };

  const header = (
    <div className={s.header}>
      <div className={s.title}>Add a Profile Photo</div>
      <button className={s.closeBtn} type="button" aria-label="Close" onClick={close}>
        ✕
      </button>
    </div>
  );

  return (
    <Dialog
      open={open}
      onOpenChange={nextOpen => {
        if (!nextOpen) close();
        else onOpenChange(true);
      }}
      headerSlot={header}
      showClose={false}
      showDivider
      width={492}
      paddingX={0}
      paddingY={0}
      className={s.modal}
      title="Add a Profile Photo"
    >
      <div className={s.body}>
        {step === "select" && (
          <div className={s.selectWrap}>
            <SelectPhotoStep onSelected={onSelected} max={1} currentCount={0} />
          </div>
        )}

        {step === "preview" && previewUrl && (
          <div className={s.previewStep}>
            <div className={s.avatarPreview}>
              <Image src={previewUrl} alt="Avatar preview" fill className={s.avatarImg} unoptimized />
            </div>

            <div className={s.actions}>
              <Button variant="primary" onClick={onSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
}
