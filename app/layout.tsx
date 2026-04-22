import { ReactNode } from "react";
import Providers from "./providers";
import "./globals.css";

export const metadata = {
  title: "AI Code Review App",
  description: "AI-powered code review tool",
};
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}