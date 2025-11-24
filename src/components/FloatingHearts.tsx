import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface HeartProps {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<HeartProps[]>([]);

  useEffect(() => {
    const colors = [
      "hsl(var(--celebration-pink))",
      "hsl(var(--celebration-rose))",
      "hsl(var(--celebration-purple))",
      "hsl(var(--celebration-gold))",
    ];

    const newHearts: HeartProps[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 20 + 20,
      duration: Math.random() * 5 + 8,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-up"
          style={{
            left: `${heart.left}%`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          <Heart
            fill={heart.color}
            color={heart.color}
            size={heart.size}
            className="drop-shadow-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
