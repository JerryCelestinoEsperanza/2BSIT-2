import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hope Inc. | One workspace, more good work",
  description:
    "Sign in to Hope Inc. and bring products, people, sales, and customer relationships into one workspace.",
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