import { useState, useEffect } from "react";
import cakeImage from "@/assets/birthday-cake.png";
import balloonsImage from "@/assets/balloons.png";
import giftsImage from "@/assets/gifts.png";

const BirthdayImages = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [cakeImage, balloonsImage, giftsImage];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative h-64 md:h-80 overflow-hidden rounded-3xl shadow-2xl">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Birthday celebration ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
              index === currentIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`}
          />
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? "bg-primary w-8"
                : "bg-muted hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BirthdayImages;
