import { useEffect, useState } from "react";

interface FireworkParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  velocity: number;
  delay: number;
}

interface Firework {
  id: number;
  x: number;
  y: number;
  particles: FireworkParticle[];
}

const Fireworks = () => {
  const [fireworks, setFireworks] = useState<Firework[]>([]);

  useEffect(() => {
    const colors = [
      "hsl(var(--celebration-pink))",
      "hsl(var(--celebration-rose))",
      "hsl(var(--celebration-purple))",
      "hsl(var(--celebration-gold))",
      "hsl(340 82% 52%)",
      "hsl(280 65% 60%)",
      "hsl(45 100% 51%)",
      "hsl(190 95% 60%)",
    ];

    const createFirework = (id: number, delay: number): Firework => {
      const x = Math.random() * 80 + 10; // 10-90% of screen width
      const y = Math.random() * 40 + 10; // 10-50% of screen height
      
      const particleCount = 30;
      const particles: FireworkParticle[] = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x,
        y,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: (360 / particleCount) * i,
        velocity: Math.random() * 3 + 2,
        delay,
      }));

      return { id, x, y, particles };
    };

    // Create multiple fireworks with staggered delays
    const fireworksArray: Firework[] = Array.from({ length: 6 }, (_, i) => 
      createFirework(i, i * 0.8)
    );

    setFireworks(fireworksArray);

    // Restart fireworks every 6 seconds
    const interval = setInterval(() => {
      const newFireworks: Firework[] = Array.from({ length: 6 }, (_, i) => 
        createFirework(i + Date.now(), i * 0.8)
      );
      setFireworks(newFireworks);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-30">
      {fireworks.map((firework) =>
        firework.particles.map((particle) => (
          <div
            key={`${firework.id}-${particle.id}`}
            className="absolute w-2 h-2 rounded-full animate-firework"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              backgroundColor: particle.color,
              boxShadow: `0 0 10px ${particle.color}`,
              animationDelay: `${particle.delay}s`,
              "--angle": `${particle.angle}deg`,
              "--velocity": particle.velocity,
            } as React.CSSProperties}
          />
        ))
      )}
    </div>
  );
};

export default Fireworks;
