"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Dialog } from "@/shared/ui/Dialog/Dialog";
import s from "./CreatePostModal.module.scss";
import { SelectPhotoStep } from "./steps/selectPhotoStep/SelectPhotoStep";
import { CroppingStep, CropPayload } from "./steps/croppingStep/CroppingStep";
import { Button } from "@/shared";
import { PublishStep } from "./steps/publishStep/PublishStep";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type Step = "select" | "cropping" | "publish";

export function CreatePostModal({ open, onOpenChange }: Props) {
  const [step, setStep] = useState<Step>("select");
  const [originalPreviewUrl, setOriginalPreviewUrl] = useState<string | null>(null);

  const [cropped, setCropped] = useState<CropPayload | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // refs for header buttons
  const cropNextRef = useRef<null | (() => void)>(null);
  const publishRef = useRef<null | (() => void)>(null);

  const hasUnsaved = useMemo(() => {
    return step !== "select" || Boolean(originalPreviewUrl) || Boolean(cropped);
  }, [cropped, originalPreviewUrl, step]);

  const reset = () => {
    if (originalPreviewUrl) URL.revokeObjectURL(originalPreviewUrl);
    if (cropped?.previewUrl) URL.revokeObjectURL(cropped.previewUrl);

    setOriginalPreviewUrl(null);
    setCropped(null);
    setStep("select");
  };

  const requestClose = () => {
    if (hasUnsaved) {
      setConfirmOpen(true);
      return;
    }
    reset();
    onOpenChange(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      requestClose();
      return;
    }
    onOpenChange(true);
  };

  useEffect(() => {
    if (!open) {
      reset();
      setConfirmOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // ✅ ширина / padding по шагам (как в Figma)
  const dialogWidth = step === "publish" ? 972 : 492;
  const dialogPadding = step === "publish" ? 0 : 24;


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
          setStep("select");
          if (cropped?.previewUrl) URL.revokeObjectURL(cropped.previewUrl);
          setCropped(null);
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
        key={`create-post-${step}`} // ✅ важно при смене ширины/паддинга (492 ↔ 972)
        open={open}
        onOpenChange={handleOpenChange}
        headerSlot={step === "select" ? headerSelect : step === "cropping" ? headerCropping : headerPublish}
        className={s.modal} // тут НЕ должно быть width
        showClose={false}
        title="Create post"
        width={dialogWidth}
  paddingX={paddingX}
  paddingY={paddingY}
        // padding={dialogPadding} // ✅ publish: 0 чтобы картинка могла быть “в край”
        contentProps={{
          onInteractOutside: e => {
            if (!hasUnsaved) return;
            e.preventDefault();
            setConfirmOpen(true);
          },
          onEscapeKeyDown: e => {
            if (!hasUnsaved) return;
            e.preventDefault();
            setConfirmOpen(true);
          },
        }}
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
            onNext={(payload: CropPayload) => {
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
            onPublished={() => {
              reset();
              onOpenChange(false);
            }}
          />
        )}
      </Dialog>

      <Dialog
        key="create-post-confirm"
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        className={s.confirmDialogWrap}
        title="Close"
        description="Do you really want to close the creation of a publication? If you close everything will be deleted"
        width={378}
  paddingX={24}
  paddingY={24}
        // padding={24} // ✅ явно оставляем нормальный padding
      >
        <div className={s.confirmButtons}>
          <div className={s.leftBtn}>
            <Button
              variant="outlined"
              type="button"
              onClick={() => {
                setConfirmOpen(false);
                reset();
                onOpenChange(false);
              }}
            >
              Discard
            </Button>
          </div>

          <div className={s.rightBtn}>
            <Button
              variant="primary"
              type="button"
              onClick={() => {
                setConfirmOpen(false);
                reset();
                onOpenChange(false);
              }}
            >
              Save draft
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
