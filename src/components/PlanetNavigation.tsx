import { useSolarSystemStore } from '../store';
import './PlanetNavigation.css';

const PLANET_LIST = [
  'Sun',
  'Mercury',
  'Venus',
  'Earth',
  'Moon',
  'Mars',
  'Jupiter',
  'Saturn',
  'Uranus',
  'Neptune'
];

export function PlanetNavigation() {
  const { selectedPlanet, selectPlanet } = useSolarSystemStore();

  return (
    <div className="planet-nav">
      <div className="nav-header">LOCATIONS</div>
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