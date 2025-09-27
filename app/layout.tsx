import "./globals.css";
import { ThemeProvider } from "@/components/provider";
import LayoutHeader from "@/components/layout/layout-header";
import { geistMono, geistSans } from "@/configs/app";
import { metadata } from "@/configs/app";

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutHeader />
          <div className="flex flex-1">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
