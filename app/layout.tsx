import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shaurya Chandna",
  description: "Computational mathematics student at University of Waterloo specializing in data science and machine learning.",
  icons: {
    icon: '/personal-webs/public/hexagon-logo.jpg',
    shortcut: '/personal-webs/public/hexagon-logo.jpg',
    apple: '/personal-webs/public/hexagon-logo.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
