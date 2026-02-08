// "use client";

// import type React from "react";
// import type { ChangeEvent } from "react";
// import { useEffect, useMemo, useRef, useState } from "react";
// import clsx from "clsx";

// import s from "./PublishStep.module.scss";

// import { TextArea } from "@/shared/ui/TextArea/TextArea";
// import { useCreatePostMutation, useUploadPostImagesMutation } from "@/features/post/api/postApi";
// import type { CropPayload } from "../croppingStep/CroppingStep";
// import type { MeResponse } from "@/features/auth/api/authApi.types";

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

//   submitRef: React.RefObject<(() => void) | null>;
//   onPublished: () => void;
//   user: MeResponse;
// };

// const MAX_DESC = 500;

// export function PublishStep({ images, croppedList, activeIndex, setActiveIndex, submitRef, onPublished, user }: Props) {
//   const [uploadImages, { isLoading: uploading }] = useUploadPostImagesMutation();
//   const [createPost, { isLoading: creating }] = useCreatePostMutation();

//   const [description, setDescription] = useState("");
//   const [error, setError] = useState<string | null>(null);

//   const isSubmitting = uploading || creating;
//   const submittedRef = useRef(false);

//   const counter = useMemo(() => `${description.length}/${MAX_DESC}`, [description.length]);

//   const slides = useMemo(() => {
//     return images.map((img, idx) => croppedList[idx]?.previewUrl ?? img.originalUrl);
//   }, [croppedList, images]);

//   const goPrev = () => setActiveIndex(activeIndex === 0 ? slides.length - 1 : activeIndex - 1);
//   const goNext = () => setActiveIndex(activeIndex === slides.length - 1 ? 0 : activeIndex + 1);

//   const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
//     const value = e.target.value;
//     if (value.length > MAX_DESC) return;
//     setDescription(value);
//     setError(null);
//   };

//   const buildFilesToUpload = async () => {
//     // если есть кроп — делаем файл из blob, иначе берем оригинальный File
//     const result: File[] = [];

//     for (let i = 0; i < images.length; i++) {
//       const c = croppedList[i];
//       if (c?.blob instanceof Blob) {
//         const mime = c.blob.type || "image/jpeg";
//         const ext = mime === "image/png" ? "png" : "jpg";
//         result.push(new File([c.blob], `post-${i + 1}.${ext}`, { type: mime }));
//       } else {
//         result.push(images[i].file);
//       }
//     }

//     return result;
//   };

//   const onPublish = async () => {
//     if (isSubmitting || submittedRef.current) return;

//     if (!images.length) {
//       setError("No images to publish.");
//       return;
//     }

//     submittedRef.current = true;
//     setError(null);

//     try {
//       const files = await buildFilesToUpload();

//       const uploadRes = await uploadImages(files).unwrap();
//       if (!uploadRes.images?.length) throw new Error("Upload failed");

//       await createPost({
//         description: description.trim() || undefined,
//         childrenMetadata: uploadRes.images.map((img) => ({ uploadId: img.uploadId })),
//       }).unwrap();

