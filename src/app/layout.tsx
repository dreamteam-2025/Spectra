import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Spectra",
  description:
    "Spectra - full-featured social networking application for sharing photos and communicating with others.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet"></link>
      </head>
      <body>{children}</body>
    </html>
  );
}
