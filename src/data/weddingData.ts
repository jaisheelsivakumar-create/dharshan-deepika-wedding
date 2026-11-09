export interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  dressCode: string;
  description: string;
  badge: string;
  iconName: "Flame" | "Sparkles" | "Music" | "HeartHandshake" | "GlassWater";
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
  audio: {
    title: string;
    artist: string;
    src: string; // fallback / placeholder audio URL
  };
  hero: {
    backgroundImage: string;
    welcomeText: string;
    locationBrief: string;
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
      firstName: "Dharashan",
      fullName: "Dharashan Balasubramanian",
      title: "Son of Mr. & Mrs. Balasubramanian",
      parents: "S/o Mr. K. Balasubramanian & Mrs. Lakshmi Balasubramanian",
    },
    bride: {
      firstName: "Priyadharshini",
      fullName: "Priyadharshini Sundaram",
      title: "Daughter of Mr. & Mrs. Sundaram",
      parents: "D/o Mr. R. Sundaram & Mrs. Geetha Sundaram",
    },
    monogram: "D & P",
    hashtag: "#DharashanWedsPriya",
    weddingDateISO: "2026-12-11T09:00:00",
    displayDate: "Friday, December 11, 2026",
    displayTime: "Muhurtham: 9:00 AM – 10:30 AM",
    invitationQuote:
      "Two souls with but a single thought, two hearts that beat as one.",
    subQuote:
      "With the blessings of our parents and elders, we joyfully invite you to grace the auspicious occasion of our wedding ceremony and celebrate the beginning of our forever.",
  },
  audio: {
    title: "Romantic Flute & Strings Melody",
    artist: "Traditional Acoustic Wedding Harmony",
    // Royalty-free peaceful wedding flute/ambient mp3 placeholder
    src: "https://actions.google.com/sounds/v1/ambiences/outdoor_ambience_quiet.ogg",
  },
  hero: {
    welcomeText: "We Invite You To Celebrate The Wedding Of",
    locationBrief: "Chennai, Tamil Nadu • India",
    backgroundImage: "/images/couple.jpg",
  },
  story: {
    heading: "Our Journey of Love",
    subheading: "A Glimpse Into Our Story",
    quote:
      "From unexpected meetings to shared sunrises, every step brought us to this divine promise.",
    photos: [
      {
        id: "p1",
        title: "Dharashan & Priyadharshini",
        subtitle: "The Sacred Vows",
        src: "/images/couple.jpg",
        aspect: "portrait",
        caption: "Bound by sacred tradition, love, and eternal companionship.",
      },
      {
        id: "p2",
        title: "Golden Evenings",
        subtitle: "Echoes of laughter",
        src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
        aspect: "portrait",
        caption: "Shared smiles under painted twilight skies.",
      },
      {
        id: "p3",
        title: "The Sacred Promise",
        subtitle: "Hand in Hand",
        src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=80",
        aspect: "portrait",
        caption: "Together we step forward into our new horizon.",
      },
      {
        id: "p4",
        title: "Eternal Tomorrow",
        subtitle: "Forever Begins Now",
        src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1000&q=80",
        aspect: "portrait",
        caption: "Blessed with love, laughter, and endless memories.",
      },
    ],
  },
  events: {
    heading: "Wedding Celebrations",
    subheading: "Join Us In Every Blessed Moment",
    items: [
      {
        id: "sangeet",
        title: "Sangeet & Celebration Night",
        subtitle: "An Evening of Music, Dance & Henna",
        date: "Thursday, December 10, 2026",
        time: "6:00 PM Onwards",
        venue: "The Lotus Grand Lawn",
        address: "The Royal Heritage Palace, East Coast Road, Chennai - 600119",
        dressCode: "Vibrant Indo-Western / Festive Cocktail",
        description:
          "An electric evening of soulful music, family performances, dazzling choreography, and celebration under sparkling fairy lights.",
        badge: "Day 1 Celebration",
        iconName: "Music",
      },
      {
        id: "muhurtham",
        title: "Auspicious Muhurtham",
        subtitle: "The Sacred Vedic Wedding Ceremony",
        date: "Friday, December 11, 2026",
        time: "9:00 AM – 10:30 AM (followed by Feast)",
        venue: "The Royal Heritage Mandapam",
        address: "The Royal Heritage Palace, East Coast Road, Chennai - 600119",
        dressCode: "Traditional Silk / South Indian Attire",
        description:
          "Witness the sacred Mangalya Dharanam, Kanyadaanam, and Saptapadi as we solemnize our eternal vows amidst fragrant jasmine and sacred fire.",
        badge: "Main Ceremony",
        iconName: "Flame",
      },
      {
        id: "reception",
        title: "Grand Evening Reception",
        subtitle: "A Regal Dinner & Toast to New Beginnings",
        date: "Friday, December 11, 2026",
        time: "7:00 PM Onwards",
        venue: "The Imperial Crystal Ballroom",
        address: "The Royal Heritage Palace, East Coast Road, Chennai - 600119",
        dressCode: "Regal Elegance / Tuxedo / Designer Saree",
        description:
          "Join us for an enchanting night of fine gourmet dining, live orchestra, champagne toasts, and joyous memories with family and friends.",
        badge: "Gala Evening",
        iconName: "Sparkles",
      },
    ],
  },
  location: {
    heading: "Venue & Directions",
    subheading: "We Cannot Wait To Welcome You",
    venueName: "The Royal Heritage Palace & Convention Centre",
    fullAddress: "45 Royal Heritage Boulevard, East Coast Road (ECR), Chennai, Tamil Nadu 600119",
    landmark: "Adjacent to Golden Sands Beachfront, Near Akkarai",
    // Embed URL with interactive Google Maps view
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.7511677322964!2d80.2452288!3d12.9237248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525cf26d408543%3A0xc3191be08cb1745e!2sEast%20Coast%20Rd%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    googleMapsUrl: "https://maps.google.com/?q=The+Royal+Heritage+Palace+ECR+Chennai",
    qrCodeUrl: "/images/qr-code.png",
    phoneContact: "+91 98765 43210 / +91 91234 56789",
    contactName: "Wedding Hospitality Desk",
  },
  footer: {
    message: "Thank you for being part of our story and blessing our new beginning.",
    blessingsText: "With Warm Regards & Best Compliments from Balasubramanian & Sundaram Families",
  },
};
