import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
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

type Props = {
  previewUrl: string;
  onBack: () => void;
  onNext: (payload: CropPayload) => void;
  submitRef: React.MutableRefObject<null | (() => void)>;
};

export function CroppingStep({ previewUrl, onBack, onNext, submitRef }: Props) {
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

      if (lastGeneratedPreviewRef.current) {
        URL.revokeObjectURL(lastGeneratedPreviewRef.current);
      }
      lastGeneratedPreviewRef.current = nextPreviewUrl;

      onNext({ blob, previewUrl: nextPreviewUrl, aspect });
    } catch (e) {
      console.error("Cropping failed:", e);
    } finally {
      setLoading(false);
    }
  }, [aspect, croppedAreaPixels, loading, onNext, previewUrl]);


  useEffect(() => {
    submitRef.current = handleNext;
    return () => {
      submitRef.current = null;
    };
  }, [handleNext, submitRef]);

  return (
    <div className={s.root}>
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
    </div>
  );
}
