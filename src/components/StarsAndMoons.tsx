import { useEffect, useState } from "react";

const StarsAndMoons = () => {
  const [stars, setStars] = useState<
    Array<{
      id: number;
      left: string;
      top: string;
      size: number;
      delay: number;
    }>
  >([]);
  const [moons, setMoons] = useState<
    Array<{ id: number; left: string; top: string; delay: number }>
  >([]);

  useEffect(() => {
    // Generate random stars
    const generatedStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
    }));

    // Generate one bright moon
    const generatedMoons = [
      {
        id: 0,
        left: "85%",
        top: "10%",
        delay: 0,
      },
    ];

    setStars(generatedStars);
    setMoons(generatedMoons);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `twinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Moons */}
      {moons.map((moon) => (
        <div
          key={`moon-${moon.id}`}
          className="absolute text-6xl"
          style={{
            left: moon.left,
            top: moon.top,
            animation: "moon-glow 2s ease-in-out infinite",
            animationDelay: `${moon.delay}s`,
            filter:
              "brightness(1.5) drop-shadow(0 0 30px rgba(255, 255, 255, 0.9))",
          }}
        >
          🌕
        </div>
      ))}
    </div>
  );
};

export default StarsAndMoons;
