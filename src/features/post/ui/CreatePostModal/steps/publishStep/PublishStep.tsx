// "use client";

// import Image from "next/image";
// import { ChangeEvent, useMemo, useState } from "react";
// import s from "./PublishStep.module.scss";
// import { Button } from "@/shared";
// import { TextArea } from "@/shared/ui/TextArea/TextArea";
// import { useCreatePostMutation, useUploadPostImagesMutation } from "@/features/post/api/postApi";
// import type { CropPayload } from "../croppingStep/CroppingStep";

// type Props = {
//   previewUrl: string; // кропнутый превью (objectURL)
//   cropped: CropPayload; // blob + previewUrl + aspect
//   onBack: () => void;
//   onPublished: () => void; // закрыть/сбросить наверху
// };

// const MAX_DESC = 500;

// export function PublishStep({ previewUrl, cropped, onBack, onPublished }: Props) {
//   const [description, setDescription] = useState("");
//   const [error, setError] = useState<string | null>(null);

//   const [uploadImages, { isLoading: uploading }] = useUploadPostImagesMutation();
//   const [createPost, { isLoading: creating }] = useCreatePostMutation();

//   const isLoading = uploading || creating;

//   const counter = useMemo(() => `${description.length}/${MAX_DESC}`, [description.length]);

//   const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
//     const value = e.target.value;
//     if (value.length > MAX_DESC) return;
//     setDescription(value);
//     setError(null);
//   };

//   const onPublish = async () => {
//     try {
//       setError(null);

//       // 1) blob -> File (бэку нужен file)
//       const file = new File([cropped.blob], "post.jpg", { type: "image/jpeg" });

//       // 2) upload
//       const uploadRes = await uploadImages([file]).unwrap();
//       const uploadIds = uploadRes.images.map(i => i.uploadId);

//       // 3) create post
//       await createPost({
//         description: description.trim() || "",
//         childrenMetadata: uploadIds.map(uploadId => ({ uploadId })),
//       }).unwrap();

//       onPublished();
//     } catch (e) {
//       console.error("Publish failed:", e);
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className={s.root}>
//       <div className={s.left}>
//         <div className={s.imageWrap}>
//           {/* один кадр (без фильтров и без локации по ТЗ) */}
//           <Image src={previewUrl} alt="Publication preview" fill className={s.image} />
//         </div>
//       </div>

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
//             error={error ?? undefined}
//           />
//           <div className={s.counter}>{counter}</div>
//         </div>

//         {/* location по ТЗ не делаем — специально пропущено */}
//         <div className={s.hint} aria-hidden>
//           {/* место под будущие поля */}
//         </div>
//       </div>

//       {/* Header actions управляются из CreatePostModal (кнопка Publish в хедере) */}
//       <div className={s.srOnly}>
//         <Button variant="ghost" type="button" onClick={onBack}>
//           Back
//         </Button>
//         <Button variant="ghost" type="button" onClick={onPublish} disabled={isLoading}>
//           Publish
//         </Button>
//       </div>

//       {/* экспортируем обработчик наружу через prop? — делаем проще:
//           CreatePostModal дергает onPublish через ref аналогично CroppingStep.
//           Но чтобы не усложнять — PublishStep НЕ требует ref: мы дернем onPublish через коллбек из CreatePostModal. */}
//     </div>
//   );
// }











// "use client";

// import Image from "next/image";
// import { ChangeEvent, useEffect, useMemo, useState } from "react";
// import s from "./PublishStep.module.scss";
// import { TextArea } from "@/shared/ui/TextArea/TextArea";
// import { useCreatePostMutation, useUploadPostImagesMutation } from "@/features/post/api/postApi";
// import type { CropPayload } from "../croppingStep/CroppingStep";

// type Props = {
//   previewUrl: string;
//   cropped: CropPayload;
//   onBack: () => void;
//   onPublished: () => void;
// };

// const MAX_DESC = 500;

// export function PublishStep({ previewUrl, cropped, onPublished }: Props) {
//   const [description, setDescription] = useState("");
//   const [error, setError] = useState<string | null>(null);

//   const [uploadImages, { isLoading: uploading }] = useUploadPostImagesMutation();
//   const [createPost, { isLoading: creating }] = useCreatePostMutation();

//   const isLoading = uploading || creating;

//   const counter = useMemo(() => `${description.length}/${MAX_DESC}`, [description.length]);

//   const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
//     const value = e.target.value;
//     if (value.length > MAX_DESC) return;
//     setDescription(value);
//     setError(null);
//   };

//   const onPublish = async () => {
//     try {
//       setError(null);

//       const file = new File([cropped.blob], "post.jpg", { type: "image/jpeg" });

//       const uploadRes = await uploadImages([file]).unwrap();
//       const uploadIds = uploadRes.images.map(i => i.uploadId);

