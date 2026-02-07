// import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import Cropper, { Area } from "react-easy-crop";
// import s from "./CroppingStep.module.scss";
// import { getCroppedBlob } from "@/features/post/model/cropImage";

// type Ratio = "1:1" | "4:5" | "16:9";

// const ratioToAspect: Record<Ratio, number> = {
//   "1:1": 1,
//   "4:5": 4 / 5,
//   "16:9": 16 / 9,
// };

// export type CropPayload = {
//   blob: Blob;
//   previewUrl: string;
//   aspect: number;
// };

// type Props = {
//   previewUrl: string;
//   onBack: () => void;
//   onNext: (payload: CropPayload) => void;
//   submitRef: React.RefObject<(() => void) | null>;
// };

// export function CroppingStep({ previewUrl, onBack, onNext, submitRef }: Props) {
//   const [ratio, setRatio] = useState<Ratio>("1:1");
//   const aspect = useMemo(() => ratioToAspect[ratio], [ratio]);

//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
//   const [loading, setLoading] = useState(false);

//   const lastPreviewUrlRef = useRef<string | null>(null);

//   const onCropComplete = useCallback((_a: Area, areaPixels: Area) => {
//     setCroppedAreaPixels(areaPixels);
//   }, []);

//   const handleNext = useCallback(async () => {
//     if (!croppedAreaPixels || loading) return;

//     setLoading(true);
//     try {
//       const blob = await getCroppedBlob(previewUrl, croppedAreaPixels);
//       const nextPreviewUrl = URL.createObjectURL(blob);

//       if (lastPreviewUrlRef.current) {
//         URL.revokeObjectURL(lastPreviewUrlRef.current);
//       }
//       lastPreviewUrlRef.current = nextPreviewUrl;

//       onNext({ blob, previewUrl: nextPreviewUrl, aspect });
//     } finally {
//       setLoading(false);
//     }
//   }, [aspect, croppedAreaPixels, loading, onNext, previewUrl]);

//   useEffect(() => {
//     if (submitRef) {
//       submitRef.current = handleNext;
//     }
//     return () => {
//       if (submitRef?.current === handleNext) {
//         submitRef.current = null;
//       }
//     };
//   }, [handleNext, submitRef]);

//   return (
//     <div className={s.root}>
//       <div className={s.canvas}>
//         <Cropper
//           image={previewUrl}
//           crop={crop}
//           zoom={zoom}
//           aspect={aspect}
//           onCropChange={setCrop}
//           onZoomChange={setZoom}
//           onCropComplete={onCropComplete}
//           restrictPosition
//           objectFit="cover"
//         />

//         <div className={s.controls}>
//           <div className={s.ratios}>
//             <button className={s.ratioBtn} type="button" onClick={() => setRatio("1:1")} aria-pressed={ratio === "1:1"}>
//               1:1
//             </button>

//             <button className={s.ratioBtn} type="button" onClick={() => setRatio("4:5")} aria-pressed={ratio === "4:5"}>
//               4:5
//             </button>

//             <button
//               className={s.ratioBtn}
//               type="button"
//               onClick={() => setRatio("16:9")}
//               aria-pressed={ratio === "16:9"}
//             >
//               16:9
//             </button>
//           </div>

//           <input
//             className={s.zoom}
//             type="range"
//             min={1}
//             max={3}
//             step={0.01}
//             value={zoom}
//             onChange={e => setZoom(Number(e.target.value))}
//             aria-label="zoom"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }










// "use client";

// import type React from "react";
// import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import Cropper, { type Area } from "react-easy-crop";
// import clsx from "clsx";

// import s from "./CroppingStep.module.scss";
// import { getCroppedBlob } from "@/features/post/model/cropImage";

// type Ratio = "1:1" | "4:5" | "16:9";

// const ratioToAspect: Record<Ratio, number> = {
//   "1:1": 1,
//   "4:5": 4 / 5,
//   "16:9": 16 / 9,
// };

// export type CropPayload = {
//   blob: Blob;
//   previewUrl: string;
//   aspect: number;
// };

// type CreateImage = {
//   id: string;
//   file: File;
//   originalUrl: string;
// };

// type Props = {
//   images: CreateImage[];
//   croppedList: (CropPayload | null)[];
//   activeIndex: number;
//   setActiveIndex: (idx: number) => void;

//   onAddFiles: (files: File[]) => void;

