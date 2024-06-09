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
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, interactive-widget=resizes-content"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6832330944407417"
          crossOrigin="anonymous"
        ></script>
        <script
          data-name="BMC-Widget"
          data-cfasync="false"
          src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
          data-id="r4bb1t"
          data-description="Support me on Buy me a coffee!"
          data-message="재미있게 즐기고 계신가요?"
          data-color="#22dddd"
          data-position="Right"
          data-x_margin="18"
          data-y_margin="18"
          async
        ></script>
      </head>
      <body className="flex w-full flex-col items-center bg-gray-950 text-primary">
        <Toolbar />
        {children}
      </body>
    </html>
  );
}
