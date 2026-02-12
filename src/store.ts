import { create } from 'zustand';

interface SolarSystemState {
  selectedPlanet: string | null;
  selectPlanet: (planet: string | null) => void;
  isPaused: boolean;
  togglePause: () => void;
  timeSpeed: number;
  setTimeSpeed: (speed: number) => void;
  resetCamera: () => void;
}

export const useSolarSystemStore = create<SolarSystemState>((set) => ({
  selectedPlanet: null,
  selectPlanet: (planet) => set({ selectedPlanet: planet }),
  isPaused: false,
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  timeSpeed: 1,
  setTimeSpeed: (speed) => set({ timeSpeed: speed }),
  resetCamera: () => set({ selectedPlanet: null }),
}));

// --- COMPLETE PLANET DATA (Including Sun & Moon) ---
export const PLANET_INFO: Record<string, any> = {
  Sun: {
    name: "Sun",
    diameter: "1,392,700 km",
    gravity: "274 m/s²",
    orbit: "230 Million Years (Galactic)",
    distance: "0 km",
    description: "The star at the center of our Solar System. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core."
  },
  Mercury: {
    name: "Mercury",
    diameter: "4,880 km",
    gravity: "3.7 m/s²",
    orbit: "88 days",
    distance: "57.9 million km",
    description: "The smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the Sun's planets."
  },
  Venus: {
    name: "Venus",
    diameter: "12,104 km",
    gravity: "8.87 m/s²",
    orbit: "225 days",
    distance: "108.2 million km",
    description: "The second planet from the Sun. It is named after the Roman goddess of love and beauty. As the brightest natural object in Earth's night sky after the Moon, Venus can cast shadows."
  },
  Earth: {
    name: "Earth",
    diameter: "12,742 km",
    gravity: "9.807 m/s²",
    orbit: "365.25 days",
    distance: "149.6 million km",
    description: "The third planet from the Sun and the only astronomical object known to harbor life. About 29% of Earth's surface is land consisting of continents and islands."
  },
  Moon: {
    name: "Moon",
    diameter: "3,474 km",
    gravity: "1.62 m/s²",
    orbit: "27.3 days",
    distance: "384,400 km (from Earth)",
    description: "Earth's only natural satellite. It is the fifth-largest satellite in the Solar System and the largest among planetary satellites relative to the size of the planet that it orbits."
  },
  Mars: {
    name: "Mars",
    diameter: "6,779 km",
    gravity: "3.711 m/s²",
    orbit: "687 days",
    distance: "227.9 million km",
    description: "The fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. In English, Mars carries the name of the Roman god of war."
  },
  Jupiter: {
    name: "Jupiter",
    diameter: "139,820 km",
    gravity: "24.79 m/s²",
    orbit: "12 years",
    distance: "778.5 million km",
    description: "The fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half times that of all the other planets in the Solar System combined."
  },
  Saturn: {
    name: "Saturn",
    diameter: "116,460 km",
    gravity: "10.44 m/s²",
    orbit: "29 years",
    distance: "1.4 billion km",
    description: "The sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius of about nine and a half times that of Earth."
  },
  Uranus: {
    name: "Uranus",
    diameter: "50,724 km",
    gravity: "8.69 m/s²",
    orbit: "84 years",
    distance: "2.8 billion km",
    description: "The seventh planet from the Sun. Its name is a reference to the Greek god of the sky, Uranus, who, according to Greek mythology, was the great-grandfather of Ares (Mars), grandfather of Zeus (Jupiter) and father of Cronus (Saturn)."
  },
  Neptune: {
    name: "Neptune",
    diameter: "49,244 km",
    gravity: "11.15 m/s²",
    orbit: "165 years",
    distance: "4.5 billion km",
    description: "The eighth and farthest-known Solar planet from the Sun. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet."
  }
};