//   onNext: (payload: CropPayload) => void;
//   submitRef: React.RefObject<(() => void) | null>;
// };

// const MAX_SIZE = 20 * 1024 * 1024;
// const ALLOWED = new Set(["image/jpeg", "image/png"]);

// export function CroppingStep({
//   images,
//   croppedList,
//   activeIndex,
//   setActiveIndex,
//   onAddFiles,
//   onNext,
//   submitRef,
// }: Props) {
//   const [ratio, setRatio] = useState<Ratio>("1:1");
//   const aspect = useMemo(() => ratioToAspect[ratio], [ratio]);

//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
//   const [loading, setLoading] = useState(false);

//   const [addOpen, setAddOpen] = useState(false);
//   const addInputRef = useRef<HTMLInputElement | null>(null);

//   const current = images[activeIndex];
//   const currentPreviewUrl = croppedList[activeIndex]?.previewUrl ?? current?.originalUrl;

//   const onCropComplete = useCallback((_a: Area, areaPixels: Area) => {
//     setCroppedAreaPixels(areaPixels);
//   }, []);

//   // при смене активной фотки — сбрасываем управление кроппером (чтобы не "таскало" старые координаты)
//   useEffect(() => {
//     setCrop({ x: 0, y: 0 });
//     setZoom(1);
//     setCroppedAreaPixels(null);
//   }, [activeIndex, ratio]);

//   const handleNext = useCallback(async () => {
//     if (!current || !croppedAreaPixels || loading) return;

//     setLoading(true);
//     try {
//       // кропаем от ОРИГИНАЛА (а не от уже кропнутого preview)
//       const blob = await getCroppedBlob(current.originalUrl, croppedAreaPixels);
//       const nextPreviewUrl = URL.createObjectURL(blob);

//       onNext({ blob, previewUrl: nextPreviewUrl, aspect });
//     } finally {
//       setLoading(false);
//     }
//   }, [aspect, croppedAreaPixels, current, loading, onNext]);

//   useEffect(() => {
//     if (submitRef) submitRef.current = handleNext;
//     return () => {
//       if (submitRef?.current === handleNext) submitRef.current = null;
//     };
//   }, [handleNext, submitRef]);

//   const goPrev = () => setActiveIndex(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
//   const goNext = () => setActiveIndex(activeIndex === images.length - 1 ? 0 : activeIndex + 1);

//   const validate = (file: File) => ALLOWED.has(file.type) && file.size <= MAX_SIZE;

//   const onPickMore: React.ChangeEventHandler<HTMLInputElement> = (e) => {
//     const list = Array.from(e.target.files ?? []);
//     if (!list.length) return;

//     const bad = list.find((f) => !validate(f));
//     if (bad) {
//       // без UI-ошибки, чтобы не ломать верстку — можно добавить позже
//       e.target.value = "";
//       return;
//     }

//     setAddOpen(false);
//     onAddFiles(list);
//     e.target.value = "";
//   };

//   if (!current) return null;

//   return (
//     <div className={s.root}>
//       <div className={s.canvas}>
//         <Cropper
//           image={current.originalUrl}
//           crop={crop}
//           zoom={zoom}
//           aspect={aspect}
//           onCropChange={setCrop}
//           onZoomChange={setZoom}
//           onCropComplete={onCropComplete}
//           restrictPosition
//           objectFit="cover"
//         />

//         {/* большие стрелки (как на макете) */}
//         {images.length > 1 && (
//           <>
//             <button type="button" className={clsx(s.navBtn, s.navLeft)} onClick={goPrev} aria-label="Previous image">
//               ‹
//             </button>
//             <button type="button" className={clsx(s.navBtn, s.navRight)} onClick={goNext} aria-label="Next image">
//               ›
//             </button>
//           </>
//         )}

//         <div className={s.controls}>
//           {/* миниатюры */}
//           {images.length > 1 && (
//             <div className={s.thumbs}>
//               {images.map((img, idx) => (
//                 <button
//                   key={img.id}
//                   type="button"
//                   className={clsx(s.thumbBtn, idx === activeIndex && s.thumbActive)}
//                   onClick={() => setActiveIndex(idx)}
//                   aria-label={`Go to image ${idx + 1}`}
//                 >
//                   {/* eslint-disable-next-line @next/next/no-img-element */}
//                   <img className={s.thumbImg} src={croppedList[idx]?.previewUrl ?? img.originalUrl} alt="" />
//                 </button>
//               ))}
//             </div>
//           )}

