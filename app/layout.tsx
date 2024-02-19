import "./globals.css";
import "./data-tables-css.css";
import Guards from "@/components/Guards";
import Providers from "@/components/Providers";
import { ReactNode } from "react";
// import "./satoshi.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning lang="nl">
      <body>
        <Providers>
          <Guards>{children}</Guards>
        </Providers>
      </body>
    </html>
  );
}
