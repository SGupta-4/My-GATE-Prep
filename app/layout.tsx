import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prep Dashboard",
  description: "Track exam topics, resources, revisions and mock tests.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
