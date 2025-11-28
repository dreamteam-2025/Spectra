"use client";

import { SelectBox } from "@/shared/ui/SelectBox/SelectBox";
import { SelectOption } from "@/shared/ui/SelectBox/SelectBox.types";
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