//       onPublished();
//     } catch {
//       submittedRef.current = false;
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   useEffect(() => {
//     submitRef.current = onPublish;
//     return () => {
//       submitRef.current = null;
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [images, croppedList, description]);

//   const hasMultiple = slides.length > 1;
//   const currentUrl = slides[activeIndex];

//   return (
//     <div className={s.root}>
//       <div className={s.left}>
//         <div className={s.imageWrap}>
//           {currentUrl ? (
//             <>
//               {/* eslint-disable-next-line @next/next/no-img-element */}
//               <img className={s.image} src={currentUrl} alt="Publication preview" />

//               {hasMultiple && (
//                 <>
//                   <button type="button" className={clsx(s.navBtn, s.leftBtn)} onClick={goPrev} aria-label="Previous slide">
//                     ‹
//                   </button>
//                   <button type="button" className={clsx(s.navBtn, s.rightBtn)} onClick={goNext} aria-label="Next slide">
//                     ›
//                   </button>

//                   <div className={s.dots}>
//                     {slides.map((_, idx) => (
//                       <button
//                         key={idx}
//                         type="button"
//                         className={clsx(s.dot, idx === activeIndex && s.dotActive)}
//                         onClick={() => setActiveIndex(idx)}
//                         aria-label={`Go to slide ${idx + 1}`}
//                       />
//                     ))}
//                   </div>
//                 </>
//               )}
//             </>
//           ) : (
//             <div className={s.noImage}>No image</div>
//           )}
//         </div>
//       </div>

//       <div className={s.right}>
//         <div className={s.profileRow}>
//           <div className={s.avatar} aria-hidden />
//           <div className={s.userName}>{user.userName}</div>
//         </div>

//         <div className={s.fieldLabel}>Add publication descriptions</div>

//         <div className={s.textAreaWrap}>
//           <TextArea
//             value={description}
//             onChange={onChange}
//             placeholder="Text-area"
//             rows={5}
//             disabled={isSubmitting}
//             error={error ?? undefined}
//           />
//           <div className={s.counter}>{counter}</div>
//         </div>

//         {error === "No images to publish." && <div className={s.hintError}>No images to publish.</div>}
//       </div>
//     </div>
//   );
// }


















"use client";

import type React from "react";
import type { ChangeEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";

import s from "./PublishStep.module.scss";

import { TextArea } from "@/shared/ui/TextArea/TextArea";
import { useCreatePostMutation, useUploadPostImagesMutation } from "@/features/post/api/postApi";
import type { CropPayload } from "../croppingStep/CroppingStep";
import type { MeResponse } from "@/features/auth/api/authApi.types";

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

  submitRef: React.RefObject<(() => void) | null>;
  onPublished: () => void;
  user: MeResponse;
};

const MAX_DESC = 500;

export function PublishStep({
  images,
  croppedList,
  activeIndex,
  setActiveIndex,
  submitRef,
  onPublished,
  user,
}: Props) {
  const [uploadImages, { isLoading: uploading }] = useUploadPostImagesMutation();
  const [createPost, { isLoading: creating }] = useCreatePostMutation();

  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const isSubmitting = uploading || creating;
  const submittedRef = useRef(false);

  const counter = useMemo(() => `${description.length}/${MAX_DESC}`, [description.length]);

  const slides = useMemo(() => {
    return images.map((img, idx) => croppedList[idx]?.previewUrl ?? img.originalUrl);
  }, [croppedList, images]);

  const goPrev = () => setActiveIndex(activeIndex === 0 ? slides.length - 1 : activeIndex - 1);
  const goNext = () => setActiveIndex(activeIndex === slides.length - 1 ? 0 : activeIndex + 1);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > MAX_DESC) return;
    setDescription(value);
    setError(null);
  };

  const buildFilesToUpload = async () => {
    const result: File[] = [];

    for (let i = 0; i < images.length; i++) {
      const c = croppedList[i];
      if (c?.blob instanceof Blob) {
        const mime = c.blob.type || "image/jpeg";
        const ext = mime === "image/png" ? "png" : "jpg";
        result.push(new File([c.blob], `post-${i + 1}.${ext}`, { type: mime }));
      } else {
        result.push(images[i].file);
      }
    }

    return result;
  };

  const onPublish = async () => {
    if (isSubmitting || submittedRef.current) return;

    if (!images.length) {
      setError("No images to publish.");
      return;
    }

    submittedRef.current = true;
    setError(null);

    try {
      const files = await buildFilesToUpload();

      const uploadRes = await uploadImages(files).unwrap();
      if (!uploadRes.images?.length) throw new Error("Upload failed");

      // ✅ ЕСЛИ ПУСТО → ОТПРАВЛЯЕМ ПРОБЕЛ
      const finalDescription = description.trim() === "" ? " " : description.trim();

      await createPost({
        description: finalDescription,
        childrenMetadata: uploadRes.images.map((img) => ({
          uploadId: img.uploadId,
        })),
      }).unwrap();

      onPublished();
    } catch {
      submittedRef.current = false;
      setError("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    submitRef.current = onPublish;
    return () => {
      submitRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images, croppedList, description]);

  const hasMultiple = slides.length > 1;
  const currentUrl = slides[activeIndex];

  return (
    <div className={s.root}>
      <div className={s.left}>
        <div className={s.imageWrap}>
          {currentUrl ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={s.image} src={currentUrl} alt="Publication preview" />

              {hasMultiple && (
                <>
                  <button
                    type="button"
                    className={clsx(s.navBtn, s.leftBtn)}
                    onClick={goPrev}
                    aria-label="Previous slide"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className={clsx(s.navBtn, s.rightBtn)}
                    onClick={goNext}
                    aria-label="Next slide"
                  >
                    ›
                  </button>

                  <div className={s.dots}>
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={clsx(s.dot, idx === activeIndex && s.dotActive)}
                        onClick={() => setActiveIndex(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className={s.noImage}>No image</div>
          )}
        </div>
      </div>

      <div className={s.right}>
        <div className={s.profileRow}>
          <div className={s.avatar} aria-hidden />
          <div className={s.userName}>{user.userName}</div>
        </div>

        <div className={s.fieldLabel}>Add publication descriptions</div>

        <div className={s.textAreaWrap}>
          <TextArea
            value={description}
            onChange={onChange}
            placeholder="Text-area"
            rows={5}
            disabled={isSubmitting}
            error={error ?? undefined}
          />
          <div className={s.counter}>{counter}</div>
        </div>

        {error === "No images to publish." && (
          <div className={s.hintError}>No images to publish.</div>
        )}
      </div>
    </div>
  );
}
