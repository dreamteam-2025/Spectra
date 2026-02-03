"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Dialog } from "@/shared/ui/Dialog/Dialog";
import s from "./CreatePostModal.module.scss";
import { SelectPhotoStep } from "./steps/selectPhotoStep/SelectPhotoStep";
import { CroppingStep, CropPayload } from "./steps/croppingStep/CroppingStep";
import { PublishStep } from "./steps/publishStep/PublishStep";
import { Button } from "@/shared";
import { useMeQuery } from "@/features/auth";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type Step = "select" | "cropping" | "publish";

export function CreatePostModal({ open, onOpenChange }: Props) {
  const { data: user } = useMeQuery();

  if (!user) return null;

  const [step, setStep] = useState<Step>("select");
  const [originalPreviewUrl, setOriginalPreviewUrl] = useState<string | null>(null);
  const [cropped, setCropped] = useState<CropPayload | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const cropNextRef = useRef<null | (() => void)>(null);
  const publishRef = useRef<null | (() => void)>(null);

  const hasUnsaved = useMemo(() => {
    return Boolean(originalPreviewUrl || cropped);
  }, [originalPreviewUrl, cropped]);

  const reset = () => {
    if (originalPreviewUrl) URL.revokeObjectURL(originalPreviewUrl);
    if (cropped?.previewUrl) URL.revokeObjectURL(cropped.previewUrl);
    setOriginalPreviewUrl(null);
    setCropped(null);
    setStep("select");
  };

  const closeModal = () => {
    reset();
    onOpenChange(false);
  };

  const requestClose = () => {
    if (hasUnsaved) {
      setConfirmOpen(true);
      return;
    }
    closeModal();
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      requestClose();
    } else {
      onOpenChange(true);
    }
  };

  useEffect(() => {
    if (!open) {
      reset();
      setConfirmOpen(false);
    }
  }, [open]);

  const dialogWidth = step === "publish" ? 972 : 492;
  const paddingX = step === "select" ? 24 : 0;
  const paddingY = step === "select" ? 24 : 0;

  const headerSelect = (
    <div className={s.headerSelect}>
      <div className={s.titleLeft}>Add Photo</div>
      <button className={s.iconBtn} type="button" aria-label="Close" onClick={requestClose}>
        ✕
      </button>
    </div>
  );

  const headerCropping = (
    <div className={s.headerCropping}>
      <button
        className={s.iconBtn}
        type="button"
        aria-label="Back"
        onClick={() => {
          if (cropped?.previewUrl) URL.revokeObjectURL(cropped.previewUrl);
          setCropped(null);
          setStep("select");
        }}
      >
        ←
      </button>
      <div className={s.titleCenter}>Cropping</div>
      <Button variant="ghost" type="button" className={s.nextBtn} onClick={() => cropNextRef.current?.()}>
        Next
      </Button>
    </div>
  );

  const headerPublish = (
    <div className={s.headerPublish}>
      <button className={s.iconBtn} type="button" aria-label="Back" onClick={() => setStep("cropping")}>
        ←
      </button>
      <div className={s.titleCenter}>Publication</div>
      <Button variant="ghost" type="button" className={s.publishBtn} onClick={() => publishRef.current?.()}>
        Publish
      </Button>
    </div>
  );

  return (
    <>
      <Dialog
        key={`create-post-${step}`}
        open={open}
        onOpenChange={handleOpenChange}
        headerSlot={step === "select" ? headerSelect : step === "cropping" ? headerCropping : headerPublish}
        className={s.modal}
        showClose={false}
        title="Create post"
        width={dialogWidth}
        paddingX={paddingX}
        paddingY={paddingY}
      >
        {step === "select" && (
          <SelectPhotoStep
            onSelected={file => {
              const url = URL.createObjectURL(file);
              setOriginalPreviewUrl(url);
              setStep("cropping");
            }}
          />
        )}

        {step === "cropping" && originalPreviewUrl && (
          <CroppingStep
            previewUrl={originalPreviewUrl}
            onBack={() => setStep("select")}
            submitRef={cropNextRef}
            onNext={payload => {
              setCropped(payload);
              setStep("publish");
            }}
          />
        )}

        {step === "publish" && cropped && (
          <PublishStep
            previewUrl={cropped.previewUrl}
            cropped={cropped}
            submitRef={publishRef}
            onPublished={closeModal}
            user={user}
          />
        )}
      </Dialog>

      <Dialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        className={s.confirmDialogWrap}
        title="Close"
        description="Do you really want to close the creation of a publication? If you close everything will be deleted"
        width={378}
        paddingX={24}
        paddingY={24}
      >
        <div className={s.confirmButtons}>
          <Button variant="outlined" onClick={closeModal}>
            Discard
          </Button>
          <Button variant="primary" onClick={() => setConfirmOpen(false)}>
            Continue editing
          </Button>
        </div>
      </Dialog>
    </>
  );
}
