// import { ChangeEvent } from "react";
// import s from "./SelectPhotoStep.module.scss";
// import { Button } from "@/shared";

// type Props = {
//   onSelected: (file: File) => void;
// };

// export function SelectPhotoStep({ onSelected }: Props) {
//   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files ?? []);
//     if (!files.length) return;

//     onSelected(files[0]);
//     e.target.value = "";
//   };

//   return (
//     <div className={s.root}>
//       <div className={s.placeholder} aria-hidden>
//         <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
//           <path
//             d="M19 5H5C3.9 5 3 5.9 3 7V17C3 18.1 3.9 19 5 19H19C20.1 19 21 18.1 21 17V7C21 5.9 20.1 5 19 5Z"
//             stroke="currentColor"
//             strokeWidth="1.5"
//           />
//           <path
//             d="M8.5 10.5C9.32843 10.5 10 9.82843 10 9C10 8.17157 9.32843 7.5 8.5 7.5C7.67157 7.5 7 8.17157 7 9C7 9.82843 7.67157 10.5 8.5 10.5Z"
//             stroke="currentColor"
//             strokeWidth="1.5"
//           />
//           <path d="M21 15L16.5 10.5L5 22" stroke="currentColor" strokeWidth="1.5" />
//         </svg>
//       </div>

//       <div className={s.actions}>
//         <label className={s.selectBtn}>
//           <input className={s.fileInput} type="file" accept="image/jpeg,image/png" onChange={onChange} />
//           Select from Computer
//         </label>

//         <Button variant="outlined" className={s.openDraft} type="button">
//           Open Draft
//         </Button>
//       </div>
//     </div>
//   );
// }









// import { ChangeEvent, useState } from "react";
// import s from "./SelectPhotoStep.module.scss";
// import { Button } from "@/shared";

// type Props = {
//   onSelected: (file: File) => void;
// };

// const MAX_SIZE = 20 * 1024 * 1024;
// const ALLOWED = new Set(["image/jpeg", "image/png"]);

// export function SelectPhotoStep({ onSelected }: Props) {
//   const [error, setError] = useState<string | null>(null);

//   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const okType = ALLOWED.has(file.type);
//     const okSize = file.size <= MAX_SIZE;

//     if (!okType || !okSize) {
//       setError("The photo must be less than 20 Mb and have JPEG or PNG format");
//       e.target.value = "";
//       return;
//     }

//     setError(null);
//     onSelected(file);
//     e.target.value = "";
//   };

//   return (
//     <div className={s.root}>
//       <div className={s.placeholder} aria-hidden>…</div>

//       <div className={s.actions}>
//         <label className={s.selectBtn}>
//           <input
//             className={s.fileInput}
//             type="file"
//             accept="image/jpeg,image/png"
//             onChange={onChange}
//           />
//           Select from Computer
//         </label>

//         <Button variant="outlined" className={s.openDraft} type="button">
//           Open Draft
//         </Button>

//         {error && <div className={s.error}>{error}</div>}
//       </div>
//     </div>
//   );
// }













import { ChangeEvent, useState } from "react";
import s from "./SelectPhotoStep.module.scss";
import { Button } from "@/shared";
import Image from "next/image";

type Props = {
  onSelected: (file: File) => void;
};

const MAX_SIZE = 20 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png"]);

export function SelectPhotoStep({ onSelected }: Props) {
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const okType = ALLOWED.has(file.type);
    const okSize = file.size <= MAX_SIZE;

    if (!okType || !okSize) {
      setError("The photo must be less than 20 Mb and have JPEG or PNG format");
      e.target.value = "";
      return;
    }

    setError(null);
    onSelected(file);
    e.target.value = "";
  };

  return (
    <div className={s.root}>
      <div className={s.placeholder} aria-hidden>
        <Image src="/icons/image-outline.svg" alt="Image" width={48} height={48} />

      </div>

      <div className={s.actions}>
        <label className={s.selectBtn}>
          <input className={s.fileInput} type="file" accept="image/jpeg,image/png" onChange={onChange} />
          Select from Computer
        </label>

        <Button variant="outlined" className={s.openDraft} type="button">
          Open Draft
        </Button>

        {error && <div className={s.error}>{error}</div>}
      </div>
    </div>
  );
}
