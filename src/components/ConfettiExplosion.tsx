import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  rotation: number;
  velocityX: number;
  velocityY: number;
  size: number;
}

const ConfettiExplosion = () => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const colors = [
      "hsl(var(--celebration-pink))",
      "hsl(var(--celebration-rose))",
      "hsl(var(--celebration-purple))",
      "hsl(var(--celebration-gold))",
      "hsl(340 82% 52%)",
      "hsl(280 65% 60%)",
      "hsl(45 100% 51%)",
    ];

    const pieces: ConfettiPiece[] = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: 50,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      velocityX: (Math.random() - 0.5) * 100,
      velocityY: -(Math.random() * 50 + 30),
      size: Math.random() * 10 + 5,
    }));

    setConfetti(pieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti-burst"
          style={{
            left: `${piece.left}%`,
            top: "50%",
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            borderRadius: Math.random() > 0.5 ? "50%" : "0%",
            animation: `confetti-burst 3s ease-out forwards`,
            "--velocity-x": `${piece.velocityX}vw`,
            "--velocity-y": `${piece.velocityY}vh`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default ConfettiExplosion;
