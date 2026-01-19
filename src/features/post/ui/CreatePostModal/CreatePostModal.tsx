// import { useState } from "react";
// import { Dialog } from "@/shared/ui/Dialog/Dialog";
// import s from "./CreatePostModal.module.scss";
// import { SelectPhotoStep } from "./steps/selectPhotoStep/SelectPhotoStep";
// import { CroppingStep } from "./steps/croppingStep/CroppingStep";

// type Props = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// };

// type Step = "select" | "cropping";

// export function CreatePostModal({ open, onOpenChange }: Props) {
//   const [step, setStep] = useState<Step>("select");
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   const reset = () => {
//     if (previewUrl) URL.revokeObjectURL(previewUrl);
//     setPreviewUrl(null);
//     setStep("select");
//   };

//   const handleClose = (nextOpen: boolean) => {
//     if (!nextOpen) reset();
//     onOpenChange(nextOpen);
//   };

//   return (
//     <Dialog
//       open={open}
//       onOpenChange={handleClose}
//       title={step === "select" ? "Add Photo" : "Cropping"}
//       className={s.modal}
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
//           onNext={() => {
//             // потом будет filters/description
//             handleClose(false);
//           }}
//         />
//       )}
//     </Dialog>
//   );
// }












// import { useState } from "react";
// import { Dialog } from "@/shared/ui/Dialog/Dialog";
// import s from "./CreatePostModal.module.scss";
// import { SelectPhotoStep } from "./steps/selectPhotoStep/SelectPhotoStep";
// import { CroppingStep } from "./steps/croppingStep/CroppingStep";

// type Props = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// };

// type Step = "select" | "cropping";

// export function CreatePostModal({ open, onOpenChange }: Props) {
//   const [step, setStep] = useState<Step>("select");
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   const reset = () => {
//     if (previewUrl) URL.revokeObjectURL(previewUrl);
//     setPreviewUrl(null);
//     setStep("select");
//   };

//   const handleClose = (nextOpen: boolean) => {
//     if (!nextOpen) reset();
//     onOpenChange(nextOpen);
//   };

//   const croppingHeader = (
//     <div className={s.headerRow}>
//       <button className={s.iconBtn} type="button" onClick={() => setStep("select")} aria-label="back">
//         ←
//       </button>
//       <div className={s.headerTitle}>Cropping</div>
//       <div className={s.headerRight} />
//     </div>
//   );

//   return (
//     <Dialog
//       open={open}
//       onOpenChange={handleClose}
//       title={step === "select" ? "Add Photo" : undefined}
//       header={step === "cropping" ? croppingHeader : undefined}
//       className={s.modal}
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
//           onNext={({ previewUrl: croppedPreview }) => {
//             // ✅ следующий шаг будет filters/description
//             // временно: закрываем
//             URL.revokeObjectURL(previewUrl);
//             setPreviewUrl(croppedPreview);
//             handleClose(false);
//           }}
//         />
//       )}
//     </Dialog>
//   );
// }




// import { useState } from "react";
// import { Dialog } from "@/shared/ui/Dialog/Dialog";
// import s from "./CreatePostModal.module.scss";
// import { SelectPhotoStep } from "./steps/selectPhotoStep/SelectPhotoStep";
// import { CroppingStep } from "./steps/croppingStep/CroppingStep";
// import { Button } from "@/shared";

// type Props = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// };

// type Step = "select" | "cropping";

// export function CreatePostModal({ open, onOpenChange }: Props) {
//   const [step, setStep] = useState<Step>("select");
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   const reset = () => {
//     if (previewUrl) URL.revokeObjectURL(previewUrl);
//     setPreviewUrl(null);
//     setStep("select");
//   };

//   const handleClose = (nextOpen: boolean) => {
//     if (!nextOpen) reset();
//     onOpenChange(nextOpen);
//   };

//   const header = (
//     <div className={s.header}>
//       {step === "cropping" ? (
//         <button className={s.iconBtn} type="button" onClick={() => setStep("select")} aria-label="Back">
//           ←
//         </button>
//       ) : (
//         <div className={s.iconSpacer} />
//       )}

//       <div className={s.headerTitle}>{step === "select" ? "Add Photo" : "Cropping"}</div>

//       {step === "cropping" ? (
//         <Button variant="primary" onClick={() => (document.getElementById("crop-next") as HTMLButtonElement)?.click()}>
//           Next
//         </Button>
//       ) : (
//         <button className={s.iconBtn} type="button" aria-label="Close" onClick={() => handleClose(false)}>
//           ✕
//         </button>
//       )}
//     </div>
//   );

//   return (
//     <Dialog
//       open={open}
//       onOpenChange={handleClose}
//       headerSlot={header}
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
//           onNext={(payload) => {
//             // дальше будет filters/description
//             handleClose(false);
//           }}
//         />
//       )}
//     </Dialog>
//   );
// }













// import { useState } from "react";
// import { Dialog } from "@/shared/ui/Dialog/Dialog";
// import s from "./CreatePostModal.module.scss";
// import { SelectPhotoStep } from "./steps/selectPhotoStep/SelectPhotoStep";
// import { CroppingStep } from "./steps/croppingStep/CroppingStep";
// import { Button } from "@/shared";

// type Props = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// };

// type Step = "select" | "cropping";

// export function CreatePostModal({ open, onOpenChange }: Props) {
//   const [step, setStep] = useState<Step>("select");
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

//       <Button
//         variant="primary"
//         type="button"
//         onClick={() => {
//           const el = document.getElementById("crop-next") as HTMLButtonElement | null;
//           el?.click();
//         }}
//       >
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
//           onNext={({ previewUrl: _croppedPreviewUrl, blob: _blob }) => {
//             // дальше будет filters/description
//             handleClose(false);
//           }}
//         />
//       )}
//     </Dialog>
//   );
// }













import { useState } from "react";
import { Dialog } from "@/shared/ui/Dialog/Dialog";
import s from "./CreatePostModal.module.scss";
import { SelectPhotoStep } from "./steps/selectPhotoStep/SelectPhotoStep";
import { CroppingStep } from "./steps/croppingStep/CroppingStep";
import { Button } from "@/shared";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type Step = "select" | "cropping";

export function CreatePostModal({ open, onOpenChange }: Props) {
  const [step, setStep] = useState<Step>("select");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

      <Button
  variant="ghost"
  type="button"
  className={s.nextBtn}
  onClick={() => {
    const el = document.getElementById("crop-next") as HTMLButtonElement | null;
    el?.click();
  }}
>
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
          onNext={() => {
            // дальше будет filters/description
            handleClose(false);
          }}
        />
      )}
    </Dialog>
  );
}