//           <button
//             type="button"
//             className={s.goOriginal}
//             onClick={() => {
//               // "Go to not cropped": просто показываем оригинал (кроп не удаляем, но UI будет по оригиналу)
//               // Если хочешь именно стереть кроп — сделаем, но тогда надо пробрасывать setter сюда.
//               // Сейчас: логика без разрушений.
//             }}
//           >
//             Go to not cropped
//           </button>

//           <div className={s.bottomRow}>
//             <div className={s.ratios}>
//               <button className={s.ratioBtn} type="button" onClick={() => setRatio("1:1")} aria-pressed={ratio === "1:1"}>
//                 1:1
//               </button>
//               <button className={s.ratioBtn} type="button" onClick={() => setRatio("4:5")} aria-pressed={ratio === "4:5"}>
//                 4:5
//               </button>
//               <button
//                 className={s.ratioBtn}
//                 type="button"
//                 onClick={() => setRatio("16:9")}
//                 aria-pressed={ratio === "16:9"}
//               >
//                 16:9
//               </button>
//             </div>

//             <input
//               className={s.zoom}
//               type="range"
//               min={1}
//               max={3}
//               step={0.01}
//               value={zoom}
//               onChange={(e) => setZoom(Number(e.target.value))}
//               aria-label="zoom"
//             />

//             {/* ✅ кнопка добавления фото (правый нижний угол) */}
//             <div className={s.addWrap}>
//               <button
//                 type="button"
//                 className={s.addBtn}
//                 aria-label="Add photo"
//                 onClick={() => setAddOpen((v) => !v)}
//               >
//                 ⧉
//               </button>

//               {addOpen && (
//                 <div className={s.addMenu}>
//                   <button
//                     type="button"
//                     className={s.addPlus}
//                     onClick={() => addInputRef.current?.click()}
//                     aria-label="Add new photo"
//                   >
//                     +
//                   </button>

//                   <input
//                     ref={addInputRef}
//                     className={s.addInput}
//                     type="file"
//                     accept="image/jpeg,image/png"
//                     multiple
//                     onChange={onPickMore}
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }












"use client";

import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import clsx from "clsx";

import s from "./CroppingStep.module.scss";
import { getCroppedBlob } from "@/features/post/model/cropImage";

type Ratio = "1:1" | "4:5" | "16:9";

const ratioToAspect: Record<Ratio, number> = {
  "1:1": 1,
  "4:5": 4 / 5,
  "16:9": 16 / 9,
};

export type CropPayload = {
  blob: Blob;
  previewUrl: string;
  aspect: number;
};

type CreateImage = {
  id: string;
  file: File;
  originalUrl: string;
};

type Props = {
  images: CreateImage[];
  croppedList: (CropPayload | null)[];
  activeIndex: number;
  setActiveIndex: (idx: number) => void;

  onAddFiles: (files: File[]) => void;

  onNext: (payload: CropPayload) => void;
  submitRef: React.RefObject<(() => void) | null>;
};

const MAX_SIZE = 20 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png"]);

