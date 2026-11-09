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

export interface GalleryPhoto {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  aspect: "portrait" | "landscape" | "square";
  caption: string;
}

export interface WeddingData {
  couple: {
    groom: {
      firstName: string;
      fullName: string;
      title: string;
      parents: string;
    };
    bride: {
      firstName: string;
      fullName: string;
      title: string;
      parents: string;
    };
    monogram: string;
    hashtag: string;
    weddingDateISO: string; // for countdown
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
  hero: {
    welcomeText: string;
    locationBrief: string;
    backgroundImage: string;
  };
  story: {
    heading: string;
    subheading: string;
    quote: string;
    photos: GalleryPhoto[];
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
    qrCodeUrl: string;
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
      title: "Son of Smt. Shoba & Sri. (Late) Lokesh",
      parents: "S/o Smt. Shoba & Sri. (Late) Lokesh",
    },
    bride: {
      firstName: "Deepika",
      fullName: "Deepika",
      title: "Daughter of Smt. Padma & Sri. Sudappa",
      parents: "D/o Smt. Padma & Sri. Sudappa",
    },
    monogram: "D & D",
    hashtag: "#DharshanWedsDeepika",
    weddingDateISO: "2026-11-15T07:00:00",
    displayDate: "Saturday 14 & Sunday 15, November 2026",
    displayTime: "Muhurtham: 7:00 AM – 7:45 AM (Lagnam: Vruschika)",
    invitationQuote:
      "Two souls with but a single thought, two hearts that beat as one.",
    subQuote:
      "Together with our families, we invite you to grace the auspicious occasion of our wedding ceremony and celebrate the beginning of our forever.",
  },
  family: {
    heading: "With The Blessings Of Our Families",
    subheading: "Traditional Honor & Heritage",
    groomParents: {
      mother: "Smt. Shoba",
      father: "Sri. (Late) Lokesh",
      label: "Groom's Parents",
      description: "Heartily invite you to bestow your warm blessings upon their beloved son Dharshan.",
    },
    brideParents: {
      mother: "Smt. Padma",
      father: "Sri. Sudappa",
      label: "Bride's Parents",
      description: "Warmly invite you to grace the auspicious wedding ceremony of their cherished daughter Deepika.",
    },
    traditionalNote:
      "Your benevolent presence, prayers, and blessings are our greatest treasure as our families unite in eternal joy.",
  },
  audio: {
    title: "Sacred Shehnai & Sitar Harmony",
    artist: "Traditional Acoustic Wedding Melody",
    src: "https://actions.google.com/sounds/v1/ambiences/outdoor_ambience_quiet.ogg",
  },
  hero: {
    welcomeText: "We Cordially Invite You To The Wedding Of",
    locationBrief: "Hosur, Tamil Nadu",
    backgroundImage: "/images/file_000000007eb88211b6b59af10e5753ca.png",
  },
  story: {
    heading: "A Union Blessed By Tradition",
    subheading: "Eternal Companionship",
    quote:
      "Bound by timeless vows, guided by devotion, and showered with eternal love.",
    photos: [
      {
        id: "p1",
        title: "Dharshan & Deepika",
        subtitle: "Sacred Garland Exchange",
        src: "/images/file_000000007eb88211b6b59af10e5753ca.png",
        aspect: "portrait",
        caption: "United in love and tradition, beginning our sacred journey together.",
      },
      {
        id: "p2",
        title: "Golden Smiles",
        subtitle: "Cherished Moments",
        src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80",
        aspect: "portrait",
        caption: "Every glance reflects a promise destined to last forever.",
      },
      {
        id: "p3",
        title: "The Divine Steps",
        subtitle: "Saptapadi Vows",
        src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=80",
        aspect: "portrait",
        caption: "Seven steps taken together for eternity and happiness.",
      },
      {
        id: "p4",
        title: "Blessings & Joy",
        subtitle: "A Lifetime of Love",
        src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
        aspect: "portrait",
        caption: "Surrounded by family, elders' blessings, and divine grace.",
      },
    ],
  },
  events: {
    heading: "Wedding Celebrations",
    subheading: "Join Us In Every Blessed Ceremony",
    items: [
      {
        id: "reception",
        title: "Grand Reception",
        subtitle: "An Evening of Joy & Musical Dinner",
        date: "Saturday, 14-11-2026",
        time: "6.30 Pm Onwards",
        venue: "SRI SATHYA SAI MARRIAGE HALL",
        address: "MGR Colleage Oppsite Hosur To Krishnagiri Road- Hosur",
        dressCode: "Festive Attire / Evening Traditional",
        description:
          "Join us for a grand evening of joyous greetings, delicious feast, music, and welcoming the new couple with love.",
        badge: "Reception Gala",
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
          "Witness the sacred Mangalya Dharanam solemnized under the auspicious Vruschika Lagnam amidst Vedic hymns, auspicious nadaswaram, and elders' blessings.",
        badge: "Main Ceremony",
        iconName: "Flame",
      },
    ],
  },
  location: {
    heading: "Venue & Navigation",
    subheading: "SRI SATHYA SAI MARRIAGE HALL",
    venueName: "SRI SATHYA SAI MARRIAGE HALL",
    fullAddress: "MGR Colleage Oppsite Hosur To Krishnagiri Road- Hosur",
    landmark: "Opposite MGR Arts & Science College, Hosur – Krishnagiri Highway",
    // Embed URL focusing on Sri Sathya Sai Marriage Hall / MGR College Hosur
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Sri+Sathya+Sai+Marriage+Hall+Hosur+MGR+College&t=&z=15&ie=UTF8&iwloc=&output=embed",
    googleMapsUrl: "https://maps.app.goo.gl/dURMrwcLSaUBCaC78",
    qrCodeUrl: "/images/google-maps-qr-code.svg",
    phoneContact: "+91 98450 12345 / +91 94432 56789",
    contactName: "Wedding Help Desk",
  },
  footer: {
    message: "Thank you for being an indispensable part of our lives and blessing our union.",
    blessingsText:
      "With Best Compliments & Warm Regards From Smt. Shoba & Sri. (Late) Lokesh Family and Smt. Padma & Sri. Sudappa Family, Relatives & Friends",
  },
};
