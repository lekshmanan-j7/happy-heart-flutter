import { useEffect, useState } from "react";

const StarsAndMoons = () => {
  const [stars, setStars] = useState<Array<{ id: number; left: string; top: string; size: number; delay: number }>>([]);
  const [moons, setMoons] = useState<Array<{ id: number; left: string; top: string; delay: number }>>([]);

  useEffect(() => {
    // Generate random stars
    const generatedStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
    }));

    // Generate random moons
    const generatedMoons = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 4,
    }));

    setStars(generatedStars);
    setMoons(generatedMoons);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}

      {/* Moons */}
      {moons.map((moon) => (
        <div
          key={`moon-${moon.id}`}
          className="absolute text-2xl opacity-60 animate-pulse"
          style={{
            left: moon.left,
            top: moon.top,
            animationDelay: `${moon.delay}s`,
            animationDuration: "4s",
          }}
        >
          🌙
        </div>
      ))}
    </div>
  );
};

export default StarsAndMoons;
