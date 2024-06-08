import StreamClientProvider from "@/providers/StreamClientProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      {/* Wrap with StreamClientProvider to access StreamVideoClient */}
      <StreamClientProvider>{children}</StreamClientProvider>
    </main>
  );
}
