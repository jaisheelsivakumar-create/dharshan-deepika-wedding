/**
 * WEDDING INVITATION CONFIGURATION
 * All editable content is centralized here.
 * You can easily update names, dates, venues, parents, audio, and asset paths.
 */

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
}

export interface InvitationData {
  invocations: {
    sanskrit: string;
    subhamasthu: string;
    label: string;
  };
  couple: {
    groom: {
      name: string;
      fullName: string;
      parents: string;
    };
    bride: {
      name: string;
      fullName: string;
      parents: string;
    };
    monogram: string;
    hashtag: string;
    weddingDateISO: string; // "2026-11-15T07:00:00"
    displayDates: string;
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
    phoneContact: string;
    contactName: string;
  };
  assets: {
    coupleImage: string;
    qrCodeImage: string;
    poojaElementsImage: string;
    traditionalCardBg: string;
    audioSrc: string;
  };
  footer: {
    message: string;
    blessingsText: string;
  };
}

export const invitationData: InvitationData = {
  invocations: {
    sanskrit: "|| श्री गणेशाय नमः ||",
    subhamasthu: "Subhamasthu",
    label: "The Wedding Invitation Of",
  },
  couple: {
    groom: {
      name: "Dharshan",
      fullName: "Dharshan",
      parents: "S/o Smt. Shoba & Sri. (Late) Lokesh",
    },
    bride: {
      name: "Deepika",
      fullName: "Deepika",
      parents: "D/o Smt. Padma & Sri. Sudappa",
    },
    monogram: "D & D",
    hashtag: "#DharshanWedsDeepika",
    weddingDateISO: "2026-11-15T07:00:00",
    displayDates: "14th & 15th November 2026",
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
    ctaButtonText: "View Invitation Details ✨",
    scrollText: "Scroll to Explore",
  },
  story: {
    heading: "We Are Getting Married",
    subheading: "Dharshan & Deepika",
    invitationBody:
      "Together with our families, we cordially invite you to grace the auspicious occasion of our wedding ceremony. Join us as we take our sacred vows and begin our new journey of eternal love and togetherness.",
    coupleCaption: "Two Souls, One Sacred Bond",
  },
  events: [
    {
      id: "reception",
      title: "Grand Reception",
      subtitle: "An Evening of Celebration, Music & Feasting",
      date: "Saturday, 14-11-2026",
      time: "6:30 PM Onwards",
      venue: "SRI SATHYA SAI MARRIAGE HALL",
      address: "MGR College Opposite Hosur To Krishnagiri Road - Hosur",
      dressCode: "Festive Attire / Evening Traditional",
      description:
        "Join us for an enchanting evening filled with joyful congratulations, melodic dinner music, and welcoming the new couple.",
      badge: "Reception Gala",
    },
    {
      id: "muhurtham",
      title: "Auspicious Muhurtham",
      subtitle: "The Sacred Vedic Wedding Ceremony",
      date: "Sunday, 15-11-2026",
      time: "7:00 AM To 7:45 AM",
      lagnam: "Vruschika",
      venue: "SRI SATHYA SAI MARRIAGE HALL",
      address: "MGR College Opposite Hosur To Krishnagiri Road - Hosur",
      dressCode: "Traditional South Indian Attire",
      description:
        "Witness the sacred Mangalya Dharanam solemnized under the auspicious Vruschika Lagnam amidst sacred Vedic mantras and nadaswaram harmonies.",
      badge: "Main Ceremony",
    },
  ],
  location: {
    heading: "Venue & Directions",
    subheading: "SRI SATHYA SAI MARRIAGE HALL",
    venueName: "SRI SATHYA SAI MARRIAGE HALL",
    fullAddress: "MGR College Opposite Hosur To Krishnagiri Road - Hosur",
    landmark: "Opposite MGR Arts & Science College, Hosur – Krishnagiri Highway",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Sri+Sathya+Sai+Marriage+Hall+Hosur+MGR+College&t=&z=15&ie=UTF8&iwloc=&output=embed",
    googleMapsUrl: "https://maps.app.goo.gl/dURMrwcLSaUBCaC78",
    phoneContact: "+91 98450 12345 / +91 94432 56789",
    contactName: "Wedding Help Desk",
  },
  assets: {
    coupleImage: "/images/file_000000007eb88211b6b59af10e5753ca.png",
    qrCodeImage: "/images/google-maps-qr-code.svg",
    poojaElementsImage: "/images/pooja-elements.png",
    traditionalCardBg: "/images/traditional-card-bg.jpg",
    audioSrc: "/music/wedding-song.mp3",
  },
  footer: {
    message: "Thank you for being an indispensable part of our lives and blessing our union.",
    blessingsText:
      "With Best Compliments & Warm Regards From Smt. Shoba & Sri. (Late) Lokesh Family and Smt. Padma & Sri. Sudappa Family, Relatives & Friends",
  },
};

// Backward-compatible alias
export const weddingData = invitationData;
