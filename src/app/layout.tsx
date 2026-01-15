import { Header } from "@/widgets";
import type { Metadata } from "next";
import "./globals.scss";
import Script from "next/script";
import { Providers } from "./providers";
import { ToastsProvider } from "./providers";
import { RootLoader } from "../app/providers/notifications/RootLoader";

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
  sidebar?: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <RootLoader />

          {/* Контейнер с параллельными роутами */}
          <div className="appContainer">
            {sidebar || <div className="sidebarPlaceholder" />}
            <main className="mainContent">{children}</main>
          </div>

          <ToastsProvider />
          <Script src="https://www.google.com/recaptcha/api.js" strategy="beforeInteractive" />
        </Providers>
      </body>
    </html>
  );
}
