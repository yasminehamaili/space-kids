export type Planet = {
  id: string;
  name: string;
  order: number;
  color: string; // css gradient
  accent: string; // glow color
  size: number; // relative diameter in px on home orbit
  orbitRadius: number; // px
  orbitDuration: number; // seconds (Mercury fastest)
  facts: {
    diameter: string;
    distance: string;
    moons: string;
    temperature: string;
    funFacts: string[];
  };
  videoId: string; // YouTube id
  wiki: string;
  summary: string;
};

export const planets: Planet[] = [
  {
    id: "mercury",
    name: "Mercury",
    order: 1,
    color: "radial-gradient(circle at 30% 30%, #d6d0c4, #6b6255 70%, #2b2721)",
    accent: "#d6d0c4",
    size: 22,
    orbitRadius: 110,
    orbitDuration: 8,
    facts: {
      diameter: "4,880 km (smallest planet!)",
      distance: "58 million km from the Sun",
      moons: "0 moons",
      temperature: "-180°C to 430°C 🥶🔥",
      funFacts: [
        "A year on Mercury is only 88 Earth days!",
        "It has wrinkles because it shrank as it cooled.",
      ],
    },
    videoId: "_VdIdmT8MEc",
    wiki: "https://en.wikipedia.org/wiki/Mercury_(planet)",
    summary:
      "Mercury is the smallest planet and the closest to the Sun. It zips around the Sun faster than any other planet!",
  },
  {
    id: "venus",
    name: "Venus",
    order: 2,
    color: "radial-gradient(circle at 30% 30%, #ffd27f, #c97b3a 70%, #5b2a10)",
    accent: "#ffd27f",
    size: 28,
    orbitRadius: 160,
    orbitDuration: 14,
    facts: {
      diameter: "12,104 km",
      distance: "108 million km from the Sun",
      moons: "0 moons",
      temperature: "465°C — hotter than an oven! 🔥",
      funFacts: [
        "Venus spins backwards compared to most planets.",
        "It's the hottest planet in our Solar System.",
      ],
    },
    videoId: "djP-IdHFQWU",
    wiki: "https://en.wikipedia.org/wiki/Venus",
    summary:
      "Venus is Earth's twin in size but it's covered in thick, poisonous clouds and is super, super hot!",
  },
  {
    id: "earth",
    name: "Earth",
    order: 3,
    color: "radial-gradient(circle at 30% 30%, #7fd7ff, #1f7fbf 55%, #0b3b6b)",
    accent: "#7fd7ff",
    size: 30,
    orbitRadius: 210,
    orbitDuration: 20,
    facts: {
      diameter: "12,742 km",
      distance: "150 million km from the Sun",
      moons: "1 moon (the Moon!) 🌙",
      temperature: "Average 15°C — just right! 😊",
      funFacts: [
        "Earth is the only planet we know with life!",
        "About 71% of Earth is covered in water.",
      ],
    },
    videoId: "mrYjJ9Jl9dA",
    wiki: "https://en.wikipedia.org/wiki/Earth",
    summary:
      "Earth is our amazing home! It has oceans, forests, animals, and YOU. It's the only planet where we've found life.",
  },
  {
    id: "mars",
    name: "Mars",
    order: 4,
    color: "radial-gradient(circle at 30% 30%, #ff8f6b, #b8371a 65%, #4a1408)",
    accent: "#ff8f6b",
    size: 26,
    orbitRadius: 260,
    orbitDuration: 28,
    facts: {
      diameter: "6,779 km",
      distance: "228 million km from the Sun",
      moons: "2 moons (Phobos & Deimos)",
      temperature: "Average -63°C 🥶",
      funFacts: [
        "Mars has the tallest volcano in the Solar System — Olympus Mons!",
        "Its red color comes from rusty iron in the dirt.",
      ],
    },
    videoId: "D8pnmwOXhoY",
    wiki: "https://en.wikipedia.org/wiki/Mars",
    summary:
      "Mars is the Red Planet! Robots called rovers are driving around exploring it right now.",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    order: 5,
    color:
      "radial-gradient(circle at 30% 30%, #f5d6a0, #c98a4b 50%, #7a3d1a 90%)",
    accent: "#f5d6a0",
    size: 60,
    orbitRadius: 330,
    orbitDuration: 40,
    facts: {
      diameter: "139,820 km (biggest planet!)",
      distance: "778 million km from the Sun",
      moons: "95 known moons 🌕🌕🌕",
      temperature: "-145°C in the clouds",
      funFacts: [
        "Jupiter has a giant storm called the Great Red Spot — bigger than Earth!",
        "You could fit over 1,300 Earths inside Jupiter.",
      ],
    },
    videoId: "Aa7bTvj7kd0",
    wiki: "https://en.wikipedia.org/wiki/Jupiter",
    summary:
      "Jupiter is the giant king of the planets! It's a huge ball of gas with colorful swirling clouds and a giant storm.",
  },
  {
    id: "saturn",
    name: "Saturn",
    order: 6,
    color:
      "radial-gradient(circle at 30% 30%, #ffe8b0, #d1a15a 60%, #6f4a1e)",
    accent: "#ffe8b0",
    size: 52,
    orbitRadius: 400,
    orbitDuration: 55,
    facts: {
      diameter: "116,460 km",
      distance: "1.4 billion km from the Sun",
      moons: "146 known moons!",
      temperature: "-178°C ❄️",
      funFacts: [
        "Saturn's beautiful rings are made of ice and rock chunks.",
        "Saturn is so light it would float in a giant bathtub!",
      ],
    },
    videoId: "epZdZaEQhS0",
    wiki: "https://en.wikipedia.org/wiki/Saturn",
    summary:
      "Saturn is famous for its stunning rings! It's a gas giant that would float in water if you could find a big enough pool.",
  },
  {
    id: "uranus",
    name: "Uranus",
    order: 7,
    color: "radial-gradient(circle at 30% 30%, #d2f5ff, #6fc7d9 60%, #245c6b)",
    accent: "#d2f5ff",
    size: 40,
    orbitRadius: 470,
    orbitDuration: 75,
    facts: {
      diameter: "50,724 km",
      distance: "2.9 billion km from the Sun",
      moons: "27 known moons",
      temperature: "-224°C 🥶 (coldest!)",
      funFacts: [
        "Uranus rolls on its side like a ball!",
        "It's the coldest planet in the Solar System.",
      ],
    },
    videoId: "Q5Ug9au1n3E",
    wiki: "https://en.wikipedia.org/wiki/Uranus",
    summary:
      "Uranus is a chilly ice giant that spins on its side, like a rolling marble around the Sun.",
  },
  {
    id: "neptune",
    name: "Neptune",
    order: 8,
    color: "radial-gradient(circle at 30% 30%, #8fb3ff, #2547c9 60%, #0a1e5b)",
    accent: "#8fb3ff",
    size: 38,
    orbitRadius: 540,
    orbitDuration: 100,
    facts: {
      diameter: "49,244 km",
      distance: "4.5 billion km from the Sun",
      moons: "14 known moons",
      temperature: "-214°C",
      funFacts: [
        "Neptune has the fastest winds in the Solar System — over 2,000 km/h!",
        "One year on Neptune is 165 Earth years long.",
      ],
    },
    videoId: "UO1G25EbOgg",
    wiki: "https://en.wikipedia.org/wiki/Neptune",
    summary:
      "Neptune is a deep blue windy world far, far away from the Sun. It's the last planet in our Solar System.",
  },
];

export const getPlanet = (id: string) => planets.find((p) => p.id === id);
