import { lazy, useEffect, useState } from 'react';
import { Canvas } from '@react-three/offscreen';
import { TimeControls } from './components/TimeControls';
import { PlanetHUD } from './components/PlanetHUD';
import { PlanetNavigation } from './components/PlanetNavigation';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Hyperspace } from './components/Hyperspace';
import { useSolarSystemStore } from './store';
import './App.css';

const worker = new Worker(new URL('./worker.tsx', import.meta.url), { type: 'module' });
const SolarSystemFallback = lazy(() =>
  import('./components/SolarSystem').then((module) => ({ default: module.SolarSystem })),
);

function App() {
  const hasEntered = useSolarSystemStore((state) => state.hasEntered);
  const viewerName = useSolarSystemStore((state) => state.viewerName);
  const [isTraveling, setIsTraveling] = useState(false);
  const [showSolarSystem, setShowSolarSystem] = useState(false);
  const [showWelcomeQuote, setShowWelcomeQuote] = useState(false);

  useEffect(() => {
    if (!hasEntered) return;

    setIsTraveling(true);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const solarSystemDelay = reducedMotion ? 500 : 6400;
    const quoteDuration = reducedMotion ? 5000 : 9000;
    const solarSystemTimer = setTimeout(() => {
      setShowSolarSystem(true);
      setShowWelcomeQuote(true);
    }, solarSystemDelay);
    const transitionTimer = setTimeout(() => {
      setIsTraveling(false);
    }, reducedMotion ? 1700 : 8000);
    const quoteTimer = setTimeout(() => {
      setShowWelcomeQuote(false);
    }, solarSystemDelay + quoteDuration);

    return () => {
      clearTimeout(solarSystemTimer);
      clearTimeout(transitionTimer);
      clearTimeout(quoteTimer);
    };
  }, [hasEntered]);

  if (!hasEntered) {
    return <WelcomeScreen />;
  }

  return (
    <div className="app">
      {isTraveling && (
        <div className={`galaxy-transition ${showSolarSystem ? 'fade-out' : ''}`}>
          <Hyperspace />
          <div className="travel-copy" role="status">
            <p className="travel-eyebrow">SECUENCIA DE VIAJE ACTIVADA</p>
            <h2>Preparando el viaje, {viewerName}</h2>
            <p className="travel-caption">Aproximándonos a una galaxia espiral</p>
            <div className="travel-progress" aria-hidden="true">
              <span />
            </div>
          </div>
        </div>
      )}

      {showSolarSystem && (
        <div
          className="solar-system-container fade-in"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              useSolarSystemStore.getState().resetCamera();
            }
          }}
        >
          {showWelcomeQuote && (
            <div className="welcome-quote" role="status" aria-live="polite">
              <span className="welcome-quote-dust" aria-hidden="true" />
              <p>
                Entre millones de estrellas y planetas en movimiento, tú eres mi única
                constante, <span className="welcome-quote-name">{viewerName}</span>.
              </p>
            </div>
          )}
          <header className="app-header">
            <h1>SOLAR SYSTEM</h1>
            <p>Real-Time Interactive Simulation</p>
          </header>

          <Canvas
            worker={worker}
            fallback={<SolarSystemFallback />}
            camera={{ position: [0, 50, 150], fov: 45 }}
            shadows
          />

          <PlanetNavigation />
          <TimeControls />
          <PlanetHUD />
        </div>
      )}
    </div>
  );
}

export default App;
