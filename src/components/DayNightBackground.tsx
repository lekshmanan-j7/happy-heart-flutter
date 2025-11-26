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
      landingPosition?: number;
    }>
  >([]);
  const [flowers, setFlowers] = useState<
    Array<{
      id: number;
      left: string;
      color: { petal: string; center: string };
      size: number;
    }>
  >([]);
  const [bees, setBees] = useState<
    Array<{
      id: number;
      startX: number;
      endX: number;
      duration: number;
      delay: number;
    }>
  >([]);

  useEffect(() => {
    // Check if it's night time in Ireland (6 PM - 6 AM)
    const checkTimeOfDay = () => {
      const nowInIreland = toZonedTime(new Date(), IRELAND_TIMEZONE);
      const hour = nowInIreland.getHours();

      // Night is from 18:00 (6 PM) to 06:00 (6 AM)
      const isNightTime = hour >= 12 || hour < 8;
      setIsNight(isNightTime);
    };

    checkTimeOfDay();
    const interval = setInterval(checkTimeOfDay, 60000); // Check every minute

    // Generate random stars for night mode
    const generatedStars = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 0.5,
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
      landingPosition: i % 2 === 0 ? Math.random() * 80 + 10 : undefined,
    }));

    setButterflies(generatedButterflies);

    // Generate flowers for day mode
    const flowerColors = [
      { petal: "#FF69B4", center: "#FFD700" }, // Pink with yellow
      { petal: "#FF1493", center: "#FFA500" }, // Deep pink with orange
      { petal: "#9370DB", center: "#FFD700" }, // Purple with yellow
      { petal: "#FF6347", center: "#FFD700" }, // Tomato red with yellow
      { petal: "#87CEEB", center: "#FFA500" }, // Sky blue with orange
      { petal: "#FF69B4", center: "#FF8C00" }, // Hot pink with dark orange
    ];

    const generatedFlowers = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 90 + 5}%`,
      color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
      size: Math.random() * 15 + 25,
    }));

    setFlowers(generatedFlowers);

    // Generate bees for day mode
    const generatedBees = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      startX: Math.random() * 80 + 10,
      endX: Math.random() * 80 + 10,
      duration: Math.random() * 4 + 6,
      delay: Math.random() * 5,
    }));

    setBees(generatedBees);

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
            "linear-gradient(to bottom, #0a1128 0%, #1a2234ff 50%, #2c3443ff 100%)",
        }}
      />

      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          !isNight ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(to bottom, #598fe6ff 0%, #43939eff 40%, #f1c277ff 100%)",
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

          {/* Bees */}
          {bees.map((bee) => (
            <div
              key={`bee-${bee.id}`}
              className="absolute"
              style={{
                bottom: "40px",
                left: `${bee.startX}%`,
                animation: `buzz-between-flowers ${bee.duration}s ease-in-out infinite`,
                animationDelay: `${bee.delay}s`,
                zIndex: 2,
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))",
                }}
              >
                {/* Wings - left */}
                <ellipse
                  cx="8"
                  cy="10"
                  rx="6"
                  ry="8"
                  fill="rgba(173, 216, 230, 0.6)"
                  style={{
                    transformOrigin: "8px 10px",
                    animation: "flap-bee-wing 0.1s ease-in-out infinite",
                  }}
                />
                {/* Wings - right */}
                <ellipse
                  cx="16"
                  cy="10"
                  rx="6"
                  ry="8"
                  fill="rgba(173, 216, 230, 0.6)"
                  style={{
                    transformOrigin: "16px 10px",
                    animation: "flap-bee-wing 0.1s ease-in-out infinite",
                    animationDelay: "0.05s",
                  }}
                />
                {/* Body */}
                <ellipse cx="12" cy="12" rx="4" ry="6" fill="#FFD700" />
                {/* Stripes */}
                <rect x="10" y="10" width="4" height="1.5" fill="#000" rx="0.5" />
                <rect x="10" y="13" width="4" height="1.5" fill="#000" rx="0.5" />
                {/* Head */}
                <circle cx="12" cy="7" r="2.5" fill="#000" />
                {/* Eyes */}
                <circle cx="11" cy="6.5" r="0.5" fill="#FFF" />
                <circle cx="13" cy="6.5" r="0.5" fill="#FFF" />
                {/* Antennae */}
                <path
                  d="M 11 5 Q 10 3, 9.5 2"
                  stroke="#000"
                  strokeWidth="0.5"
                  fill="none"
                />
                <circle cx="9.5" cy="2" r="0.5" fill="#000" />
                <path
                  d="M 13 5 Q 14 3, 14.5 2"
                  stroke="#000"
                  strokeWidth="0.5"
                  fill="none"
                />
                <circle cx="14.5" cy="2" r="0.5" fill="#000" />
                {/* Stinger */}
                <path
                  d="M 12 17 L 12 19"
                  stroke="#000"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          ))}

          {/* Flowers at bottom */}
          {flowers.map((flower) => (
            <div
              key={`flower-${flower.id}`}
              className="absolute"
              style={{
                bottom: "0px",
                left: flower.left,
                zIndex: 1,
              }}
            >
              <svg
                width={flower.size}
                height={flower.size * 1.5}
                viewBox="0 0 40 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Stem */}
                <line
                  x1="20"
                  y1="30"
                  x2="20"
                  y2="60"
                  stroke="#4CAF50"
                  strokeWidth="2"
                />
                {/* Leaves */}
                <ellipse
                  cx="15"
                  cy="45"
                  rx="5"
                  ry="8"
                  fill="#66BB6A"
                  transform="rotate(-30 15 45)"
                />
                <ellipse
                  cx="25"
                  cy="40"
                  rx="5"
                  ry="8"
                  fill="#66BB6A"
                  transform="rotate(30 25 40)"
                />
                {/* Flower petals */}
                {[0, 72, 144, 216, 288].map((angle, i) => (
                  <ellipse
                    key={i}
                    cx="20"
                    cy="15"
                    rx="8"
                    ry="12"
                    fill={flower.color.petal}
                    transform={`rotate(${angle} 20 15)`}
                    style={{
                      transformOrigin: "20px 15px",
                    }}
                  />
                ))}
                {/* Flower center */}
                <circle cx="20" cy="15" r="5" fill={flower.color.center} />
                <circle
                  cx="20"
                  cy="15"
                  r="3"
                  fill={flower.color.center}
                  opacity="0.6"
                />
              </svg>
            </div>
          ))}

          {/* Butterflies */}
          {butterflies.map((butterfly) => (
            <div
              key={`butterfly-${butterfly.id}`}
              className="absolute"
              style={{
                top: butterfly.landingPosition ? "auto" : butterfly.top,
                bottom: butterfly.landingPosition ? "20px" : "auto",
                left: butterfly.landingPosition
                  ? `${butterfly.landingPosition}%`
                  : "-5%",
                animation: butterfly.landingPosition
                  ? `land-on-flower ${butterfly.duration}s ease-in-out infinite`
                  : `fly-butterfly ${butterfly.duration}s ease-in-out infinite`,
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
