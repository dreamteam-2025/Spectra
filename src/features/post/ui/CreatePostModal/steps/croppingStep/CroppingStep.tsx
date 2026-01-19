// import s from "./CroppingStep.module.scss";
// import { Button } from "@/shared";

// type Props = {
//   previewUrl: string;
//   onBack: () => void;
//   onNext: () => void;
// };

// export function CroppingStep({ previewUrl, onBack, onNext }: Props) {
//   return (
//     <div className={s.root}>
//       <div className={s.stage}>
//         <img className={s.image} src={previewUrl} alt="Selected" />
//       </div>

//       <div className={s.toolbar}>
//         <button className={s.toolBtn} type="button" aria-label="ratio">
//           ⬚
//         </button>
//         <button className={s.toolBtn} type="button" aria-label="zoom">
//           🔍
//         </button>

//         <div className={s.spacer} />

//         <Button variant="secondary" type="button" onClick={onBack}>
//           Back
//         </Button>
//         <Button variant="primary" type="button" onClick={onNext}>
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }







// import { useCallback, useMemo, useState } from "react";
// import Cropper, { Area } from "react-easy-crop";
// import s from "./CroppingStep.module.scss";
// import { Button } from "@/shared";
// import { getCroppedBlob } from "@/features/post/model/cropImage";

// type Props = {
//   previewUrl: string;
//   onBack: () => void;

//   /** ✅ на следующий шаг отдаём уже кропнутую картинку */
//   onNext: (data: { blob: Blob; previewUrl: string; aspect: number }) => void;
// };

// type Ratio = "1:1" | "4:5" | "16:9";

// const ratioToAspect: Record<Ratio, number> = {
//   "1:1": 1 / 1,
//   "4:5": 4 / 5,
//   "16:9": 16 / 9,
// };

// export function CroppingStep({ previewUrl, onBack, onNext }: Props) {
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [ratio, setRatio] = useState<Ratio>("1:1");
//   const aspect = useMemo(() => ratioToAspect[ratio], [ratio]);

//   const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
//   const [loading, setLoading] = useState(false);

//   const onCropComplete = useCallback((_area: Area, areaPixels: Area) => {
//     setCroppedAreaPixels(areaPixels);
//   }, []);

//   const handleNext = async () => {
//     if (!croppedAreaPixels) return;
//     setLoading(true);
//     try {
//       const blob = await getCroppedBlob(previewUrl, croppedAreaPixels);
//       const nextPreview = URL.createObjectURL(blob);
//       onNext({ blob, previewUrl: nextPreview, aspect });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={s.root}>
//       <div className={s.stage}>
//         <Cropper
//           image={previewUrl}
//           crop={crop}
//           zoom={zoom}
//           aspect={aspect}
//           onCropChange={setCrop}
//           onZoomChange={setZoom}
//           onCropComplete={onCropComplete}
//           restrictPosition={true}
//           objectFit="contain"
//         />
//       </div>

//       <div className={s.toolbar}>
//         <div className={s.left}>
//           <button
//             className={s.toolBtn}
//             type="button"
//             onClick={() => setRatio("1:1")}
//             aria-pressed={ratio === "1:1"}
//           >
//             1:1
//           </button>
//           <button
//             className={s.toolBtn}
//             type="button"
//             onClick={() => setRatio("4:5")}
//             aria-pressed={ratio === "4:5"}
//           >
//             4:5
//           </button>
//           <button
//             className={s.toolBtn}
//             type="button"
//             onClick={() => setRatio("16:9")}
//             aria-pressed={ratio === "16:9"}
//           >
//             16:9
//           </button>
//         </div>

//         <input
//           className={s.zoom}
//           type="range"
//           min={1}
//           max={3}
//           step={0.01}
//           value={zoom}
//           onChange={e => setZoom(Number(e.target.value))}
//           aria-label="zoom"
//         />

//         <div className={s.spacer} />

//         <Button variant="secondary" type="button" onClick={onBack}>
//           Back
//         </Button>
//         <Button variant="primary" type="button" onClick={handleNext} disabled={loading}>
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }










































// import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import Cropper, { Area } from "react-easy-crop";
// import { Button } from "@/shared";
// import s from "./CroppingStep.module.scss";
// import { getCroppedBlob } from "@/features/post/model/cropImage";

// type Props = {
//   previewUrl: string;
//   onBack: () => void;

//   /**
//    * На следующем шаге тебе пригодятся:
//    * - blob (для загрузки на сервер)
//    * - previewUrl (для превью уже после кропа)
//    * - aspect (для состояния шага/восстановления)
//    */
//   onNext: (payload: { blob: Blob; previewUrl: string; aspect: number }) => void;
// };

