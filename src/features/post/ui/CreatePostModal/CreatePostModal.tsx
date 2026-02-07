// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import { Dialog } from "@/shared/ui/Dialog/Dialog";
// import s from "./CreatePostModal.module.scss";
// import { SelectPhotoStep } from "./steps/selectPhotoStep/SelectPhotoStep";
// import { CroppingStep, CropPayload } from "./steps/croppingStep/CroppingStep";
// import { PublishStep } from "./steps/publishStep/PublishStep";
// import { Button } from "@/shared";
// import { useMeQuery } from "@/features/auth";

// type Props = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// };

// type Step = "select" | "cropping" | "publish";

// export function CreatePostModal({ open, onOpenChange }: Props) {
//   const { data: user } = useMeQuery();

//   if (!user) return null;

//   const [step, setStep] = useState<Step>("select");
//   const [originalPreviewUrl, setOriginalPreviewUrl] = useState<string | null>(null);
//   const [cropped, setCropped] = useState<CropPayload | null>(null);
//   const [confirmOpen, setConfirmOpen] = useState(false);

//   const cropNextRef = useRef<null | (() => void)>(null);
//   const publishRef = useRef<null | (() => void)>(null);

//   const hasUnsaved = useMemo(() => {
//     return Boolean(originalPreviewUrl || cropped);
//   }, [originalPreviewUrl, cropped]);

//   const reset = () => {
//     if (originalPreviewUrl) URL.revokeObjectURL(originalPreviewUrl);
//     if (cropped?.previewUrl) URL.revokeObjectURL(cropped.previewUrl);
//     setOriginalPreviewUrl(null);
//     setCropped(null);
//     setStep("select");
//   };

//   const closeModal = () => {
//     reset();
//     onOpenChange(false);
//   };

//   const requestClose = () => {
//     if (hasUnsaved) {
//       setConfirmOpen(true);
//       return;
//     }
//     closeModal();
//   };

//   const handleOpenChange = (nextOpen: boolean) => {
//     if (!nextOpen) {
//       requestClose();
//     } else {
//       onOpenChange(true);
//     }
//   };

//   useEffect(() => {
//     if (!open) {
//       reset();
//       setConfirmOpen(false);
//     }
//   }, [open]);

//   const dialogWidth = step === "publish" ? 972 : 492;
//   const paddingX = step === "select" ? 24 : 0;
//   const paddingY = step === "select" ? 24 : 0;

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
//           if (cropped?.previewUrl) URL.revokeObjectURL(cropped.previewUrl);
//           setCropped(null);
//           setStep("select");
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
//       <Button variant="ghost" type="button" className={s.publishBtn} onClick={() => publishRef.current?.()}>
//         Publish
//       </Button>
//     </div>
//   );

//   return (
//     <>
//       <Dialog
//         key={`create-post-${step}`}
//         open={open}
//         onOpenChange={handleOpenChange}
//         headerSlot={step === "select" ? headerSelect : step === "cropping" ? headerCropping : headerPublish}
//         className={s.modal}
//         showClose={false}
//         title="Create post"
//         width={dialogWidth}
//         paddingX={paddingX}
//         paddingY={paddingY}
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
//             onNext={payload => {
//               setCropped(payload);
//               setStep("publish");
//             }}
//           />
//         )}

//         {step === "publish" && cropped && (
//           <PublishStep
//             previewUrl={cropped.previewUrl}
//             cropped={cropped}
//             submitRef={publishRef}
//             onPublished={closeModal}
//             user={user}
//           />
//         )}
//       </Dialog>

//       <Dialog
//         open={confirmOpen}
//         onOpenChange={setConfirmOpen}
//         className={s.confirmDialogWrap}
//         title="Close"
//         description="Do you really want to close the creation of a publication? If you close everything will be deleted"
//         width={378}
//         paddingX={24}
//         paddingY={24}
//       >
//         <div className={s.confirmButtons}>
//           <Button variant="outlined" onClick={closeModal}>
//             Discard
//           </Button>
//           <Button variant="primary" onClick={() => setConfirmOpen(false)}>
//             Continue editing
//           </Button>
//         </div>
//       </Dialog>
//     </>
//   );
// }









"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { Dialog } from "@/shared/ui/Dialog/Dialog";
import { Button } from "@/shared";
import { useMeQuery } from "@/features/auth";

import s from "./CreatePostModal.module.scss";

import { SelectPhotoStep } from "./steps/selectPhotoStep/SelectPhotoStep";
import { CroppingStep, type CropPayload } from "./steps/croppingStep/CroppingStep";
import { PublishStep } from "./steps/publishStep/PublishStep";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type Step = "select" | "cropping" | "publish";

type CreateImage = {
  id: string;
  file: File;
  originalUrl: string; // objectURL of File
};

const MAX_IMAGES = 10;

export function CreatePostModal({ open, onOpenChange }: Props) {
  const { data: user } = useMeQuery();
  if (!user) return null;

  const [step, setStep] = useState<Step>("select");

  const [images, setImages] = useState<CreateImage[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // croppedList[i] относится к images[i]
  const [croppedList, setCroppedList] = useState<(CropPayload | null)[]>([]);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const cropNextRef = useRef<null | (() => void)>(null);
  const publishRef = useRef<null | (() => void)>(null);

  const hasUnsaved = useMemo(() => images.length > 0, [images.length]);

  const revokeAllUrls = () => {
    images.forEach((img) => URL.revokeObjectURL(img.originalUrl));
    croppedList.forEach((c) => {
      if (c?.previewUrl) URL.revokeObjectURL(c.previewUrl);
    });
  };

  const reset = () => {
    revokeAllUrls();
    setImages([]);
    setCroppedList([]);
    setActiveIndex(0);
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
    if (!nextOpen) requestClose();
    else onOpenChange(true);
  };

  useEffect(() => {
    if (!open) {
      reset();
      setConfirmOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const addFiles = (files: File[]) => {
    const safeFiles = files.filter((f) => f instanceof File);
    if (!safeFiles.length) return;

    setImages((prev) => {
      const free = MAX_IMAGES - prev.length;
      const toAdd = safeFiles.slice(0, free).map((file) => ({
        id: crypto.randomUUID(),
        file,
        originalUrl: URL.createObjectURL(file),
      }));

      const next = [...prev, ...toAdd];

      // подгоняем croppedList под новую длину
      setCroppedList((old) => {
        const copy = [...old];
        while (copy.length < next.length) copy.push(null);
        return copy;
      });

      // показываем последнюю добавленную
      if (toAdd.length) setActiveIndex(next.length - 1);

      return next;
    });

    setStep("cropping");
  };

  const onCropped = (payload: CropPayload) => {
    setCroppedList((prev) => {
      const copy = [...prev];

      // если раньше был кропнутый previewUrl — освобождаем
      const old = copy[activeIndex];
      if (old?.previewUrl) URL.revokeObjectURL(old.previewUrl);

      copy[activeIndex] = payload;
      return copy;
    });

    // ✅ Next один раз → сразу на publish
    setStep("publish");
  };

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
        onClick={() => setStep("select")}
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
            max={MAX_IMAGES}
            currentCount={images.length}
            onSelected={(files) => addFiles(files)}
          />
        )}

        {step === "cropping" && images.length > 0 && (
          <CroppingStep
            images={images}
            croppedList={croppedList}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            submitRef={cropNextRef}
            onAddFiles={(files) => addFiles(files)}
            onNext={onCropped}
          />
        )}

        {step === "publish" && images.length > 0 && (
          <PublishStep
            images={images}
            croppedList={croppedList}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
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











