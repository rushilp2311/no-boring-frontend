import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "HashNode Summarizer",
  description: "MindsDB Hackathon",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en" className="h-full w-full">
      <body className={cn(GeistSans.className, "h-full w-full")}>
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SpeedInsights />
            {children}
            <Toaster />
            <Analytics />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