// type Ratio = "1:1" | "4:5" | "16:9";

// const ratioToAspect: Record<Ratio, number> = {
//   "1:1": 1 / 1,
//   "4:5": 4 / 5,
//   "16:9": 16 / 9,
// };

// export function CroppingStep({ previewUrl, onBack, onNext }: Props) {
//   const [ratio, setRatio] = useState<Ratio>("1:1");
//   const aspect = useMemo(() => ratioToAspect[ratio], [ratio]);

//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);

//   const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
//   const [loading, setLoading] = useState(false);

//   // чтобы не плодить objectURL при каждом Next
//   const lastGeneratedPreviewRef = useRef<string | null>(null);

//   useEffect(() => {
//     return () => {
//       // cleanup objectURL, который мы создали в этом компоненте (после Next)
//       if (lastGeneratedPreviewRef.current) {
//         URL.revokeObjectURL(lastGeneratedPreviewRef.current);
//         lastGeneratedPreviewRef.current = null;
//       }
//     };
//   }, []);

//   const onCropComplete = useCallback((_area: Area, areaPixels: Area) => {
//     setCroppedAreaPixels(areaPixels);
//   }, []);

//   const handleNext = useCallback(async () => {
//     if (!croppedAreaPixels || loading) return;

//     setLoading(true);
//     try {
//       const blob = await getCroppedBlob(previewUrl, croppedAreaPixels);

//       const nextPreviewUrl = URL.createObjectURL(blob);

//       // если ранее уже генерировали — чистим
//       if (lastGeneratedPreviewRef.current) {
//         URL.revokeObjectURL(lastGeneratedPreviewRef.current);
//       }
//       lastGeneratedPreviewRef.current = nextPreviewUrl;

//       onNext({ blob, previewUrl: nextPreviewUrl, aspect });
//     } catch (e) {
//       // Можно заменить на твой toast/notification если есть
//       console.error("Cropping failed:", e);
//     } finally {
//       setLoading(false);
//     }
//   }, [aspect, croppedAreaPixels, loading, onNext, previewUrl]);

//   return (
//     <div className={s.root}>
//       <div className={s.stage}>
//         <Cropper
//           image={previewUrl}
//           crop={crop}
//           zoom={zoom}
//           aspect={aspect}
//           onCropChange={setCrop}
//           onZoomChange={setZoom}
//           onCropComplete={onCropComplete}
//           restrictPosition
//           objectFit="contain"
//         />
//       </div>

//       <div className={s.toolbar}>
//         <div className={s.left}>
//           <button
//             className={s.toolBtn}
//             type="button"
//             onClick={() => setRatio("1:1")}
//             aria-pressed={ratio === "1:1"}
//           >
//             1:1
//           </button>
//           <button
//             className={s.toolBtn}
//             type="button"
//             onClick={() => setRatio("4:5")}
//             aria-pressed={ratio === "4:5"}
//           >
//             4:5
//           </button>
//           <button
//             className={s.toolBtn}
//             type="button"
//             onClick={() => setRatio("16:9")}
//             aria-pressed={ratio === "16:9"}
//           >
//             16:9
//           </button>
//         </div>

//         <input
//           className={s.zoom}
//           type="range"
//           min={1}
//           max={3}
//           step={0.01}
//           value={zoom}
//           onChange={e => setZoom(Number(e.target.value))}
//           aria-label="zoom"
//         />

//         <div className={s.spacer} />

//         <Button variant="secondary" type="button" onClick={onBack} disabled={loading}>
//           Back
//         </Button>
//         <Button variant="primary" type="button" onClick={handleNext} disabled={loading || !croppedAreaPixels}>
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }












// import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import Cropper, { Area } from "react-easy-crop";
// import s from "./CroppingStep.module.scss";
// import { getCroppedBlob } from "@/features/post/model/cropImage";

// type Props = {
//   previewUrl: string;
//   onBack: () => void;
//   onNext: (payload: { blob: Blob; previewUrl: string; aspect: number }) => void;
// };

// type Ratio = "1:1" | "4:5" | "16:9";

// const ratioToAspect: Record<Ratio, number> = {
//   "1:1": 1,
//   "4:5": 4 / 5,
//   "16:9": 16 / 9,
// };

// export function CroppingStep({ previewUrl, onBack, onNext }: Props) {
//   const [ratio, setRatio] = useState<Ratio>("1:1");
//   const aspect = useMemo(() => ratioToAspect[ratio], [ratio]);

//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);

//   const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
//   const [loading, setLoading] = useState(false);

//   const lastGeneratedPreviewRef = useRef<string | null>(null);

