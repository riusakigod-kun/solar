import { useSolarSystemStore } from '../store';
import './PlanetNavigation.css';

const PLANET_LIST = [
  'Sol',
  'Mercurio',
  'Venus',
  'Tierra',
  'Luna',
  'Marte',
  'Jupiter',
  'Saturn',
  'Uranus',
  'Neptune'
];

export function PlanetNavigation() {
  const { selectedPlanet, selectPlanet } = useSolarSystemStore();

  return (
    <div className="planet-nav">
      <h2 className="nav-title">Navegación Planetaria</h2>
      <div className="nav-list">
        {PLANET_LIST.map((planet) => (
          <button
            key={planet}
            className={`nav-item ${selectedPlanet === planet ? 'active' : ''}`}
            onClick={() => selectPlanet(planet)}
          >
            <span className="nav-dot"></span>
            {planet}
          </button>
        ))}
      </div>
    </div>
  );
}