//       await createPost({
//         description: description.trim() || "",
//         childrenMetadata: uploadIds.map(uploadId => ({ uploadId })),
//       }).unwrap();

//       onPublished();
//     } catch (e) {
//       console.error("Publish failed:", e);
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   useEffect(() => {
//     const handler = () => {
//       if (isLoading) return;
//       void onPublish();
//     };

//     window.addEventListener("incta_publish", handler as EventListener);
//     return () => window.removeEventListener("incta_publish", handler as EventListener);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isLoading, description, cropped]);

//   return (
//     <div className={s.root}>
//       <div className={s.left}>
//         <div className={s.imageWrap}>
//           <Image src={previewUrl} alt="Publication preview" fill className={s.image} />
//         </div>
//       </div>

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
//             error={error ?? undefined}
//           />
//           <div className={s.counter}>{counter}</div>
//         </div>
//       </div>
//     </div>
//   );
// }













// "use client";

// import { ChangeEvent, useEffect, useMemo, useState } from "react";
// import s from "./PublishStep.module.scss";
// import { TextArea } from "@/shared/ui/TextArea/TextArea";
// import { useCreatePostMutation, useUploadPostImagesMutation } from "@/features/post/api/postApi";
// import type { CropPayload } from "../croppingStep/CroppingStep";

// type Props = {
//   previewUrl: string; // objectURL кропнутого blob
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
//   const status = e?.status;
//   const data = e?.data;
//   console.error("Publish failed:", status, data ? JSON.stringify(data) : "");
// }
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


//             <div style={{ color: "white", fontSize: 12, marginBottom: 8 }}>
//   {previewUrl}
// </div>


//           <img className={s.image} src={previewUrl} alt="Publication preview" />
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

//         {/* location блок НЕ делаем по ТЗ */}
//       </div>
//     </div>
//   );
// }



















"use client";

import type React from "react";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import s from "./PublishStep.module.scss";
import { TextArea } from "@/shared/ui/TextArea/TextArea";
import { useCreatePostMutation, useUploadPostImagesMutation } from "@/features/post/api/postApi";
import type { CropPayload } from "../croppingStep/CroppingStep";

type Props = {
  previewUrl: string; // objectURL кропнутого blob (может быть уже revoke-нут ранее)
  cropped: CropPayload;
  submitRef: React.MutableRefObject<null | (() => void)>;
  onPublished: () => void;
};

const MAX_DESC = 500;

export function PublishStep({ previewUrl, cropped, submitRef, onPublished }: Props) {
  const [description, setDescription] = useState("");
  const [uiError, setUiError] = useState<string | null>(null);

  const [uploadImages, { isLoading: uploading }] = useUploadPostImagesMutation();
  const [createPost, { isLoading: creating }] = useCreatePostMutation();

  const isLoading = uploading || creating;

  const counter = useMemo(() => `${description.length}/${MAX_DESC}`, [description.length]);

  // ✅ Главное: создаём objectURL здесь, из cropped.blob.
  // Тогда URL живёт ровно столько, сколько живёт PublishStep.
  const localPreviewUrl = useMemo(() => {
    return URL.createObjectURL(cropped.blob);
  }, [cropped.blob]);

  // ✅ И корректно освобождаем, когда компонент размонтируется или blob сменится
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(localPreviewUrl);
    };
  }, [localPreviewUrl]);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > MAX_DESC) return;
    setDescription(value);
    setUiError(null);
  };

  const onPublish = async () => {
    if (isLoading) return;

    try {
      setUiError(null);

      // 1) blob -> File
      const file = new File([cropped.blob], "post.jpg", { type: "image/jpeg" });

      // 2) upload
      const uploadRes = await uploadImages([file]).unwrap();
      const uploadIds = uploadRes.images.map(i => i.uploadId);

      // 3) create
      await createPost({
        description: description.trim() || "",
        childrenMetadata: uploadIds.map(uploadId => ({ uploadId })),
      }).unwrap();

      onPublished();
    } catch (e: any) {
      const status = e?.status;
      const data = e?.data;
      console.error("Publish failed:", status, data ? JSON.stringify(data) : "");
      setUiError("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    submitRef.current = onPublish;
    return () => {
      submitRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description, cropped, isLoading]);

  return (
    <div className={s.root}>
      {/* LEFT: фото */}
      <div className={s.left}>
        <div className={s.imageWrap}>
          {/* Можешь оставить для отладки, но можно и удалить */}
          <div style={{ color: "white", fontSize: 12, marginBottom: 8 }}>
            prop previewUrl: {previewUrl}
            <br />
            local previewUrl: {localPreviewUrl}
          </div>

          {/* ✅ используем локальный URL, гарантированно живой */}
          <img className={s.image} src={localPreviewUrl} alt="Publication preview" />
        </div>
      </div>

      {/* RIGHT: профиль + textarea */}
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
