import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { inter } from "./ui/fonts";
import Sidenav  from "./ui/dashboard/sidenav";
import Header from "./header/page";
import { Providers } from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
        >
        <Providers>
        <div>
          <Header />
          <main className="flex h-screen flex-col md:flex-row md:overflow-hidden pt-16">
          <div className="w-full flex-none md:w-64 ">
          <Sidenav />
          </div>
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12 ">
          {children}
          </div>
          </main>
        </div>
        </Providers>
      </body>
    </html>

  );
}
