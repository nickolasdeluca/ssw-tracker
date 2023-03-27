import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "SSW Tracking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body>
        {children}
        <Analytics mode={"production"} debug={false} />
      </body>
    </html>
  );
}
