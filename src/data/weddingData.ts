export interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  lagnam?: string;
  venue: string;
  address: string;
  dressCode?: string;
  description: string;
  badge: string;
  iconName: "Flame" | "Sparkles" | "Music" | "HeartHandshake";
}

export interface WeddingData {
  couple: {
    groom: {
      firstName: string;
      fullName: string;
      parents: string;
    };
    bride: {
      firstName: string;
      fullName: string;
      parents: string;
    };
    monogram: string;
    hashtag: string;
    weddingDateISO: string; // Sunday, 15 Nov 2026 07:00:00
    displayDate: string;
    displayTime: string;
    invitationQuote: string;
    subQuote: string;
  };
  family: {
    heading: string;
    subheading: string;
    groomParents: {
      mother: string;
      father: string;
      label: string;
      description: string;
    };
    brideParents: {
      mother: string;
      father: string;
      label: string;
      description: string;
    };
    traditionalNote: string;
  };
  audio: {
    title: string;
    artist: string;
    src: string;
  };
  assets: {
    coupleImage: string;
    qrCodeImage: string;
  };
  events: {
    heading: string;
    subheading: string;
    items: EventItem[];
  };
  location: {
    heading: string;
    subheading: string;
    venueName: string;
    fullAddress: string;
    landmark: string;
    mapEmbedUrl: string;
    googleMapsUrl: string;
    phoneContact: string;
    contactName: string;
  };
  footer: {
    message: string;
    blessingsText: string;
  };
}

export const weddingData: WeddingData = {
  couple: {
    groom: {
      firstName: "Dharshan",
      fullName: "Dharshan",
      parents: "S/o Smt. Shoba & Sri. (Late) Lokesh",
    },
    bride: {
      firstName: "Deepika",
      fullName: "Deepika",
      parents: "D/o Smt. Padma & Sri. Sudappa",
    },
    monogram: "D & D",
    hashtag: "#DharshanWedsDeepika",
    weddingDateISO: "2026-11-15T07:00:00",
    displayDate: "14th & 15th November 2026",
    displayTime: "Muhurtham: 7:00 AM – 7:45 AM (Lagnam: Vruschika)",
    invitationQuote:
      "Two souls with but a single thought, two hearts that beat as one.",
    subQuote:
      "Together with our families, we cordially invite you to grace the auspicious occasion of our wedding ceremony and shower your divine blessings upon us.",
  },
  family: {
    heading: "With The Blessings Of Our Families",
    subheading: "Traditional Honor & Heritage",
    groomParents: {
      mother: "Smt. Shoba",
      father: "Sri. (Late) Lokesh",
      label: "Groom's Parents",
      description:
        "Cordially invite your gracious presence with family and friends to celebrate the wedding of their son Dharshan.",
    },
    brideParents: {
      mother: "Smt. Padma",
      father: "Sri. Sudappa",
      label: "Bride's Parents",
      description:
        "Warmly invite you to grace the auspicious wedding ceremony of their beloved daughter Deepika and bless the couple.",
    },
    traditionalNote:
      "Your benevolent presence, prayers, and heartfelt blessings are our greatest treasure as our families unite in sacred celebration.",
  },
  audio: {
    title: "Sacred Wedding Nadaswaram & Shehnai Harmony",
    artist: "Auspicious Temple Wedding Music",
    src: "https://actions.google.com/sounds/v1/ambiences/outdoor_ambience_quiet.ogg",
  },
  assets: {
    coupleImage: "/images/file_000000007eb88211b6b59af10e5753ca.png",
    qrCodeImage: "/images/google-maps-qr-code.svg",
  },
  events: {
    heading: "Wedding Ceremonies",
    subheading: "Auspicious Celebrations",
    items: [
      {
        id: "reception",
        title: "Grand Reception",
        subtitle: "An Evening of Joy, Music & Welcome Dinner",
        date: "Saturday, 14-11-2026",
        time: "6.30 Pm Onwards",
        venue: "SRI SATHYA SAI MARRIAGE HALL",
        address: "MGR Colleage Oppsite Hosur To Krishnagiri Road- Hosur",
        dressCode: "Festive Attire / Evening Traditional",
        description:
          "Join us for a grand evening of joyous greetings, delicious feast, celebratory music, and blessing the couple.",
        badge: "Reception Ceremony",
        iconName: "Sparkles",
      },
      {
        id: "muhurtham",
        title: "Auspicious Muhurtham",
        subtitle: "The Sacred Vedic Wedding Ceremony",
        date: "Sunday, 15-11-2026",
        time: "7.00 am To 7.45 am",
        lagnam: "Vruschika",
        venue: "SRI SATHYA SAI MARRIAGE HALL",
        address: "MGR Colleage Oppsite Hosur To Krishnagiri Road- Hosur",
        dressCode: "Traditional South Indian Attire",
        description:
          "Witness the sacred Mangalya Dharanam solemnized under the auspicious Vruschika Lagnam amidst sacred Vedic hymns and nadaswaram melodies.",
        badge: "Main Ceremony",
        iconName: "Flame",
      },
    ],
  },
  location: {
    heading: "Venue & Directions",
    subheading: "Sri Sathya Sai Marriage Hall",
    venueName: "SRI SATHYA SAI MARRIAGE HALL",
    fullAddress: "MGR Colleage Oppsite Hosur To Krishnagiri Road- Hosur",
    landmark: "Opposite MGR Arts & Science College, Hosur – Krishnagiri Highway",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Sri+Sathya+Sai+Marriage+Hall+Hosur+MGR+College&t=&z=15&ie=UTF8&iwloc=&output=embed",
    googleMapsUrl: "https://maps.app.goo.gl/dURMrwcLSaUBCaC78",
    phoneContact: "+91 98450 12345 / +91 94432 56789",
    contactName: "Wedding Help Desk",
  },
  footer: {
    message: "Thank you for being an indispensable part of our story and blessing our new beginning.",
    blessingsText:
      "With Best Compliments & Warm Regards from Smt. Shoba & Sri. (Late) Lokesh Family and Smt. Padma & Sri. Sudappa Family, Relatives & Friends",
  },
};
