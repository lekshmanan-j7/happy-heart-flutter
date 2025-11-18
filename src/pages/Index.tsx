import { useEffect, useState } from "react";
import { toZonedTime } from "date-fns-tz";
import { isAfter, isEqual } from "date-fns";
import FloatingHearts from "@/components/FloatingHearts";
import BirthdayMusic from "@/components/BirthdayMusic";
import BirthdayImages from "@/components/BirthdayImages";
import CelebrationBubbles from "@/components/CelebrationBubbles";
import ConfettiExplosion from "@/components/ConfettiExplosion";
import Fireworks from "@/components/Fireworks";
import CursorSparkles from "@/components/CursorSparkles";
import CountdownTimer from "@/components/CountdownTimer";
import { Sparkles } from "lucide-react";

const IRELAND_TIMEZONE = "Europe/Dublin";
const TARGET_DATE = new Date("2026-02-19T00:01:00");

const Index = () => {
  const [showContent, setShowContent] = useState(false);
  const [isBirthdayTime, setIsBirthdayTime] = useState(false);

  useEffect(() => {
    const checkBirthdayTime = () => {
      // Get current time in Ireland timezone
      const nowInIreland = toZonedTime(new Date(), IRELAND_TIMEZONE);
      const targetInIreland = toZonedTime(TARGET_DATE, IRELAND_TIMEZONE);

      // Check if current time is on or after Feb 19, 2026 12:01 AM Ireland time
      setIsBirthdayTime(isAfter(nowInIreland, targetInIreland) || isEqual(nowInIreland, targetInIreland));
    };

    checkBirthdayTime();
    const interval = setInterval(checkBirthdayTime, 1000);

    setTimeout(() => setShowContent(true), 100);

    return () => clearInterval(interval);
  }, []);


  // Show countdown if it's not birthday time yet
  if (!isBirthdayTime) {
    return <CountdownTimer />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-celebration-rose/20 to-background overflow-hidden">
      <Fireworks />
      <FloatingHearts />
      <CelebrationBubbles />
      <ConfettiExplosion />
      <CursorSparkles />
      <BirthdayMusic />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-8 sm:py-12">
        <div
          className={`text-center space-y-6 sm:space-y-8 w-full max-w-4xl transition-all duration-1000 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="space-y-4 sm:space-y-6 animate-bounce-in">
            <div className="flex justify-center">
              <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-primary animate-pulse-glow" />
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-celebration-pink via-celebration-purple to-celebration-gold bg-clip-text text-transparent px-4">
              Happy Birthday!
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium px-4">
              Wishing you a day filled with love and joy! 🎉
            </p>
          </div>

          <div
            className={`transition-all duration-1000 delay-300 ${
              showContent ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <BirthdayImages />
          </div>

          <div
            className={`transition-all duration-1000 delay-500 ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed px-4">
              May this special day bring you endless happiness, wonderful surprises,
              and cherished memories that last a lifetime! 🎂🎈
            </p>
          </div>

          <div
            className={`flex flex-wrap gap-3 sm:gap-4 justify-center text-3xl sm:text-4xl transition-all duration-1000 delay-700 px-4 ${
              showContent ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
          >
            🎊 🎁 🎉 🎂 🎈
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
