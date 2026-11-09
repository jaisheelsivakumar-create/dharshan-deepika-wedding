/**
 * WEDDING INVITATION CONFIGURATION
 * All editable personal details, events, venue URLs, gallery items, and asset paths live here.
 * Replace placeholder values here without modifying any UI components.
 */

export type EventIconType = "sparkles" | "flame" | "music" | "sun";

export interface EventDetail {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  time: string;
  lagnam?: string;
  venue: string;
  address: string;
  dressCode?: string;
  description: string;
  badge: string;
  icon: EventIconType;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  width: number;
  height: number;
  isCutout?: boolean;
}

export interface InvitationData {
  invocations: {
    shlokaLines: string[];
    subhamasthu: string;
    label: string;
  };
  splash: {
    sealMonogram: string;
    tapPrompt: string;
    buttonLabel: string;
  };
  couple: {
    groom: {
      name: string;
      fullName: string;
      parents: string;
      familyTitle: string;
      residence: string;
      blessingNote: string;
    };
    bride: {
      name: string;
      fullName: string;
      parents: string;
      familyTitle: string;
      residence: string;
      blessingNote: string;
    };
    monogram: string;
    hashtag: string;
    weddingDateISO: string;
    displayDates: string;
    displayDays: string;
  };
  family: {
    groomParents: {
      mother: string;
      father: string;
      label: string;
    };
    brideParents: {
      mother: string;
      father: string;
      label: string;
    };
    traditionalInvitationText: string;
  };
  hero: {
    openingQuote: string;
    venueName: string;
    city: string;
    ctaButtonText: string;
    scrollText: string;
  };
  story: {
    heading: string;
    subheading: string;
    invitationBody: string;
    coupleCaption: string;
  };
  events: EventDetail[];
  location: {
    heading: string;
    subheading: string;
    venueName: string;
    fullAddress: string;
    landmark: string;
    mapEmbedUrl: string;
    googleMapsUrl: string;
  };
  gallery: {
    heading: string;
    subheading: string;
    description: string;
    items: GalleryItem[];
  };
  blessings: {
    heading: string;
    subheading: string;
    description: string;
    initialCount: number;
    buttonLabel: string;
    showeredLabel: string;
  };
  assets: {
    backgroundImage: string;
    foregroundImage: string;
    coupleImage: string;
    garlandLeftImage: string;
    garlandRightImage: string;
    audioSrc: string;
  };
  footer: {
    heading: string;
    message: string;
    blessingsText: string;
    creditLine: string;
  };
}

