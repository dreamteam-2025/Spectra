// "use client";

// import type React from "react";
// import { ChangeEvent, useEffect, useMemo, useState } from "react";
// import s from "./PublishStep.module.scss";
// import { TextArea } from "@/shared/ui/TextArea/TextArea";
// import { useCreatePostMutation, useUploadPostImagesMutation } from "@/features/post/api/postApi";
// import type { CropPayload } from "../croppingStep/CroppingStep";

// type Props = {
//   previewUrl: string; // objectURL кропнутого blob (может быть уже revoke-нут ранее)
//   cropped: CropPayload;
//   submitRef: React.MutableRefObject<null | (() => void)>;
//   onPublished: () => void;
// };

// const MAX_DESC = 500;

// export function PublishStep({ previewUrl, cropped, submitRef, onPublished }: Props) {
//   const [description, setDescription] = useState("");
//   const [uiError, setUiError] = useState<string | null>(null);

//   const [uploadImages, { isLoading: uploading }] = useUploadPostImagesMutation();
//   const [createPost, { isLoading: creating }] = useCreatePostMutation();

//   const isLoading = uploading || creating;

//   const counter = useMemo(() => `${description.length}/${MAX_DESC}`, [description.length]);

//   // ✅ Главное: создаём objectURL здесь, из cropped.blob.
//   // Тогда URL живёт ровно столько, сколько живёт PublishStep.
//   const localPreviewUrl = useMemo(() => {
//     return URL.createObjectURL(cropped.blob);
//   }, [cropped.blob]);

//   // ✅ И корректно освобождаем, когда компонент размонтируется или blob сменится
//   useEffect(() => {
//     return () => {
//       URL.revokeObjectURL(localPreviewUrl);
//     };
//   }, [localPreviewUrl]);

//   const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
//     const value = e.target.value;
//     if (value.length > MAX_DESC) return;
//     setDescription(value);
//     setUiError(null);
//   };

//   const onPublish = async () => {
//     if (isLoading) return;

//     try {
//       setUiError(null);

//       // 1) blob -> File
//       const file = new File([cropped.blob], "post.jpg", { type: "image/jpeg" });

//       // 2) upload
//       const uploadRes = await uploadImages([file]).unwrap();
//       const uploadIds = uploadRes.images.map(i => i.uploadId);

//       // 3) create
//       await createPost({
//         description: description.trim() || "",
//         childrenMetadata: uploadIds.map(uploadId => ({ uploadId })),
//       }).unwrap();

//       onPublished();
//     } catch (e: any) {
//       const status = e?.status;
//       const data = e?.data;
//       console.error("Publish failed:", status, data ? JSON.stringify(data) : "");
//       setUiError("Something went wrong. Please try again.");
//     }
//   };

//   useEffect(() => {
//     submitRef.current = onPublish;
//     return () => {
//       submitRef.current = null;
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [description, cropped, isLoading]);

//   return (
//     <div className={s.root}>
//       {/* LEFT: фото */}
//       <div className={s.left}>
//         <div className={s.imageWrap}>
//           {/* Можешь оставить для отладки, но можно и удалить */}
//           <div style={{ color: "white", fontSize: 12, marginBottom: 8 }}>
//             prop previewUrl: {previewUrl}
//             <br />
//             local previewUrl: {localPreviewUrl}
//           </div>

//           {/* ✅ используем локальный URL, гарантированно живой */}
//           <img className={s.image} src={localPreviewUrl} alt="Publication preview" />
//         </div>
//       </div>

//       {/* RIGHT: профиль + textarea */}
//       <div className={s.right}>
//         <div className={s.profileRow}>
//           <div className={s.avatar} aria-hidden />
//           <div className={s.userName}>URLProfile</div>
//         </div>

//         <div className={s.fieldLabel}>Add publication descriptions</div>

//         <div className={s.textAreaWrap}>
//           <TextArea
//             value={description}
//             onChange={onChange}
//             placeholder="Text-area"
//             rows={5}
//             disabled={isLoading}
//             error={uiError ?? undefined}
//           />
//           <div className={s.counter}>{counter}</div>
//         </div>
//       </div>
//     </div>
//   );
// }












