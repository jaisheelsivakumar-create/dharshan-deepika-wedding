import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dharshan & Deepika | Royal Wedding Invitation",
  description:
    "Together with their families (Smt. Shoba & Sri. (Late) Lokesh and Smt. Padma & Sri. Sudappa), cordially invite you to celebrate the auspicious wedding ceremonies of Dharshan & Deepika at SRI SATHYA SAI MARRIAGE HALL, Hosur.",
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
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen bg-[#fdfbf7] text-[#6b1e23] font-serif antialiased selection:bg-[#6b1e23]/15 selection:text-[#6b1e23] overflow-x-hidden"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
