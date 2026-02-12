import { Suspense } from 'react';
import { SolarSystem } from './components/SolarSystem';
import { TimeControls } from './components/TimeControls';
import { PlanetHUD } from './components/PlanetHUD';
import { PlanetNavigation } from './components/PlanetNavigation'; // <--- IMPORT THIS
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>SOLAR SYSTEM</h1>
        <p>Real-Time Interactive Simulation</p>
      </header>

      <Suspense fallback={<div className="loading-screen">Loading Assets...</div>}>
        <SolarSystem />
      </Suspense>
      
      {/* NEW NAVIGATION MENU */}
      <PlanetNavigation />

      <TimeControls />
      <PlanetHUD />
    </div>
  );
}

export default App;