export const categories = [
  {
    id: "club",
    name: "Club Jerseys",
    slug: "club",
    description: "Official kits from the world's biggest football clubs.",
    image: "https://placehold.co/800x900/0A0A0B/17E06B?font=raleway&text=CLUB",
    active: true,
  },
  {
    id: "national",
    name: "National Team Jerseys",
    slug: "national",
    description: "Represent your country on match day.",
    image: "https://placehold.co/800x900/0B7A3C/FAFAF8?font=raleway&text=NATIONAL",
    active: true,
  },
  {
    id: "retro",
    name: "Retro Jerseys",
    slug: "retro",
    description: "Vintage classics from football's golden eras.",
    image: "https://placehold.co/800x900/1D1D20/17E06B?font=raleway&text=RETRO",
    active: true,
  },
  {
    id: "player",
    name: "Player Jerseys",
    slug: "player",
    description: "Player-issue fits with authentic detailing.",
    image: "https://placehold.co/800x900/17E06B/0A0A0B?font=raleway&text=PLAYER",
    active: true,
  },
  {
    id: "training",
    name: "Training Kits",
    slug: "training",
    description: "Pre-match and training wear built for performance.",
    image: "https://placehold.co/800x900/0A0A0B/FAFAF8?font=raleway&text=TRAINING",
    active: true,
  },
  {
    id: "kids",
    name: "Kids Jerseys",
    slug: "kids",
    description: "Mini kits for the next generation of fans.",
    image: "https://placehold.co/800x900/0B7A3C/17E06B?font=raleway&text=KIDS",
    active: true,
  },
];

export const getCategoryById = (id) => categories.find((c) => c.id === id);
