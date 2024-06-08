import Toolbar from "./components/toolbar";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TextRPG",
  description: "Text RPG Game by r-4bb1t",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex h-full w-full justify-center bg-gray-950 text-primary">
        <Toolbar />
        {children}
      </body>
    </html>
  );
}
