import type { Metadata } from "next";
import "./globals.scss";
import Script from "next/script";
import { Providers } from "./providers";
import { ToastsProvider } from "./providers";
import { LayoutController } from "./LayoutController";

export const metadata: Metadata = {
  title: "Spectra",
  description:
    "Spectra - full-featured social networking application for sharing photos and communicating with others.",
};

export default function RootLayout({
  children,
  sidebar,
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {/* Этот LayoutController нужен для отображения/сокрытия всего лишнего в ouath popup */}
          <LayoutController sidebar={sidebar}>{children}</LayoutController>
          <ToastsProvider />
          <Script src="https://www.google.com/recaptcha/api.js" strategy="afterInteractive" />
        </Providers>
      </body>
    </html>
  );
}
