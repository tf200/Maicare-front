"use client";
import "./globals.css";
import "./data-tables-css.css";
// import "./satoshi.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

