"use client";

import { useEffect, useState } from "react";

export function useObjectURL(file: File | null) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setUrl(null);
      return;
    }

    const newUrl = URL.createObjectURL(file);
    setUrl(newUrl);

    return () => URL.revokeObjectURL(newUrl);
  }, [file]);

  return url;
}
