
import './Rosas.css'; // Asegúrate de tener un archivo CSS para los estilos de las rosas

// src/components/Rosas.tsx

export function Rosas() {
  // Generamos 20 pétalos con posiciones y velocidades aleatorias
  const petals = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 5 + 5}s`, // Entre 5 y 10 segundos de caída
    animationDelay: `${Math.random() * 5}s`, // Retraso inicial para que no caigan todos juntos
    size: `${Math.random() * 10 + 15}px`, // Tamaños entre 15px y 25px
    sway: `${Math.random() * 100 - 50}px`, // Hacia dónde se balancea
  }));

  return (
    <div className="rosas-container">
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="petalo"
          style={{
            left: petal.left,
            animationDuration: petal.animationDuration,
            animationDelay: petal.animationDelay,
            width: petal.size,
            height: petal.size,
            // Usamos una variable CSS para el balanceo
            ['--sway' as string]: petal.sway, 
          }}
        />
      ))}
    </div>
  );
}