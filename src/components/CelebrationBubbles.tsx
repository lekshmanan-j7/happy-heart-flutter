import { useEffect, useState } from "react";

interface BubbleProps {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

const CelebrationBubbles = () => {
  const [bubbles, setBubbles] = useState<BubbleProps[]>([]);

  useEffect(() => {
    const emojis = ["🎉", "🎊", "🎈", "🎁", "🎂", "🍰", "🥳", "✨", "🌟", "💖"];

    const newBubbles: BubbleProps[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 30 + 20,
      duration: Math.random() * 4 + 6,
      delay: Math.random() * 5,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));

    setBubbles(newBubbles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute animate-float-up"
          style={{
            left: `${bubble.left}%`,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
            fontSize: `${bubble.size}px`,
          }}
        >
          {bubble.emoji}
        </div>
      ))}
    </div>
  );
};

export default CelebrationBubbles;
