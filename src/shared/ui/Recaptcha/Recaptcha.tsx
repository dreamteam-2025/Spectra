"use client";

import ReCAPTCHA from "react-google-recaptcha";
import { forwardRef } from "react";

type Props = {
  onChangeAction: (token: string | null) => void;
  className?: string;
  theme?: "light" | "dark";
};

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export const Recaptcha = forwardRef<ReCAPTCHA, Props>(({ onChangeAction, className, theme = "dark" }, ref) => {
  if (!SITE_KEY) {
    console.error("NEXT_PUBLIC_RECAPTCHA_SITE_KEY is missing. Add it to your .env file.");

    return null;
  }

  return (
    <div className={className}>
      <ReCAPTCHA ref={ref} sitekey={SITE_KEY} onChange={onChangeAction} theme={theme} />
    </div>
  );
});