export const invitationData: InvitationData = {
  invocations: {
    shlokaLines: [
      "|| శ్రీ గణేశాయ నమః ||",
      "వక్రతుండ మహాకాయ సూర్యకోటి సమప్రభ ।",
      "నిర్విఘ్నం కురు మే దేవ సర్వకార్యేషు సర్వదా ॥",
    ],
    subhamasthu: "Subhamasthu",
    label: "The Wedding Invitation Of",
  },
  splash: {
    sealMonogram: "D & D",
    tapPrompt: "Auspicious Invitation Awaits",
    buttonLabel: "Tap to Open",
  },
  couple: {
    groom: {
      name: "Dharshan",
      fullName: "Chi.Ry. Dharshan",
      parents: "S/o Smt. Shoba & Sri. (Late) Lokesh",
      familyTitle: "Groom's Family",
      residence: "Hosur, Tamil Nadu",
      blessingNote: "With warm love and eternal blessings from the Groom's household",
    },
    bride: {
      name: "Deepika",
      fullName: "Chi.Sou. Deepika",
      parents: "D/o Smt. Padma & Sri. Sudappa",
      familyTitle: "Bride's Family",
      residence: "Hosur, Tamil Nadu",
      blessingNote: "With heartfelt joy and blessings from the Bride's household",
    },
    monogram: "D & D",
    hashtag: "#DharshanWedsDeepika",
    weddingDateISO: "2026-11-15T07:00:00+05:30",
    displayDates: "14th November 2026",
    displayDays: "Saturday",
  },
  family: {
    groomParents: {
      mother: "Smt. Shoba",
      father: "Sri. (Late) Lokesh",
      label: "Groom's Parents",
    },
    brideParents: {
      mother: "Smt. Padma",
      father: "Sri. Sudappa",
      label: "Bride's Parents",
    },
    traditionalInvitationText:
      "Together with our families, we cordially invite you to grace the auspicious occasion of our wedding ceremony and celebrate the beginning of our forever.",
  },
  hero: {
    openingQuote:
      "Together with their families, cordially invite you to celebrate their auspicious wedding ceremonies.",
    venueName: "SRI SATHYA SAI MARRIAGE HALL",
    city: "Hosur, Tamil Nadu",
    ctaButtonText: "View Invitation Details",
    scrollText: "Scroll to Explore",
  },
  story: {
    heading: "Two Families, One Sacred Bond",
    subheading: "Dharshan & Deepika",
    invitationBody:
      "Together with our beloved parents and elders, we joyfully invite you to witness our sacred vows and shower your blessings as two hearts unite in eternal companionship.",
    coupleCaption: "Together is a sacred place to be",
  },
  events: [
    {
      id: "reception",
      title: "Reception",
      subtitle: "An Evening of Celebration, Music & Feasting",
      date: "Saturday, 14th November 2026",
      time: "6:30 PM Onwards",
      venue: "SRI SATHYA SAI MARRIAGE HALL",
      address: "MGR College Opposite, Hosur to Krishnagiri Road, Hosur",
      dressCode: "Festive Traditional / Silk Attire",
      description:
        "Join us for an enchanting evening filled with warm greetings, nadaswaram melodies, joyful celebration, and a grand festive dinner.",
      badge: "Evening Gala",
      icon: "sparkles",
    },
    {
      id: "muhurtham",
      title: "Muhurtham",
      subtitle: "The Sacred Vedic Wedding Ceremony",
      date: "Sunday, 15th November 2026",
      time: "7:00 AM – 7:45 AM",
      lagnam: "Vruschika Lagnam",
      venue: "SRI SATHYA SAI MARRIAGE HALL",
      address: "MGR College Opposite, Hosur to Krishnagiri Road, Hosur",
      dressCode: "Traditional South Indian Silk",
      description:
        "Witness the sacred Mangalya Dharanam solemnized amidst Vedic chants, auspicious bells, and blessings from elders and loved ones.",
      badge: "Main Ceremony",
      icon: "flame",
    },
  ],
  location: {
    heading: "Venue & Directions",
    subheading: "Where We Gather",
    venueName: "SRI SATHYA SAI MARRIAGE HALL",
    fullAddress: "MGR College Opposite, Hosur to Krishnagiri Road, Hosur, Tamil Nadu 635109",
    landmark: "Opposite MGR Arts & Science College, Hosur – Krishnagiri Highway",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Sri+Sathya+Sai+Marriage+Hall+Hosur+MGR+College&t=&z=15&ie=UTF8&iwloc=&output=embed",
    googleMapsUrl: "https://maps.app.goo.gl/dURMrwcLSaUBCaC78",
  },
  gallery: {
    heading: "Cherished Moments",
    subheading: "Sacred Glimpses",
    description:
      "A glimpse into the traditions, colours, and timeless warmth of our wedding celebration.",
    items: [
      {
        id: "g1",
        src: "/assets/gallery/gallery-1.jpg",
        alt: "South Indian brass pooja plate with jasmine flowers, lotus buds, turmeric, kumkum, and gold mangalsutra on crimson silk",
        title: "Sacred Mangalsutra & Jasmine",
        caption: "Auspicious blessings of turmeric, kumkum, and fresh temple jasmine",
        width: 896,
        height: 1200,
      },
      {
        id: "g2",
        src: "/assets/gallery/gallery-2.jpg",
        alt: "Traditional South Indian wedding mandapam decorated with jasmine garlands, brass bells, and glowing kuthuvilakku oil lamps",
        title: "The Sacred Mandapam",
        caption: "Adorned with mango leaves, jasmine garlands, and warm lamp light",
        width: 1200,
        height: 896,
      },
      {
        id: "g3",
        src: "/assets/gallery/gallery-3.jpg",
        alt: "Bride and groom holding hands gently with gold bangles, crimson Kanjeevaram silk, and cream zari veshti",
        title: "Promises in Silk & Gold",
        caption: "Two hearts stepping into a lifetime of grace and devotion",
        width: 896,
        height: 1200,
      },
      {
        id: "g4",
        src: "/assets/couple.png",
        alt: "Dharshan and Deepika smiling together wearing wedding garlands, cream veshti, and crimson Kanjeevaram saree",
        title: "Dharshan & Deepika",
        caption: "United in love, laughter, and our families' blessings",
        width: 682,
        height: 1024,
        isCutout: true,
      },
    ],
  },
  blessings: {
    heading: "Shower Your Blessings",
    subheading: "Send Your Love",
    description:
      "Your presence and heartfelt wishes are the most treasured gifts as we begin our journey together. Tap below to shower floral blessings.",
    initialCount: 150,
    buttonLabel: "Tap to Shower Blessings",
    showeredLabel: "Shower More Blessings",
  },
  assets: {
    backgroundImage: "/assets/background.png",
    foregroundImage: "/assets/foreground.png",
    coupleImage: "/assets/couple.png",
    garlandLeftImage: "/assets/garland-left.png",
    garlandRightImage: "/assets/garland-right.png",
    audioSrc: "/assets/song.mp3",
  },
  footer: {
    heading: "We Await Your Gracious Presence",
    message:
      "Thank you for being an indispensable part of our lives and blessing our sacred union.",
    blessingsText:
      "With Best Compliments & Warm Regards From Smt. Shoba & Sri. (Late) Lokesh Family and Smt. Padma & Sri. Sudappa Family, Relatives & Friends",
    creditLine: "With Love & Gratitude — Dharshan & Deepika",
  },
};

export const weddingData = invitationData;
