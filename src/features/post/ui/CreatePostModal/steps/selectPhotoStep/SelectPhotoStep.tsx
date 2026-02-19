"use client";

import type { ChangeEvent } from "react";
import { useRef, useState } from "react";
import Image from "next/image";

import s from "./SelectPhotoStep.module.scss";
import { Button } from "@/shared";

type Props = {
  onSelected: (files: File[]) => void;
  max: number;
  currentCount: number;
};

const MAX_SIZE = 20 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png"]);

export function SelectPhotoStep({ onSelected, max, currentCount }: Props) {
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const validate = (file: File) => {
    const okType = ALLOWED.has(file.type);
    const okSize = file.size <= MAX_SIZE;
    return okType && okSize;
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files ?? []);
    if (!list.length) return;

    const free = Math.max(0, max - currentCount);
    const picked = list.slice(0, free);

    if (!picked.length) {
      setError(`You can add максимум ${max} photos`);
      e.target.value = "";
      return;
    }

    const bad = picked.find((f) => !validate(f));
    if (bad) {
      setError("The photo must be less than 20 Mb and have JPEG or PNG format");
      e.target.value = "";
      return;
    }

    setError(null);
    onSelected(picked);
    e.target.value = "";
  };

  return (
    <div className={s.root}>
      <div className={s.placeholder} aria-hidden>
        <Image src="/icons/image-outline.svg" alt="Image" width={48} height={48} />
      </div>

      <div className={s.actions}>
        <label className={s.selectBtn}>
          <input
            ref={inputRef}
            className={s.fileInput}
            type="file"
            accept="image/jpeg,image/png"
            multiple
            onChange={onChange}
          />
          Select from Computer
        </label>

        {error && <div className={s.error}>{error}</div>}
      </div>
    </div>
  );
}
