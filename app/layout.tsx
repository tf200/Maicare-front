import "./globals.css";
import "./data-tables-css.css";
import Guards from "@/components/Guards";
import Providers from "@/components/Providers";
// import "./satoshi.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <Guards>
          <Providers>{children}</Providers>
        </Guards>
      </body>
    </html>
  );
}
