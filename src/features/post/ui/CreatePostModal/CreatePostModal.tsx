// import { useRef, useState } from "react";
// import { Dialog } from "@/shared/ui/Dialog/Dialog";
// import s from "./CreatePostModal.module.scss";
// import { SelectPhotoStep } from "./steps/selectPhotoStep/SelectPhotoStep";
// import { CroppingStep, CropPayload } from "./steps/croppingStep/CroppingStep";
// import { Button } from "@/shared";

// type Props = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// };

// type Step = "select" | "cropping" | "filters" | "publish";

// export function CreatePostModal({ open, onOpenChange }: Props) {
//   const [step, setStep] = useState<Step>("select");
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   const cropNextRef = useRef<null | (() => void)>(null);

//   const reset = () => {
//     if (previewUrl) URL.revokeObjectURL(previewUrl);
//     setPreviewUrl(null);
//     setStep("select");
//   };

//   const handleClose = (nextOpen: boolean) => {
//     if (!nextOpen) reset();
//     onOpenChange(nextOpen);
//   };

//   const headerSelect = (
//     <div className={s.headerSelect}>
//       <div className={s.titleLeft}>Add Photo</div>
//       <button className={s.iconBtn} type="button" aria-label="Close" onClick={() => handleClose(false)}>
//         ✕
//       </button>
//     </div>
//   );

//   const headerCropping = (
//     <div className={s.headerCropping}>
//       <button className={s.iconBtn} type="button" aria-label="Back" onClick={() => setStep("select")}>
//         ←
//       </button>

//       <div className={s.titleCenter}>Cropping</div>

//       <Button variant="ghost" type="button" className={s.nextBtn} onClick={() => cropNextRef.current?.()}>
//         Next
//       </Button>
//     </div>
//   );

//   return (
//     <Dialog
//       open={open}
//       onOpenChange={handleClose}
//       headerSlot={step === "select" ? headerSelect : headerCropping}
//       className={s.modal}
//       showClose={false}
//     >
//       {step === "select" && (
//         <SelectPhotoStep
//           onSelected={file => {
//             const url = URL.createObjectURL(file);
//             setPreviewUrl(url);
//             setStep("cropping");
//           }}
//         />
//       )}

//       {step === "cropping" && previewUrl && (
//         <CroppingStep
//           previewUrl={previewUrl}
//           onBack={() => setStep("select")}
//           submitRef={cropNextRef}
//           onNext={(payload: CropPayload) => {
//             console.log("Cropped:", payload);
//             handleClose(false);
//           }}
//         />
//       )}
//     </Dialog>
//   );
// }

// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import { Dialog } from "@/shared/ui/Dialog/Dialog";
// import s from "./CreatePostModal.module.scss";
// import { SelectPhotoStep } from "./steps/selectPhotoStep/SelectPhotoStep";
// import { CroppingStep, CropPayload } from "./steps/croppingStep/CroppingStep";
// import { Button } from "@/shared";
// import { PublishStep } from "./steps/publishStep/PublishStep";

// type Props = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// };

// type Step = "select" | "cropping" | "publish";

// export function CreatePostModal({ open, onOpenChange }: Props) {
//   const [step, setStep] = useState<Step>("select");
//   const [originalPreviewUrl, setOriginalPreviewUrl] = useState<string | null>(null);

//   const [cropped, setCropped] = useState<CropPayload | null>(null);
//   const [confirmOpen, setConfirmOpen] = useState(false);

//   // refs for header buttons
//   const cropNextRef = useRef<null | (() => void)>(null);

//   const hasUnsaved = useMemo(() => {
//     return step !== "select" || Boolean(originalPreviewUrl) || Boolean(cropped);
//   }, [cropped, originalPreviewUrl, step]);

//   const reset = () => {
//     if (originalPreviewUrl) URL.revokeObjectURL(originalPreviewUrl);

//     if (cropped?.previewUrl) URL.revokeObjectURL(cropped.previewUrl);

//     setOriginalPreviewUrl(null);
//     setCropped(null);
//     setStep("select");
//   };

//   const requestClose = () => {
//     if (hasUnsaved) {
//       setConfirmOpen(true);
//       return;
//     }
//     reset();
//     onOpenChange(false);
//   };

//   const handleOpenChange = (nextOpen: boolean) => {
//     if (!nextOpen) {
//       // Radix wants to close (overlay click / Esc / etc.)
//       requestClose();
//       return;
//     }
//     onOpenChange(true);
//   };

//   // чтобы если родитель закрыл open=false — сбросить
//   useEffect(() => {
//     if (!open) {
//       reset();
//       setConfirmOpen(false);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [open]);

//   const headerSelect = (
//     <div className={s.headerSelect}>
//       <div className={s.titleLeft}>Add Photo</div>
//       <button className={s.iconBtn} type="button" aria-label="Close" onClick={requestClose}>
//         ✕
//       </button>
//     </div>
//   );

