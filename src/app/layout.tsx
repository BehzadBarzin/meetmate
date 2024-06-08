import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Import stream Styles
import "@stream-io/video-react-sdk/dist/css/styles.css";

import CustomClerkProvider from "@/providers/ClerkProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MeetMate",
  description: "Connect the world, one meeting at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CustomClerkProvider>
        <body className={`${inter.className} bg-dark-2`}>
          {/* Main Content-------------------------------------------------- */}
          {children}
          {/* Toast Messages------------------------------------------------ */}
          <Toaster />
        </body>
      </CustomClerkProvider>
    </html>
  );
}
