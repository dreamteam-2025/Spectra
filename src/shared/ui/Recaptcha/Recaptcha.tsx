"use client";

import ReCAPTCHA from "react-google-recaptcha";

type Props = {
  onChangeAction: (token: string | null) => void;
  className?: string;
  theme?: "light" | "dark";
};

// in .env we have test key from Google at this moment
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export const Recaptcha = ({ onChangeAction, className, theme = "dark" }: Props) => {
  if (!SITE_KEY) {
    console.error("NEXT_PUBLIC_RECAPTCHA_SITE_KEY is missing. Add it to your .env file.");

    return null;
  }

  return (
    <div className={className}>
      <ReCAPTCHA sitekey={SITE_KEY} onChange={onChangeAction} theme={theme} />
    </div>
  );
};
