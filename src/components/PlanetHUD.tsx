import { useSolarSystemStore, PLANET_INFO } from '../store';
import './PlanetHUD.css';

// Map planet names to filenames in public/assets/
const TEXTURE_MAP: Record<string, string> = {
  Mercury: '8k_mercury.jpg',
  Venus:   '8k_venus_surface.jpg',
  Earth:   '8k_earth_daymap.jpg',
  Mars:    '8k_mars.jpg',
  Jupiter: '8k_jupiter.jpg',
  Saturn:  '8k_saturn.jpg',
  Uranus:  '2k_uranus.jpg',
  Neptune: '2k_neptune.jpg',
  Sun:     '8k_sun.jpg',
  Moon:    '8k_moon.jpg' // Matches the file needed for the Moon
};

export function PlanetHUD() {
  const { selectedPlanet, selectPlanet } = useSolarSystemStore();

  // If nothing is selected, don't render anything
  if (!selectedPlanet) return null;

  // Get data from the central store
  const planetData = PLANET_INFO[selectedPlanet];
  
  // Safety check: if data is missing, don't crash
  if (!planetData) return null;

  // Get the correct texture file, default to Earth if missing
  const textureFile = TEXTURE_MAP[selectedPlanet] || '8k_earth_daymap.jpg';

  return (
    <div className="planet-hud">
      {/* Close Button */}
      <button
        className="hud-close"
        onClick={() => selectPlanet(null)}
        title="Close (ESC)"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Header with Round Icon & Name */}
      <div className="hud-header">
        <div className="planet-name-display">
          <div className="planet-icon-container">
            <img 
              src={`/assets/${textureFile}`} 
              alt={planetData.name} 
              className="planet-icon-image"
              onError={(e) => {
                // If image fails to load, hide it gracefully
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          <h2>{planetData.name}</h2>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="hud-content">
        
        {/* Section 1: Physical Props */}
        <div className="hud-section">
          <h3>Physical Properties</h3>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">Diameter</div>
              <div className="info-value">{planetData.diameter}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Surface Gravity</div>
              <div className="info-value">{planetData.gravity}</div>
            </div>
          </div>
        </div>

        {/* Section 2: Orbital Data */}
        <div className="hud-section">
          <h3>Orbital Data</h3>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">Orbital Period</div>
              <div className="info-value">{planetData.orbit}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Distance</div>
              <div className="info-value">{planetData.distance}</div>
            </div>
          </div>
        </div>

        {/* Section 3: Description (Replaces old 'Special Features') */}
        <div className="hud-section">
          <h3>Description</h3>
          <div className="info-note">
            {planetData.description || "No description available."}
          </div>
        </div>

      </div>
    </div>
  );
}