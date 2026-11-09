import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dharshan & Deepika | Royal Wedding Invitation",
  description:
    "Together with their families (Smt. Shoba & Sri. (Late) Lokesh and Smt. Padma & Sri. Sudappa), invite you to celebrate the wedding ceremony and reception of Dharshan & Deepika at SRI SATHYA SAI MARRIAGE HALL, Hosur.",
  openGraph: {
    title: "Dharshan & Deepika - Wedding Invitation",
    description: "Join us in celebrating our wedding celebrations on November 14 & 15, 2026.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen bg-[#f8eee5] text-[#651c29] font-serif antialiased selection:bg-[#741e2b]/20 selection:text-[#741e2b] overflow-x-hidden"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
