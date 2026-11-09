import type { Metadata, Viewport } from "next";
import {
  Great_Vibes,
  Playfair_Display,
  Lora,
  Noto_Serif_Telugu,
} from "next/font/google";
import "./globals.css";
import { invitationData } from "@/data/invitation";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
  preload: false,
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const lora = Lora({
  weight: ["400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const notoTelugu = Noto_Serif_Telugu({
  weight: ["600", "700"],
  subsets: ["telugu"],
  variable: "--font-telugu",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${invitationData.couple.groom.name} & ${invitationData.couple.bride.name} | South Indian Wedding Invitation`,
  description: `Together with their families (${invitationData.family.groomParents.mother} & ${invitationData.family.groomParents.father} and ${invitationData.family.brideParents.mother} & ${invitationData.family.brideParents.father}), cordially invite you to celebrate the auspicious wedding of ${invitationData.couple.groom.name} & ${invitationData.couple.bride.name} on ${invitationData.couple.displayDates} at ${invitationData.location.venueName}, ${invitationData.hero.city}.`,
  openGraph: {
    title: `${invitationData.couple.groom.name} & ${invitationData.couple.bride.name} — Wedding Invitation`,
    description: `${invitationData.couple.displayDates} • ${invitationData.location.venueName}, ${invitationData.hero.city}`,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FDF8EE",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${greatVibes.variable} ${playfairDisplay.variable} ${lora.variable} ${notoTelugu.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="min-h-[100dvh] bg-[#FDF8EE] text-[#6B1A1F] font-body antialiased selection:bg-[#6B1A1F]/15 selection:text-[#6B1A1F]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
