import { useRef, useState } from "react";
import { Dialog } from "@/shared/ui/Dialog/Dialog";
import s from "./CreatePostModal.module.scss";
import { SelectPhotoStep } from "./steps/selectPhotoStep/SelectPhotoStep";
import { CroppingStep, CropPayload } from "./steps/croppingStep/CroppingStep";
import { Button } from "@/shared";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type Step = "select" | "cropping" | "filters" | "publish";


export function CreatePostModal({ open, onOpenChange }: Props) {
  const [step, setStep] = useState<Step>("select");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);


  const cropNextRef = useRef<null | (() => void)>(null);

  const reset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setStep("select");
  };

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) reset();
    onOpenChange(nextOpen);
  };

  const headerSelect = (
    <div className={s.headerSelect}>
      <div className={s.titleLeft}>Add Photo</div>
      <button className={s.iconBtn} type="button" aria-label="Close" onClick={() => handleClose(false)}>
        ✕
      </button>
    </div>
  );

  const headerCropping = (
    <div className={s.headerCropping}>
      <button className={s.iconBtn} type="button" aria-label="Back" onClick={() => setStep("select")}>
        ←
      </button>

      <div className={s.titleCenter}>Cropping</div>

      
      <Button variant="ghost" type="button" className={s.nextBtn} onClick={() => cropNextRef.current?.()}>
        Next
      </Button>
    </div>
  );

  return (
    <Dialog
      open={open}
      onOpenChange={handleClose}
      headerSlot={step === "select" ? headerSelect : headerCropping}
      className={s.modal}
      showClose={false}
    >
      {step === "select" && (
        <SelectPhotoStep
          onSelected={file => {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setStep("cropping");
          }}
        />
      )}

      {step === "cropping" && previewUrl && (
        <CroppingStep
          previewUrl={previewUrl}
          onBack={() => setStep("select")}
          submitRef={cropNextRef}
          onNext={(payload: CropPayload) => {
            console.log("Cropped:", payload);
            handleClose(false);
          }}
        />
      )}
    </Dialog>
  );
}
