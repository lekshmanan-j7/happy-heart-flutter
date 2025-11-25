import { useEffect, useState } from "react";
import { toZonedTime } from "date-fns-tz";

const IRELAND_TIMEZONE = "Europe/Dublin";

const DayNightBackground = () => {
  const [isNight, setIsNight] = useState(true);
  const [stars, setStars] = useState<Array<{ id: number; left: string; top: string; size: number; delay: number }>>([]);

  useEffect(() => {
    // Check if it's night time in Ireland (6 PM - 6 AM)
    const checkTimeOfDay = () => {
      const nowInIreland = toZonedTime(new Date(), IRELAND_TIMEZONE);
      const hour = nowInIreland.getHours();
      
      // Night is from 18:00 (6 PM) to 06:00 (6 AM)
      const isNightTime = hour >= 18 || hour < 6;
      setIsNight(isNightTime);
    };

    checkTimeOfDay();
    const interval = setInterval(checkTimeOfDay, 60000); // Check every minute

    // Generate random stars for night mode
    const generatedStars = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 3,
    }));

    setStars(generatedStars);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none transition-all duration-1000">
      {/* Background gradient */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isNight ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "linear-gradient(to bottom, #0a1128 0%, #1a2744 50%, #2d3e5f 100%)",
        }}
      />
      
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          !isNight ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "linear-gradient(to bottom, #87CEEB 0%, #B0E0E6 40%, #FFF8DC 100%)",
        }}
      />

      {/* Night mode - Stars and Moon */}
      {isNight && (
        <>
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
                boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
              }}
            />
          ))}

          {/* Realistic Moon */}
          <div
            className="absolute"
            style={{
              right: "10%",
              top: "8%",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, #ffffff 0%, #f0f0f0 30%, #d0d0d0 60%, #a0a0a0 100%)",
              boxShadow: `
                0 0 40px rgba(255, 255, 255, 0.9),
                0 0 80px rgba(255, 255, 255, 0.6),
                inset -10px -10px 20px rgba(0, 0, 0, 0.2),
                inset 5px 5px 15px rgba(255, 255, 255, 0.3)
              `,
              animation: "moon-glow 3s ease-in-out infinite",
            }}
          >
            {/* Moon craters */}
            <div
              style={{
                position: "absolute",
                top: "20%",
                left: "30%",
                width: "15px",
                height: "15px",
                borderRadius: "50%",
                background: "rgba(0, 0, 0, 0.1)",
                boxShadow: "inset 2px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "60%",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: "rgba(0, 0, 0, 0.08)",
                boxShadow: "inset 2px 2px 5px rgba(0, 0, 0, 0.2)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "65%",
                left: "25%",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "rgba(0, 0, 0, 0.08)",
                boxShadow: "inset 1px 1px 3px rgba(0, 0, 0, 0.2)",
              }}
            />
          </div>
        </>
      )}

      {/* Day mode - Sun */}
      {!isNight && (
        <div
          className="absolute"
          style={{
            right: "15%",
            top: "10%",
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            background: "radial-gradient(circle at 40% 40%, #fff9e6 0%, #ffeb3b 40%, #ffc107 70%, #ff9800 100%)",
            boxShadow: `
              0 0 60px rgba(255, 235, 59, 0.8),
              0 0 100px rgba(255, 235, 59, 0.5),
              0 0 140px rgba(255, 193, 7, 0.3)
            `,
            animation: "sun-pulse 4s ease-in-out infinite",
          }}
        >
          {/* Sun rays */}
          {[...Array(12)].map((_, i) => (
            <div
              key={`ray-${i}`}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "80px",
                height: "3px",
                background: "linear-gradient(to right, rgba(255, 235, 59, 0.8), transparent)",
                transformOrigin: "left center",
                transform: `rotate(${i * 30}deg) translateY(-50%)`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DayNightBackground;