//   useEffect(() => {
//     return () => {
//       if (lastGeneratedPreviewRef.current) {
//         URL.revokeObjectURL(lastGeneratedPreviewRef.current);
//         lastGeneratedPreviewRef.current = null;
//       }
//     };
//   }, []);

//   const onCropComplete = useCallback((_a: Area, areaPixels: Area) => {
//     setCroppedAreaPixels(areaPixels);
//   }, []);

//   const handleNext = useCallback(async () => {
//     if (!croppedAreaPixels || loading) return;

//     setLoading(true);
//     try {
//       const blob = await getCroppedBlob(previewUrl, croppedAreaPixels);
//       const nextPreviewUrl = URL.createObjectURL(blob);

//       if (lastGeneratedPreviewRef.current) URL.revokeObjectURL(lastGeneratedPreviewRef.current);
//       lastGeneratedPreviewRef.current = nextPreviewUrl;

//       onNext({ blob, previewUrl: nextPreviewUrl, aspect });
//     } catch (e) {
//       console.error("Cropping failed:", e);
//     } finally {
//       setLoading(false);
//     }
//   }, [aspect, croppedAreaPixels, loading, onNext, previewUrl]);

//   return (
//     <div className={s.root}>
//       <div className={s.stage}>
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
//       </div>

//       <div className={s.toolbar}>
//         <div className={s.left}>
//           <button className={s.toolBtn} type="button" onClick={() => setRatio("1:1")} aria-pressed={ratio === "1:1"}>
//             1:1
//           </button>
//           <button className={s.toolBtn} type="button" onClick={() => setRatio("4:5")} aria-pressed={ratio === "4:5"}>
//             4:5
//           </button>
//           <button
//             className={s.toolBtn}
//             type="button"
//             onClick={() => setRatio("16:9")}
//             aria-pressed={ratio === "16:9"}
//           >
//             16:9
//           </button>
//         </div>

//         <input
//           className={s.zoom}
//           type="range"
//           min={1}
//           max={3}
//           step={0.01}
//           value={zoom}
//           onChange={e => setZoom(Number(e.target.value))}
//           aria-label="zoom"
//         />

//         <div className={s.spacer} />

//         {/* если хочешь Back внизу оставить — раскомментируй */}
//         {/* <button className={s.backBtn} type="button" onClick={onBack} disabled={loading}>Back</button> */}
//       </div>

//       {/* ✅ кнопка для “Next” из шапки */}
//       <button id="crop-next" type="button" onClick={handleNext} disabled={loading || !croppedAreaPixels} style={{ display: "none" }} />

//       {/* ✅ (опционально) возможность “Esc/backspace” для возврата */}
//       <button id="crop-back" type="button" onClick={onBack} style={{ display: "none" }} />
//     </div>
//   );
// }











// import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import Cropper, { Area } from "react-easy-crop";
// import s from "./CroppingStep.module.scss";
// import { getCroppedBlob } from "@/features/post/model/cropImage";

// type Props = {
//   previewUrl: string;
//   onBack: () => void;
//   onNext: (payload: { blob: Blob; previewUrl: string; aspect: number }) => void;
// };

// type Ratio = "1:1" | "4:5" | "16:9";

// const ratioToAspect: Record<Ratio, number> = {
//   "1:1": 1,
//   "4:5": 4 / 5,
//   "16:9": 16 / 9,
// };

// export function CroppingStep({ previewUrl, onBack, onNext }: Props) {
//   const [ratio, setRatio] = useState<Ratio>("1:1");
//   const aspect = useMemo(() => ratioToAspect[ratio], [ratio]);

//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);

//   const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
//   const [loading, setLoading] = useState(false);

//   const lastGeneratedPreviewRef = useRef<string | null>(null);

//   useEffect(() => {
//     return () => {
//       if (lastGeneratedPreviewRef.current) {
//         URL.revokeObjectURL(lastGeneratedPreviewRef.current);
//         lastGeneratedPreviewRef.current = null;
//       }
//     };
//   }, []);

//   const onCropComplete = useCallback((_a: Area, areaPixels: Area) => {
//     setCroppedAreaPixels(areaPixels);
//   }, []);

//   const handleNext = useCallback(async () => {
//     if (!croppedAreaPixels || loading) return;

//     setLoading(true);
//     try {
//       const blob = await getCroppedBlob(previewUrl, croppedAreaPixels);
//       const nextPreviewUrl = URL.createObjectURL(blob);

//       if (lastGeneratedPreviewRef.current) URL.revokeObjectURL(lastGeneratedPreviewRef.current);
//       lastGeneratedPreviewRef.current = nextPreviewUrl;

