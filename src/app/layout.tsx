import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomClerkProvider from "@/providers/ClerkProvider";

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
        <body className={`${inter.className} bg-dark-2`}>{children}</body>
      </CustomClerkProvider>
    </html>
  );
}
