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
