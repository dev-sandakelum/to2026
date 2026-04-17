import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hasitha Sandakelum — Portfolio",
  description: "Full-Stack Developer & AI Builder",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
