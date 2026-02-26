"use client";

import type React from "react";
import { useCallback, useEffect, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";

import s from "./AvatarCroppingStep.module.scss";
import { getCroppedBlob } from "@/features/post/model/cropImage";

type Props = {
  imageUrl: string;
  submitRef: React.RefObject<(() => Promise<Blob | null>) | null>;
  onDirty?: () => void; // уведомляем модалку, что кроп изменился
};

const CROP_SIZE = 316;

export function AvatarCroppingStep({ imageUrl, submitRef, onDirty }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  useEffect(() => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    onDirty?.();
  }, [imageUrl]);

  const onCropComplete = useCallback((_a: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!croppedAreaPixels) return null;
    return getCroppedBlob(imageUrl, croppedAreaPixels);
  }, [croppedAreaPixels, imageUrl]);

  useEffect(() => {
    submitRef.current = handleSubmit;
    return () => {
      if (submitRef.current === handleSubmit) submitRef.current = null;
    };
  }, [handleSubmit, submitRef]);

  return (
    <div className={s.root}>
      <div className={s.cropBox}>
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          cropSize={{ width: CROP_SIZE, height: CROP_SIZE }}
          onCropChange={next => {
            setCrop(next);
            onDirty?.();
          }}
          onZoomChange={next => {
            setZoom(next);
            onDirty?.();
          }}
          onCropComplete={onCropComplete}
          restrictPosition
          objectFit="cover"
          showGrid={false}
          classes={{
            containerClassName: s.container,
            cropAreaClassName: s.cropArea,
            mediaClassName: s.media,
          }}
        />
      </div>

      <div className={s.sliderRow}>
        <input
          className={s.zoom}
          type="range"
          min={1}
          max={3}
          step={0.01}
          value={zoom}
          onChange={e => {
            setZoom(Number(e.target.value));
            onDirty?.();
          }}
          aria-label="zoom"
        />
      </div>
    </div>
  );
}