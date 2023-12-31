import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { SocketProvider } from "@/components/providers/socket-provider";

import { cn } from "@/lib/utils";
import { QueryProvider } from "@/components/providers/query-provider";

//const font = Roboto({ weight: "400", subsets: ["latin"] });
const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Discord Clone",
  description: "Not actually real",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className, "bg-white dark:bg-[#313338]")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            storageKey="discord-theme"
          >
            <SocketProvider>
              <QueryProvider>
                <ModalProvider />
                {children}
              </QueryProvider>
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
