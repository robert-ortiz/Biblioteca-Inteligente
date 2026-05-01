import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import ThemeProvider from "@/components/ThemeProvider";

import "@/styles/global.scss";
import "@/styles/navbar.scss";
import "@/styles/pages.scss";
import "@/styles/home.scss";
import "@/styles/buscar.scss";
import "@/styles/favoritos.scss";
import "@/styles/acerca.scss";
import "@/styles/libro.scss";
import "@/styles/bookcard.scss";
// 👆 ---------------------------------------------- 👆

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Biblioteca Inteligente",
  description: "Aplicación para buscar y guardar libros",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning 
    >
      <body>
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}