//       onNext({ blob, previewUrl: nextPreviewUrl, aspect });
//     } catch (e) {
//       console.error("Cropping failed:", e);
//     } finally {
//       setLoading(false);
//     }
//   }, [aspect, croppedAreaPixels, loading, onNext, previewUrl]);

//   return (
//     <div className={s.root}>
//       <div className={s.stage}>
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
//       </div>

//       <div className={s.toolbar}>
//         <div className={s.left}>
//           <button className={s.toolBtn} type="button" onClick={() => setRatio("1:1")} aria-pressed={ratio === "1:1"}>
//             1:1
//           </button>
//           <button className={s.toolBtn} type="button" onClick={() => setRatio("4:5")} aria-pressed={ratio === "4:5"}>
//             4:5
//           </button>
//           <button
//             className={s.toolBtn}
//             type="button"
//             onClick={() => setRatio("16:9")}
//             aria-pressed={ratio === "16:9"}
//           >
//             16:9
//           </button>
//         </div>

//         <input
//           className={s.zoom}
//           type="range"
//           min={1}
//           max={3}
//           step={0.01}
//           value={zoom}
//           onChange={e => setZoom(Number(e.target.value))}
//           aria-label="zoom"
//         />

//         <div className={s.spacer} />
//       </div>

//       {/* Next из шапки кликает сюда */}
//       <button
//         id="crop-next"
//         type="button"
//         onClick={handleNext}
//         disabled={loading || !croppedAreaPixels}
//         style={{ display: "none" }}
//       />

//       {/* на всякий случай: если захочешь back через hotkey */}
//       <button id="crop-back" type="button" onClick={onBack} style={{ display: "none" }} />
//     </div>
//   );
// }















import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import s from "./CroppingStep.module.scss";
import { getCroppedBlob } from "@/features/post/model/cropImage";

type Props = {
  previewUrl: string;
  onBack: () => void;
  onNext: (payload: { blob: Blob; previewUrl: string; aspect: number }) => void;
};

type Ratio = "1:1" | "4:5" | "16:9";

const ratioToAspect: Record<Ratio, number> = {
  "1:1": 1,
  "4:5": 4 / 5,
  "16:9": 16 / 9,
};

export function CroppingStep({ previewUrl, onBack, onNext }: Props) {
  const [ratio, setRatio] = useState<Ratio>("1:1");
  const aspect = useMemo(() => ratioToAspect[ratio], [ratio]);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [loading, setLoading] = useState(false);

  const lastGeneratedPreviewRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (lastGeneratedPreviewRef.current) {
        URL.revokeObjectURL(lastGeneratedPreviewRef.current);
        lastGeneratedPreviewRef.current = null;
      }
    };
  }, []);

  const onCropComplete = useCallback((_a: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const handleNext = useCallback(async () => {
    if (!croppedAreaPixels || loading) return;

    setLoading(true);
    try {
      const blob = await getCroppedBlob(previewUrl, croppedAreaPixels);
      const nextPreviewUrl = URL.createObjectURL(blob);

      if (lastGeneratedPreviewRef.current) URL.revokeObjectURL(lastGeneratedPreviewRef.current);
      lastGeneratedPreviewRef.current = nextPreviewUrl;

      onNext({ blob, previewUrl: nextPreviewUrl, aspect });
    } catch (e) {
      console.error("Cropping failed:", e);
    } finally {
      setLoading(false);
    }
  }, [aspect, croppedAreaPixels, loading, onNext, previewUrl]);

  return (
    <div className={s.root}>
      {/* ✅ canvas на всю высоту под шапкой */}
      <div className={s.canvas}>
        <Cropper
          image={previewUrl}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          restrictPosition
          objectFit="cover"
        />

        {/* ✅ controls поверх картинки (как в макете) */}
        <div className={s.controls}>
          <div className={s.ratios}>
            <button className={s.ratioBtn} type="button" onClick={() => setRatio("1:1")} aria-pressed={ratio === "1:1"}>
              1:1
            </button>
            <button className={s.ratioBtn} type="button" onClick={() => setRatio("4:5")} aria-pressed={ratio === "4:5"}>
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

          <input
            className={s.zoom}
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={e => setZoom(Number(e.target.value))}
            aria-label="zoom"
          />
        </div>
      </div>

      {/* Next из шапки кликает сюда */}
      <button
        id="crop-next"
        type="button"
        onClick={handleNext}
        disabled={loading || !croppedAreaPixels}
        style={{ display: "none" }}
      />

      {/* если вдруг захочешь горячую клавишу назад */}
      <button id="crop-back" type="button" onClick={onBack} style={{ display: "none" }} />
    </div>
  );
}



