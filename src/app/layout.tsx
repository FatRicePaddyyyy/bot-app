import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { Toaster } from "~/components/ui/toaster";
import { TRPCReactProvider } from "~/trpc/react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <div>
          <TRPCReactProvider>{children}</TRPCReactProvider>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
