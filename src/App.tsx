import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber'; // <-- Importamos el Canvas normal
import { SolarSystem } from './components/SolarSystem'; 
import { TimeControls } from './components/TimeControls';
import { PlanetHUD } from './components/PlanetHUD';
import { PlanetNavigation } from './components/PlanetNavigation';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Hyperspace } from './components/Hyperspace';
import { useSolarSystemStore } from './store';
import './App.css';

function App() {
  const hasEntered = useSolarSystemStore((s) => s.hasEntered);
  const viewerName = useSolarSystemStore((s) => s.viewerName);
  const [isTraveling, setIsTraveling] = useState(false);
  const [showSolarSystem, setShowSolarSystem] = useState(false);
  const [showWelcomeQuote, setShowWelcomeQuote] = useState(false);

  // ... (Tu useEffect de los temporizadores se queda exactamente igual) ...
  useEffect(() => {
    if (hasEntered) {
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
    }
  }, [hasEntered]);

  if (!hasEntered) return <WelcomeScreen />;

  return (
    <div className="app">
      {isTraveling && (
        <div className={`galaxy-transition ${showSolarSystem ? 'fade-out' : ''}`}>
          <Hyperspace />
          <div className="travel-copy" role="status">
            <p className="travel-eyebrow">SECUENCIA DE VIAJE ACTIVADA</p>
            <h2>Preparando el viaje, {viewerName}</h2>
            
            <div className="travel-progress" aria-hidden="true"><span /></div>
          </div>
        </div>
      )}

      {showSolarSystem && (
        <div 
          className="solar-system-container fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
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
            <h1>SISTEMA SOLAR</h1>
            
          </header>

          {/* 🚀 AQUÍ ESTÁ EL CANVAS */}
          <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
            <Canvas
              dpr={[1, 2]}
              camera={{ position: [0, 185, 340], fov: 60, far: 20000 }}
            >
              <Suspense fallback={null}>
                <SolarSystem />
              </Suspense>
            </Canvas>
          </div>
          
          <PlanetNavigation />
          <TimeControls />
          <PlanetHUD />
        </div>
      )}
    </div>
  );
}

export default App;