// "use client";

// import type React from "react";
// import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";

// import s from "./PublishStep.module.scss";
// import { TextArea } from "@/shared/ui/TextArea/TextArea";
// import { useCreatePostMutation, useUploadPostImagesMutation } from "@/features/post/api/postApi";
// import type { CropPayload } from "../croppingStep/CroppingStep";
// // если есть хук me — подключи, иначе убери
// // import { useMeQuery } from "@/features/auth";

// type Props = {
//   // можно оставить, но мы его НЕ используем (он может быть revoke-нут)
//   previewUrl: string;
//   cropped: CropPayload;

//   submitRef: React.MutableRefObject<null | (() => void)>;
//   onPublished: () => void;
// };

// const MAX_DESC = 500;

// export function PublishStep({ cropped, submitRef, onPublished }: Props) {
//   const [description, setDescription] = useState("");
//   const [uiError, setUiError] = useState<string | null>(null);

//   const [uploadImages, { isLoading: uploading }] = useUploadPostImagesMutation();
//   const [createPost, { isLoading: creating }] = useCreatePostMutation();

//   const isLoading = uploading || creating;

//   // const { data: me } = useMeQuery?.() ?? { data: null as any };

//   const counter = useMemo(() => `${description.length}/${MAX_DESC}`, [description.length]);

//   // ✅ Всегда создаём живой preview тут из blob.
//   const localPreviewUrl = useMemo(() => URL.createObjectURL(cropped.blob), [cropped.blob]);

//   useEffect(() => {
//     return () => {
//       URL.revokeObjectURL(localPreviewUrl);
//     };
//   }, [localPreviewUrl]);

//   const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
//     const value = e.target.value;
//     if (value.length > MAX_DESC) return;

//     setDescription(value);
//     setUiError(null);
//   };

//   const onPublish = useCallback(async () => {
//     if (isLoading) return;

//     try {
//       setUiError(null);

//       // 1) blob -> File (с корректным mime)
//       const mime = cropped.blob.type || "image/jpeg";
//       const ext = mime === "image/png" ? "png" : "jpg";
//       const file = new File([cropped.blob], `post.${ext}`, { type: mime });

//       // 2) upload (получаем images[].uploadId)
//       const uploadRes = await uploadImages([file]).unwrap();
//       const uploadIds = uploadRes.images.map((img) => img.uploadId);

//       // 3) create post (childrenMetadata обязательный)
//       const trimmed = description.trim();
//       await createPost({
//         description: trimmed.length ? trimmed : undefined, // ✅ optional
//         childrenMetadata: uploadIds.map((uploadId) => ({ uploadId })),
//       }).unwrap();

//       onPublished();
//     } catch (e: any) {
//       // RTKQ обычно кидает {status, data}
//       console.error("Publish failed:", e?.status, e?.data);
//       setUiError("Something went wrong. Please try again.");
//     }
//   }, [createPost, cropped.blob, description, isLoading, uploadImages, onPublished]);

//   // ✅ Publish кнопка в хедере дергает submitRef.current()
//   useEffect(() => {
//     submitRef.current = onPublish;
//     return () => {
//       submitRef.current = null;
//     };
//   }, [onPublish, submitRef]);

//   return (
//     <div className={s.root}>
//       {/* LEFT */}
//       <div className={s.left}>
//         <div className={s.imageWrap}>
//           <img className={s.image} src={localPreviewUrl} alt="Publication preview" />
//         </div>
//       </div>

//       {/* RIGHT */}
//       <div className={s.right}>
//         <div className={s.profileRow}>
//           <div className={s.avatar} aria-hidden />
//           <div className={s.userName}>
//             {/* {me?.userName ?? me?.email ?? "User"} */}
//             URLProfile
//           </div>
//         </div>

//         <div className={s.fieldLabel}>Add publication descriptions</div>

