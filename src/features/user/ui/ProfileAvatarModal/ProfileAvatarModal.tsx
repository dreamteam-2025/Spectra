"use client";

import { useEffect, useRef, useState } from "react";
import { Dialog } from "@/shared/ui/Dialog/Dialog";
import { Button } from "@/shared";
import s from "./ProfileAvatarModal.module.scss";
import { useUploadAvatarMutation } from "@/features/user/api/userApi";
import { useObjectURL } from "@/shared/lib/hooks/useObjectURL";
import { validateAvatar } from "../../model/validateAvatar";
import { useMeQuery } from "@/features/auth";
import { AvatarCroppingStep } from "../steps/AvatarCroppingStep";
import { SelectPhotoStep } from "@/features/post/ui/CreatePostModal/steps/selectPhotoStep/SelectPhotoStep";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved?: () => void;
};

type Step = "select" | "cropping";

export function ProfileAvatarModal({ open, onOpenChange, onSaved }: Props) {
  const { data: meResponse } = useMeQuery();

  const [step, setStep] = useState<Step>("select");
  const [file, setFile] = useState<File | null>(null);

  // кэш кропа (важно сбрасывать, когда пользователь двигает crop/zoom)
  const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);

  const previewUrl = useObjectURL(file);

  const [uploadAvatar, { isLoading }] = useUploadAvatarMutation();

  // submitRef из шага cropping: возвращает Blob (кропнутый)
  const cropSubmitRef = useRef<null | (() => Promise<Blob | null>)>(null);

  // защита от double click (на случай, если isLoading не успел обновиться)
  const savingRef = useRef(false);

  const reset = () => {
    setStep("select");
    setFile(null);
    setCroppedBlob(null);
  };

  useEffect(() => {
    if (!open) reset();
  }, [open]);

  const close = () => {
    reset();
    onOpenChange(false);
  };

  const onSelected = (files: File[]) => {
    const f = files[0];
    if (!f) return;

    const res = validateAvatar(f);
    if (!res.isValid) return;

    setFile(f);
    setCroppedBlob(null);
    setStep("cropping");
  };

  const getFileToUpload = async (): Promise<File | null> => {
    if (!file) return null;

    let blob = croppedBlob;

    // если blob ещё не готов или пользователь менял crop/zoom — берём новый
    if (!blob) {
      blob = (await cropSubmitRef.current?.()) ?? null;
      setCroppedBlob(blob);
    }

    if (blob instanceof Blob) {
      return new File([blob], "avatar.jpg", { type: blob.type || "image/jpeg" });
    }

    return file;
  };

  const onSave = async () => {
    if (!meResponse?.userId) return;
    if (!file) return;

    if (isLoading || savingRef.current) return;
    savingRef.current = true;

    try {
      const toUploadFile = await getFileToUpload();
      if (!toUploadFile) return;

      await uploadAvatar({ file: toUploadFile, userId: meResponse.userId }).unwrap();

      close();
      onSaved?.();
    } catch (e) {
      console.error(e);
    } finally {
      savingRef.current = false;
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

        {step === "cropping" && previewUrl && (
          <div className={s.croppingWrap}>
            <div className={s.cropCenter}>
              <AvatarCroppingStep
                imageUrl={previewUrl}
                submitRef={cropSubmitRef}
                onDirty={() => setCroppedBlob(null)}
              />
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