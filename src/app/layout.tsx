import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dharashan & Priyadharshini | Wedding Invitation",
  description: "Together with their families, invite you to celebrate their wedding ceremony and reception.",
  openGraph: {
    title: "Dharashan & Priyadharshini - Wedding Invitation",
    description: "Join us in celebrating our special day.",
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
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Great+Vibes&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen bg-[#0d090d] text-[#f4ece1] font-sans antialiased selection:bg-amber-500/30 selection:text-amber-100 overflow-x-hidden"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
