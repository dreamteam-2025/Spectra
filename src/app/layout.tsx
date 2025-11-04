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
      <body>{children}</body>
    </html>
  );
}
