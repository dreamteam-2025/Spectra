"use client";

import { SelectBox } from "@/shared";
import type { SelectOption } from "@/shared";
import { useState } from "react";

export const LanguageSelect = () => {
  const [selectedLang, setSelectedLang] = useState("en"); // пока не добавим селекторы

  const languages: SelectOption[] = [
    {
      label: "English",
      value: "en",
      icon: "flagunitedkingdom",
    },
    {
      label: "Russian",
      value: "ru",
      icon: "flagrussia",
    },
  ];

  return (
    <SelectBox
      value={selectedLang}
      options={languages}
      onChange={value => {
        setSelectedLang(value);
      }}
    />
  );
};
