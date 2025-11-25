import { useEffect, useState } from "react";
import { toZonedTime } from "date-fns-tz";

const IRELAND_TIMEZONE = "Europe/Dublin";

const DayNightBackground = () => {
  const [isNight, setIsNight] = useState(true);
  const [stars, setStars] = useState<
    Array<{
      id: number;
      left: string;
      top: string;
      size: number;
      delay: number;
    }>
  >([]);
  const [clouds, setClouds] = useState<
    Array<{
      id: number;
      top: string;
      size: number;
      duration: number;
      delay: number;
    }>
  >([]);
  const [birds, setBirds] = useState<
    Array<{
      id: number;
      top: string;
      duration: number;
      delay: number;
      size: number;
    }>
  >([]);
  const [butterflies, setButterflies] = useState<
    Array<{
      id: number;
      top: string;
      duration: number;
      delay: number;
      color: { primary: string; secondary: string; accent: string };
    }>
  >([]);

  useEffect(() => {
    // Check if it's night time in Ireland (6 PM - 6 AM)
    const checkTimeOfDay = () => {
      const nowInIreland = toZonedTime(new Date(), IRELAND_TIMEZONE);
      const hour = nowInIreland.getHours();

      // Night is from 18:00 (6 PM) to 06:00 (6 AM)
      const isNightTime = hour >= 17 || hour < 8;
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

    // Generate clouds for day mode
    const generatedClouds = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 60 + 10}%`,
      size: Math.random() * 40 + 60,
      duration: Math.random() * 30 + 40,
      delay: Math.random() * 10,
    }));

    setClouds(generatedClouds);

    // Generate birds for day mode
    const generatedBirds = Array.from({ length: 4 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 40 + 15}%`,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 8,
      size: Math.random() * 0.3 + 0.8,
    }));

    setBirds(generatedBirds);

    // Generate butterflies for day mode
    const butterflyColors = [
      { primary: "#FF6B9D", secondary: "#FFB6C1", accent: "#FF1493" }, // Pink
      { primary: "#87CEEB", secondary: "#B0E0E6", accent: "#4169E1" }, // Blue
      { primary: "#FFD700", secondary: "#FFA500", accent: "#FF8C00" }, // Orange/Yellow
      { primary: "#9370DB", secondary: "#DDA0DD", accent: "#8B008B" }, // Purple
      { primary: "#FF69B4", secondary: "#FFB6C1", accent: "#C71585" }, // Hot Pink
    ];

    const generatedButterflies = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 60 + 15}%`,
      duration: Math.random() * 8 + 12,
      delay: Math.random() * 10,
      color:
        butterflyColors[Math.floor(Math.random() * butterflyColors.length)],
    }));

    setButterflies(generatedButterflies);

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
          background:
            "linear-gradient(to bottom, #0a1128 0%, #1a2744 50%, #2d3e5f 100%)",
        }}
      />

      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          !isNight ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(to bottom, #87CEEB 0%, #B0E0E6 40%, #FFF8DC 100%)",
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
                animation: `twinkle ${
                  2 + Math.random() * 2
                }s ease-in-out infinite`,
                animationDelay: `${star.delay}s`,
                boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
              }}
            />
          ))}
          {butterflies.map((butterfly) => (
            <div
              key={`butterfly-${butterfly.id}`}
              className="absolute"
              style={{
                top: butterfly.top,
                left: "-5%",
                animation: `fly-butterfly ${butterfly.duration}s ease-in-out infinite`,
                animationDelay: `${butterfly.delay}s`,
              }}
            >
              <svg
                width="50"
                height="40"
                viewBox="0 0 50 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                }}
              >
                {/* Left upper wing */}
                <ellipse
                  cx="15"
                  cy="15"
                  rx="12"
                  ry="15"
                  fill={butterfly.color.primary}
                  style={{
                    transformOrigin: "15px 15px",
                    animation: `flutter-left ${
                      0.15 + Math.random() * 0.1
                    }s ease-in-out infinite`,
                  }}
                />
                <ellipse
                  cx="15"
                  cy="15"
                  rx="8"
                  ry="11"
                  fill={butterfly.color.secondary}
                  style={{
                    transformOrigin: "15px 15px",
                    animation: `flutter-left ${
                      0.15 + Math.random() * 0.1
                    }s ease-in-out infinite`,
                  }}
                />
                {/* Wing pattern spots - left */}
                <circle
                  cx="13"
                  cy="12"
                  r="2.5"
                  fill={butterfly.color.accent}
                  opacity="0.8"
                />
                <circle
                  cx="18"
                  cy="17"
                  r="2"
                  fill={butterfly.color.accent}
                  opacity="0.8"
                />

                {/* Right upper wing */}
                <ellipse
                  cx="35"
                  cy="15"
                  rx="12"
                  ry="15"
                  fill={butterfly.color.primary}
                  style={{
                    transformOrigin: "35px 15px",
                    animation: `flutter-right ${
                      0.15 + Math.random() * 0.1
                    }s ease-in-out infinite`,
                  }}
                />
                <ellipse
                  cx="35"
                  cy="15"
                  rx="8"
                  ry="11"
                  fill={butterfly.color.secondary}
                  style={{
                    transformOrigin: "35px 15px",
                    animation: `flutter-right ${
                      0.15 + Math.random() * 0.1
                    }s ease-in-out infinite`,
                  }}
                />
                {/* Wing pattern spots - right */}
                <circle
                  cx="37"
                  cy="12"
                  r="2.5"
                  fill={butterfly.color.accent}
                  opacity="0.8"
                />
                <circle
                  cx="32"
                  cy="17"
                  r="2"
                  fill={butterfly.color.accent}
                  opacity="0.8"
                />

                {/* Left lower wing */}
                <ellipse
                  cx="18"
                  cy="28"
                  rx="8"
                  ry="10"
                  fill={butterfly.color.primary}
                  style={{
                    transformOrigin: "18px 28px",
                    animation: `flutter-left ${
                      0.15 + Math.random() * 0.1
                    }s ease-in-out infinite`,
                  }}
                />
                <ellipse
                  cx="18"
                  cy="28"
                  rx="5"
                  ry="7"
                  fill={butterfly.color.secondary}
                  style={{
                    transformOrigin: "18px 28px",
                    animation: `flutter-left ${
                      0.15 + Math.random() * 0.1
                    }s ease-in-out infinite`,
                  }}
                />

                {/* Right lower wing */}
                <ellipse
                  cx="32"
                  cy="28"
                  rx="8"
                  ry="10"
                  fill={butterfly.color.primary}
                  style={{
                    transformOrigin: "32px 28px",
                    animation: `flutter-right ${
                      0.15 + Math.random() * 0.1
                    }s ease-in-out infinite`,
                  }}
                />
                <ellipse
                  cx="32"
                  cy="28"
                  rx="5"
                  ry="7"
                  fill={butterfly.color.secondary}
                  style={{
                    transformOrigin: "32px 28px",
                    animation: `flutter-right ${
                      0.15 + Math.random() * 0.1
                    }s ease-in-out infinite`,
                  }}
                />

                {/* Body */}
                <ellipse cx="25" cy="20" rx="2.5" ry="12" fill="#2C1810" />

                {/* Antennae */}
                <path
                  d="M 25 10 Q 23 5, 22 3"
                  stroke="#2C1810"
                  strokeWidth="1"
                  fill="none"
                />
                <circle cx="22" cy="3" r="1" fill="#2C1810" />
                <path
                  d="M 25 10 Q 27 5, 28 3"
                  stroke="#2C1810"
                  strokeWidth="1"
                  fill="none"
                />
                <circle cx="28" cy="3" r="1" fill="#2C1810" />
              </svg>
            </div>
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
              background:
                "radial-gradient(circle at 35% 35%, #ffffff 0%, #f0f0f0 30%, #d0d0d0 60%, #a0a0a0 100%)",
              boxShadow: `
                0 0 40px rgba(255, 255, 255, 0.9),
                0 0 80px rgba(255, 255, 255, 0.6),
                inset -10px -10px 20px rgba(0, 0, 0, 0.2),
                inset 5px 5px 15px rgba(255, 255, 255, 0.3)
              `,
            }}
          >
            {/* Moon craters */}
            <div
              style={{
                position: "absolute",
                top: "20%",
                left: "30%",
                width: "2px",
                height: "2px",
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
                width: "3px",
                height: "3px",
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
                width: "2px",
                height: "2px",
                borderRadius: "50%",
                background: "rgba(0, 0, 0, 0.08)",
                boxShadow: "inset 1px 1px 3px rgba(0, 0, 0, 0.2)",
              }}
            />
          </div>
        </>
      )}

      {/* Day mode - Sun and Clouds */}
      {!isNight && (
        <>
          {/* Sun */}
          <div
            className="absolute"
            style={{
              right: "15%",
              top: "10%",
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 40% 40%, #fff9e6 0%, #ffeb3b 40%, #ffc107 70%, #ff9800 100%)",
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
                  background:
                    "linear-gradient(to right, rgba(255, 235, 59, 0.8), transparent)",
                  transformOrigin: "left center",
                  transform: `rotate(${i * 30}deg) translateY(-50%)`,
                  opacity: 0.6,
                }}
              />
            ))}
          </div>

          {/* Floating Clouds */}
          {clouds.map((cloud) => (
            <div
              key={`cloud-${cloud.id}`}
              className="absolute"
              style={{
                top: cloud.top,
                left: "-20%",
                width: `${cloud.size}px`,
                height: `${cloud.size * 0.6}px`,
                animation: `float-cloud ${cloud.duration}s linear infinite`,
                animationDelay: `${cloud.delay}s`,
                opacity: 0.8,
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                {/* Cloud main body */}
                <div
                  style={{
                    position: "absolute",
                    width: "50%",
                    height: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "50%",
                    top: "30%",
                    left: "25%",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    width: "40%",
                    height: "40%",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "50%",
                    top: "20%",
                    left: "10%",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    width: "45%",
                    height: "45%",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "50%",
                    top: "25%",
                    left: "45%",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    width: "35%",
                    height: "35%",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "50%",
                    top: "15%",
                    left: "60%",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </div>
            </div>
          ))}

          {/* Butterflies */}
          {butterflies.map((butterfly) => (
            <div
              key={`butterfly-${butterfly.id}`}
              className="absolute"
              style={{
                top: butterfly.top,
                left: "-5%",
                animation: `fly-butterfly ${butterfly.duration}s ease-in-out infinite`,
                animationDelay: `${butterfly.delay}s`,
              }}
            >
              <svg
                width="50"
                height="40"
                viewBox="0 0 50 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                }}
              >
                {/* Left upper wing */}
                <ellipse
                  cx="15"
                  cy="15"
                  rx="12"
                  ry="15"
                  fill={butterfly.color.primary}
                  style={{
                    transformOrigin: "15px 15px",
                    animation: `flutter-left ${
                      0.15 + Math.random() * 0.1
                    }s ease-in-out infinite`,
                  }}
                />
                <ellipse
                  cx="15"
                  cy="15"
                  rx="8"
                  ry="11"
                  fill={butterfly.color.secondary}
                  style={{
                    transformOrigin: "15px 15px",
                    animation: `flutter-left ${
                      0.15 + Math.random() * 0.1
                    }s ease-in-out infinite`,
                  }}
                />
                {/* Wing pattern spots - left */}
                <circle
                  cx="13"
                  cy="12"
                  r="2.5"
                  fill={butterfly.color.accent}
                  opacity="0.8"
                />
                <circle
                  cx="18"
                  cy="17"
                  r="2"
                  fill={butterfly.color.accent}
                  opacity="0.8"
                />

                {/* Right upper wing */}
                <ellipse
                  cx="35"
                  cy="15"
                  rx="12"
                  ry="15"
                  fill={butterfly.color.primary}
                  style={{
                    transformOrigin: "35px 15px",
                    animation: `flutter-right ${
                      0.15 + Math.random() * 0.1
                    }s ease-in-out infinite`,
                  }}
                />
                <ellipse
                  cx="35"
                  cy="15"
                  rx="8"
                  ry="11"
                  fill={butterfly.color.secondary}
                  style={{
                    transformOrigin: "35px 15px",
                    animation: `flutter-right ${
                      0.15 + Math.random() * 0.1
                    }s ease-in-out infinite`,
                  }}
                />
                {/* Wing pattern spots - right */}
                <circle
                  cx="37"
                  cy="12"
                  r="2.5"
                  fill={butterfly.color.accent}
                  opacity="0.8"
                />
                <circle
                  cx="32"
                  cy="17"
                  r="2"
                  fill={butterfly.color.accent}
                  opacity="0.8"
                />

                {/* Left lower wing */}
                <ellipse
                  cx="18"
                  cy="28"
                  rx="8"
                  ry="10"
                  fill={butterfly.color.primary}
                  style={{
                    transformOrigin: "18px 28px",
                    animation: `flutter-left ${
                      0.15 + Math.random() * 0.1
                    }s ease-in-out infinite`,
                  }}
                />
                <ellipse
                  cx="18"
                  cy="28"
                  rx="5"
                  ry="7"
                  fill={butterfly.color.secondary}
                  style={{
                    transformOrigin: "18px 28px",
                    animation: `flutter-left ${
                      0.15 + Math.random() * 0.1
                    }s ease-in-out infinite`,
                  }}
                />

                {/* Right lower wing */}
                <ellipse
                  cx="32"
                  cy="28"
                  rx="8"
                  ry="10"
                  fill={butterfly.color.primary}
                  style={{
                    transformOrigin: "32px 28px",
                    animation: `flutter-right ${
                      0.15 + Math.random() * 0.1
                    }s ease-in-out infinite`,
                  }}
                />
                <ellipse
                  cx="32"
                  cy="28"
                  rx="5"
                  ry="7"
                  fill={butterfly.color.secondary}
                  style={{
                    transformOrigin: "32px 28px",
                    animation: `flutter-right ${
                      0.15 + Math.random() * 0.1
                    }s ease-in-out infinite`,
                  }}
                />

                {/* Body */}
                <ellipse cx="25" cy="20" rx="2.5" ry="12" fill="#2C1810" />

                {/* Antennae */}
                <path
                  d="M 25 10 Q 23 5, 22 3"
                  stroke="#2C1810"
                  strokeWidth="1"
                  fill="none"
                />
                <circle cx="22" cy="3" r="1" fill="#2C1810" />
                <path
                  d="M 25 10 Q 27 5, 28 3"
                  stroke="#2C1810"
                  strokeWidth="1"
                  fill="none"
                />
                <circle cx="28" cy="3" r="1" fill="#2C1810" />
              </svg>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default DayNightBackground;
