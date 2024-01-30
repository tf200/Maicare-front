import "./globals.css";
import "./data-tables-css.css";
import Guards from "@/components/Guards";
// import "./satoshi.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <Guards>{children}</Guards>
      </body>
    </html>
  );
}