//         <div className={s.textAreaWrap}>
//           <TextArea
//             value={description}
//             onChange={onChange}
//             placeholder="Text-area"
//             rows={5}
//             disabled={isLoading}
//             error={uiError ?? undefined}
//           />
//           <div className={s.counter}>{counter}</div>
//         </div>

//         {/* если хочешь показать статус */}
//         {isLoading && <div className={s.loading}>Publishing...</div>}
//       </div>
//     </div>
//   );
// }
















// "use client";

// import type React from "react";
// import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";

// import s from "./PublishStep.module.scss";
// import { TextArea } from "@/shared/ui/TextArea/TextArea";
// import { useCreatePostMutation, useUploadPostImagesMutation } from "@/features/post/api/postApi";
// import type { CropPayload } from "../croppingStep/CroppingStep";

// type Props = {
//   previewUrl: string; // можно оставить, но не используем
//   cropped: CropPayload;
//   submitRef: React.MutableRefObject<null | (() => void)>;
//   onPublished: () => void;
// };

// const MAX_DESC = 500;

// export function PublishStep({ cropped, submitRef, onPublished }: Props) {
//   const [description, setDescription] = useState("");
//   const [uiError, setUiError] = useState<string | null>(null);

//   const [uploadImages, { isLoading: uploading }] = useUploadPostImagesMutation();
//   const [createPost, { isLoading: creating }] = useCreatePostMutation();

//   const isLoading = uploading || creating;

//   const counter = useMemo(() => `${description.length}/${MAX_DESC}`, [description.length]);

//   const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
//     const value = e.target.value;
//     if (value.length > MAX_DESC) return;

//     setDescription(value);
//     setUiError(null);
//   };

//   const onPublish = useCallback(async () => {
//     if (isLoading) return;

//     try {
//       setUiError(null);

//       // ✅ используем blob для upload
//       const blob = cropped.blob;
//       const mime = blob?.type || "image/jpeg";
//       const ext = mime === "image/png" ? "png" : "jpg";
//       const file = new File([blob], `post.${ext}`, { type: mime });

//       const uploadRes = await uploadImages([file]).unwrap();
//       const uploadIds = uploadRes.images.map((img) => img.uploadId);

//       const trimmed = description.trim();

//       await createPost({
//         description: trimmed.length ? trimmed : undefined,
//         childrenMetadata: uploadIds.map((uploadId) => ({ uploadId })),
//       }).unwrap();

//       onPublished();
//     } catch (e: any) {
//       console.error("Publish failed:", e?.status, e?.data);
//       setUiError("Something went wrong. Please try again.");
//     }
//   }, [createPost, cropped.blob, description, isLoading, uploadImages, onPublished]);

//   useEffect(() => {
//     submitRef.current = onPublish;
//     return () => {
//       submitRef.current = null;
//     };
//   }, [onPublish, submitRef]);

//   return (
//     <div className={s.root}>
//       {/* LEFT */}
//       <div className={s.left}>
//         <div className={s.imageWrap}>
//           {/* ✅ показываем тот previewUrl, который уже готов после кропа */}
//           <img className={s.image} src={cropped.previewUrl} alt="Publication preview" />
//         </div>
//       </div>

//       {/* RIGHT */}
//       <div className={s.right}>
//         <div className={s.profileRow}>
//           <div className={s.avatar} aria-hidden />
//           <div className={s.userName}>URLProfile</div>
//         </div>

//         <div className={s.fieldLabel}>Add publication descriptions</div>

//         <div className={s.textAreaWrap}>
//           <TextArea
//             value={description}
//             onChange={onChange}
//             placeholder="Text-area"
//             rows={5}
//             disabled={isLoading}
//             error={uiError ?? undefined}
//           />
//           <div className={s.counter}>{counter}</div>
//         </div>

//         {isLoading && <div className={s.loading}>Publishing...</div>}
//       </div>
//     </div>
//   );
// }












"use client";

import type React from "react";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";

import s from "./PublishStep.module.scss";
import { TextArea } from "@/shared/ui/TextArea/TextArea";
import { useCreatePostMutation, useUploadPostImagesMutation } from "@/features/post/api/postApi";
import type { CropPayload } from "../croppingStep/CroppingStep";

