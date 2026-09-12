import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohammed Farhan KK | Full Stack Developer",
  description:
    "Portfolio of Mohammed Farhan KK — Full Stack Developer specializing in React.js, Next.js, TypeScript, Python, Django, REST APIs and PostgreSQL.",
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