import "./globals.css";
import "./data-tables-css.css";
import Providers from "@/components/Providers";
import { ReactNode } from "react";
// import "./satoshi.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
