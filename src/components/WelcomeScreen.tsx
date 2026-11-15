import { useState } from 'react';
import { useSolarSystemStore } from '../store';
import './WelcomeScreen.css';

export function WelcomeScreen() {
  const [name, setName] = useState('');
  const setViewerName = useSolarSystemStore((s) => s.setViewerName);
  const enterExperience = useSolarSystemStore((s) => s.enterExperience);

  const handleConfirm = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setViewerName(trimmed);
    enterExperience();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleConfirm();
  };

  return (
    <div className="welcome-screen">
      <div className="welcome-card">
        <h1 className="welcome-title">Bienvenida</h1>
        <p className="welcome-subtitle">
          Antes de comenzar este viaje por el sistema solar,
          ¿me dices tu nombre?
        </p>

        <input
          className="welcome-input"
          type="text"
          placeholder="Escribe tu nombre..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          maxLength={30}
        />

        <button
          className="welcome-button"
          onClick={handleConfirm}
          disabled={!name.trim()}
        >
          Confirmar y entrar
        </button>
      </div>
    </div>
  );
}