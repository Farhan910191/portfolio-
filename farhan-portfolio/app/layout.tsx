import type { Metadata } from "next";
import { Cormorant_Garamond, Caveat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeGestureProvider from "@/components/ThemeGestureProvider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mohammed Farhan KK | Full Stack Developer",
  description:
    "Portfolio of Mohammed Farhan KK — Full Stack Developer specializing in React.js, Next.js, TypeScript, Python, Django, REST APIs and PostgreSQL.",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                var saved = localStorage.getItem('portfolio-theme');
                if (saved === 'light') {
                  document.documentElement.setAttribute('data-theme', 'light');
                  document.documentElement.style.backgroundColor = '#ffffff';
                } else {
                  document.documentElement.setAttribute('data-theme', 'dark');
                  document.documentElement.style.backgroundColor = '#060809';
                }
              } catch (e) {}
            })();`,
          }}
        />
      </head>
      <body className={`${cormorant.variable} ${caveat.variable} font-sans`} suppressHydrationWarning>
        <ThemeProvider>
          <ThemeGestureProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}