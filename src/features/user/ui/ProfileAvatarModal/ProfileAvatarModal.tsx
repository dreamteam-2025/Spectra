"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Dialog } from "@/shared/ui/Dialog/Dialog";
import { Button } from "@/shared";
import { SelectPhotoStep } from "@/features/post/ui/CreatePostModal/steps/selectPhotoStep/SelectPhotoStep";
import s from "./ProfileAvatarModal.module.scss";
import { useUploadAvatarMutation } from "@/features/user/api/userApi";
import { useObjectURL } from "@/shared/lib/hooks/useObjectURL";
import { validateAvatar } from "../../model/validateAvatar";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved?: () => void;
};

type Step = "select" | "preview";

export function ProfileAvatarModal({ open, onOpenChange, onSaved }: Props) {
  const [step, setStep] = useState<Step>("select");
  const [file, setFile] = useState<File | null>(null);

  const previewUrl = useObjectURL(file);

  const [uploadAvatar, { isLoading }] = useUploadAvatarMutation();

  useEffect(() => {
    if (!open) {
      setStep("select");
      setFile(null);
    }
  }, [open]);

  const reset = () => {
    setStep("select");
    setFile(null);
  };

  const close = () => {
    reset();
    onOpenChange(false);
  };

  const onSelected = (files: File[]) => {
    const f = files[0];
    if (!f) return;

    const res = validateAvatar(f);
    if (!res.isValid) {
      return;
    }

    setFile(f);
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