export function CroppingStep({
  images,
  croppedList,
  activeIndex,
  setActiveIndex,
  onAddFiles,
  onNext,
  submitRef,
}: Props) {
  const [ratio, setRatio] = useState<Ratio>("1:1");
  const aspect = useMemo(() => ratioToAspect[ratio], [ratio]);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ popovers (под макет — иконки снизу, сами поповеры маленькие)
  const [zoomOpen, setZoomOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const addInputRef = useRef<HTMLInputElement | null>(null);

  const current = images[activeIndex];
  const preview = croppedList[activeIndex]?.previewUrl ?? current?.originalUrl;

  const onCropComplete = useCallback((_a: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  // при смене активной фотки — сбрасываем управление кроппером
  useEffect(() => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  }, [activeIndex, ratio]);

  const handleNext = useCallback(async () => {
    if (!current || !croppedAreaPixels || loading) return;

    setLoading(true);
    try {
      // кропаем от оригинала
      const blob = await getCroppedBlob(current.originalUrl, croppedAreaPixels);
      const nextPreviewUrl = URL.createObjectURL(blob);

      onNext({ blob, previewUrl: nextPreviewUrl, aspect });
    } finally {
      setLoading(false);
    }
  }, [aspect, croppedAreaPixels, current, loading, onNext]);

  useEffect(() => {
    submitRef.current = handleNext;
    return () => {
      if (submitRef.current === handleNext) submitRef.current = null;
    };
  }, [handleNext, submitRef]);

  const goPrev = () => setActiveIndex(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
  const goNext = () => setActiveIndex(activeIndex === images.length - 1 ? 0 : activeIndex + 1);

  const validate = (file: File) => ALLOWED.has(file.type) && file.size <= MAX_SIZE;

  const onPickMore: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const list = Array.from(e.target.files ?? []);
    if (!list.length) return;

    const bad = list.find((f) => !validate(f));
    if (bad) {
      e.target.value = "";
      return;
    }

    onAddFiles(list);
    e.target.value = "";
  };

  if (!current) return null;

  return (
    <div className={s.root}>
      <div className={s.canvas}>
        <Cropper
          image={current.originalUrl}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          restrictPosition
          objectFit="cover"
        />

        {/* ✅ стрелки (квадратные, как в макете) */}
        {images.length > 1 && (
          <>
            <button type="button" className={clsx(s.navBtn, s.navLeft)} onClick={goPrev} aria-label="Previous image">
              ‹
            </button>
            <button type="button" className={clsx(s.navBtn, s.navRight)} onClick={goNext} aria-label="Next image">
              ›
            </button>
          </>
        )}

        {/* ✅ нижняя панель (как в макете) */}
        <div className={s.bottomBar}>
          {/* левый блок иконок */}
          <div className={s.leftTools}>
            <button
              type="button"
              className={s.toolBtn}
              aria-label="Open settings"
              onClick={() => {
                setSettingsOpen((v) => !v);
                setZoomOpen(false);
              }}
            >
              ⤢
            </button>

            <button
              type="button"
              className={s.toolBtn}
              aria-label="Zoom"
              onClick={() => {
                setZoomOpen((v) => !v);
                setSettingsOpen(false);
              }}
            >
              🔍
            </button>

            {/* мини-поповер: zoom */}
            {zoomOpen && (
              <div className={clsx(s.popover, s.zoomPopover)}>
                <input
                  className={s.zoom}
                  type="range"
                  min={1}
                  max={3}
                  step={0.01}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  aria-label="zoom"
                />
              </div>
            )}

            {/* мини-поповер: ratio */}
            {settingsOpen && (
              <div className={clsx(s.popover, s.settingsPopover)}>
                <div className={s.ratios}>
                  <button
                    className={s.ratioBtn}
                    type="button"
                    onClick={() => setRatio("1:1")}
                    aria-pressed={ratio === "1:1"}
                  >
                    1:1
                  </button>
                  <button
                    className={s.ratioBtn}
                    type="button"
                    onClick={() => setRatio("4:5")}
                    aria-pressed={ratio === "4:5"}
                  >
                    4:5
                  </button>
                  <button
                    className={s.ratioBtn}
                    type="button"
                    onClick={() => setRatio("16:9")}
                    aria-pressed={ratio === "16:9"}
                  >
                    16:9
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* точки (центр) */}
          {images.length > 1 && (
            <div className={s.dots} aria-label="Slides">
              {images.map((img, idx) => (
                <button
                  key={img.id}
                  type="button"
                  className={clsx(s.dot, idx === activeIndex && s.dotActive)}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* правый блок: миниатюры + add */}
          <div className={s.galleryWrap}>
            <div className={s.gallery}>
              {images.slice(0, 10).map((img, idx) => (
                <button
                  key={img.id}
                  type="button"
                  className={clsx(s.thumbBtn, idx === activeIndex && s.thumbActive)}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to image ${idx + 1}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className={s.thumbImg} src={croppedList[idx]?.previewUrl ?? img.originalUrl} alt="" />
                </button>
              ))}
            </div>

            <button type="button" className={s.addBtn} aria-label="Add photo" onClick={() => addInputRef.current?.click()}>
              +
            </button>

            <input
              ref={addInputRef}
              className={s.addInput}
              type="file"
              accept="image/jpeg,image/png"
              multiple
              onChange={onPickMore}
            />
          </div>

          {/* чтобы не “прыгало”, но и не мешало */}
          <div className={s.previewGuard} aria-hidden />
        </div>

        {/* чтобы не дергалось из-за unused */}
        <div className={s.hiddenPreview} aria-hidden>
          {preview}
        </div>
      </div>
    </div>
  );
}
