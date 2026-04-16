import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Providers from "./Providers";
import { ScrollToTop } from "@/utils/ScrollToTop";
import ChatWidget from "@/components/ui/ChatWidget";

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Evectus",
  description:
    "Evectus არის ქართული განათლების პლატფორმა მოსწავლეებისა და მასწავლებლებისთვის ონლაინ გაკვეთილების გასატარებლად.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ka" className={geistSans.className}>
      <body className={`${geistMono.className} antialiased`}>
        <Providers>
          <ScrollToTop />
          <ChatWidget />
          {children}
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{ className: "font-helveticaneue-medium" }}
          />
        </Providers>
      </body>
    </html>
  );
}
