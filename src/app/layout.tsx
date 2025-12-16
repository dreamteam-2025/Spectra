import { Header } from "@/widgets";
import type { Metadata } from "next";
import "./globals.scss";
import Script from "next/script";
import { Providers } from "./providers/store";

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
      <body>
        <Providers>
          <Header />
          {children}
          <Script src="https://www.google.com/recaptcha/api.js" strategy="beforeInteractive" />
        </Providers>
      </body>
    </html>
  );
}
