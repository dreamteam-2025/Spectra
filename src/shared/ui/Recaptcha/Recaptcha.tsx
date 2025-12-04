"use client";

import ReCAPTCHA from "react-google-recaptcha";

type Props = {
  onChangeAction: (token: string | null) => void;
  className?: string;
  theme?: "light" | "dark";
};

// in .env we have test key from Google at this moment
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

// if you want to test recaptcha please add this in domain component like forgot-password etc
// useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://www.google.com/recaptcha/api.js";
//     script.async = true;
//     script.defer = true;
//     document.body.appendChild(script);
//
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

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