type Props = {
  previewUrl: string; // можно оставить для дебага
  cropped: CropPayload;
  submitRef: React.MutableRefObject<null | (() => void)>;
  onPublished: () => void;
};

const MAX_DESC = 500;

function isPromise<T = unknown>(v: unknown): v is Promise<T> {
  return typeof v === "object" && v !== null && "then" in (v as any) && typeof (v as any).then === "function";
}

export function PublishStep({ previewUrl, cropped, submitRef, onPublished }: Props) {
  const [description, setDescription] = useState("");
  const [uiError, setUiError] = useState<string | null>(null);

  const [uploadImages, { isLoading: uploading }] = useUploadPostImagesMutation();
  const [createPost, { isLoading: creating }] = useCreatePostMutation();

  const isLoading = uploading || creating;

  const counter = useMemo(() => `${description.length}/${MAX_DESC}`, [description.length]);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > MAX_DESC) return;
    setDescription(value);
    setUiError(null);
  };

  const onPublish = useCallback(async () => {
    if (isLoading) return;

    try {
      setUiError(null);

      // ✅ 1) гарантированно получаем реальный Blob
      const raw = (cropped as any).blob;
      const blob: Blob = isPromise<Blob>(raw) ? await raw : raw;

      if (!(blob instanceof Blob)) {
        throw new Error("Cropped blob is not a Blob");
      }

      // ✅ 2) blob -> File (mime корректный)
      const mime = blob.type || "image/jpeg";
      const ext = mime === "image/png" ? "png" : "jpg";
      const file = new File([blob], `post.${ext}`, { type: mime });

      // ✅ 3) upload
      const uploadRes = await uploadImages([file]).unwrap();
      const uploadIds = uploadRes.images.map((i) => i.uploadId);

      // ✅ 4) create
      const trimmed = description.trim();
      await createPost({
        description: trimmed.length ? trimmed : undefined,
        childrenMetadata: uploadIds.map((uploadId) => ({ uploadId })),
      }).unwrap();

      onPublished();
    } catch (e: any) {
      console.error("Publish failed:", e?.status, e?.data ?? e);
      setUiError("Something went wrong. Please try again.");
    }
  }, [createPost, cropped, description, isLoading, onPublished, uploadImages]);

  useEffect(() => {
    submitRef.current = onPublish;
    return () => {
      submitRef.current = null;
    };
  }, [onPublish, submitRef]);

  console.log("cropped.previewUrl =", cropped.previewUrl);
console.log("typeof cropped.blob =", typeof (cropped as any).blob, "isBlob =", (cropped as any).blob instanceof Blob);
console.log("blob value =", (cropped as any).blob);


  return (
    <div className={s.root}>
      {/* LEFT */}
      <div className={s.left}>
        <div className={s.imageWrap}>
          {/* ✅ Картинку показываем из cropped.previewUrl (самый стабильный вариант) */}
          <img className={s.image} src={cropped.previewUrl} alt="Publication preview" />
          
<div style={{ color: "white", fontSize: 12, marginBottom: 8 }}>
  src: {String(cropped.previewUrl)}
</div>

          {/* дебаг при необходимости */}
          {/* <div style={{ color: "white", fontSize: 12, marginTop: 8 }}>
            prop previewUrl: {previewUrl}
            <br />
            cropped.previewUrl: {cropped.previewUrl}
          </div> */}
        </div>
      </div>

      {/* RIGHT */}
      <div className={s.right}>
        <div className={s.profileRow}>
          <div className={s.avatar} aria-hidden />
          <div className={s.userName}>URLProfile</div>
        </div>

        <div className={s.fieldLabel}>Add publication descriptions</div>

        <div className={s.textAreaWrap}>
          <TextArea
            value={description}
            onChange={onChange}
            placeholder="Text-area"
            rows={5}
            disabled={isLoading}
            error={uiError ?? undefined}
          />
          <div className={s.counter}>{counter}</div>
        </div>
      </div>
    </div>
  );
}
