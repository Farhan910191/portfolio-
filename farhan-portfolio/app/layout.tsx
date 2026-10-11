import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeGestureProvider from "@/components/ThemeGestureProvider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${cormorant.variable} font-sans`} suppressHydrationWarning>
        <ThemeProvider>
          <ThemeGestureProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}