//   const headerCropping = (
//     <div className={s.headerCropping}>
//       <button
//         className={s.iconBtn}
//         type="button"
//         aria-label="Back"
//         onClick={() => {
//           // назад на select
//           setStep("select");
//           // кропнутый результат сбрасываем, original оставляем
//           if (cropped?.previewUrl) URL.revokeObjectURL(cropped.previewUrl);
//           setCropped(null);
//         }}
//       >
//         ←
//       </button>

//       <div className={s.titleCenter}>Cropping</div>

//       <Button variant="ghost" type="button" className={s.nextBtn} onClick={() => cropNextRef.current?.()}>
//         Next
//       </Button>
//     </div>
//   );

//   const headerPublish = (
//     <div className={s.headerPublish}>
//       <button className={s.iconBtn} type="button" aria-label="Back" onClick={() => setStep("cropping")}>
//         ←
//       </button>

//       <div className={s.titleCenter}>Publication</div>

//       <Button
//         variant="ghost"
//         type="button"
//         className={s.publishBtn}
//         onClick={() => {
//           // Publish происходит внутри PublishStep кнопкой в хедере не управляем напрямую
//           // Поэтому дернем "виртуальную" кнопку publish через custom event:
//           // проще: используем DOM-эвент.
//           const evt = new CustomEvent("incta_publish");
//           window.dispatchEvent(evt);
//         }}
//       >
//         Publish
//       </Button>
//     </div>
//   );

//   return (
//     <>
//       <Dialog
//         open={open}
//         onOpenChange={handleOpenChange}
//         headerSlot={step === "select" ? headerSelect : step === "cropping" ? headerCropping : headerPublish}
//         className={s.modal}
//         showClose={false}
//         title="Create post"
//         // ✅ перехватываем overlay click / esc и НЕ даем Radix закрыть сам
//         contentProps={{
//           onInteractOutside: e => {
//             if (!hasUnsaved) return;
//             e.preventDefault();
//             setConfirmOpen(true);
//           },
//           onEscapeKeyDown: e => {
//             if (!hasUnsaved) return;
//             e.preventDefault();
//             setConfirmOpen(true);
//           },
//         }}
//       >
//         {step === "select" && (
//           <SelectPhotoStep
//             onSelected={file => {
//               const url = URL.createObjectURL(file);
//               setOriginalPreviewUrl(url);
//               setStep("cropping");
//             }}
//           />
//         )}

//         {step === "cropping" && originalPreviewUrl && (
//           <CroppingStep
//             previewUrl={originalPreviewUrl}
//             onBack={() => setStep("select")}
//             submitRef={cropNextRef}
//             onNext={(payload: CropPayload) => {
//               // сохраняем кропнутый результат и переходим на публикацию
//               setCropped(payload);
//               setStep("publish");
//             }}
//           />
//         )}

//         {step === "publish" && cropped && (
//           <PublishStep
//             previewUrl={cropped.previewUrl}
//             cropped={cropped}
//             onBack={() => setStep("cropping")}
//             onPublished={() => {
//               // успешная публикация
//               reset();
//               onOpenChange(false);
//             }}
//           />
//         )}
//       </Dialog>

//       {/* Confirm close (как у тебя в LogOut примере) */}
//       <Dialog
//         open={confirmOpen}
//         onOpenChange={setConfirmOpen}
//         className={s.confirmDialogWrap}
//         title="Close"
//         description="Do you really want to close the creation of a publication? If you close everything will be deleted"
//       >
//         <div className={s.confirmButtons}>
//           <Button
//             variant="outlined"
//             type="button"
//             onClick={() => {
//               // Save draft optional — пока ведем себя как закрытие
//               setConfirmOpen(false);
//               reset();
//               onOpenChange(false);
//             }}
//           >
//             Save draft
//           </Button>

//           <Button
//             variant="primary"
//             type="button"
//             onClick={() => {
//               setConfirmOpen(false);
//               reset();
//               onOpenChange(false);
//             }}
//           >
//             Discard
//           </Button>

//           <Button variant="secondary" type="button" onClick={() => setConfirmOpen(false)}>
//             Cancel
//           </Button>
//         </div>
//       </Dialog>

//       {/* ловим publish event */}
//       <PublishEventBridge />
//     </>
//   );
// }

// /**
//  * Маленький мост: кнопка Publish в хедере — вне PublishStep.
//  * Чтобы не городить ещё один submitRef — шлём window event и ловим его здесь.
//  */
// function PublishEventBridge() {
//   useEffect(() => {
//     // noop — компонент только чтобы окно не ругалось при SSR
//   }, []);

//   return null;
// }

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
        open={open}
        onOpenChange={handleOpenChange}
        headerSlot={step === "select" ? headerSelect : step === "cropping" ? headerCropping : headerPublish}
        className={s.modal}
        showClose={false}
        title="Create post"
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
  open={confirmOpen}
  onOpenChange={setConfirmOpen}
  className={s.confirmDialogWrap}
  title="Close"
  description="Do you really want to close the creation of a publication? If you close everything will be deleted"
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
