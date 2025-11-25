import { useEffect, useState } from "react";
import { toZonedTime } from "date-fns-tz";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";
import { Sparkles } from "lucide-react";

const IRELAND_TIMEZONE = "Europe/Dublin";
const TARGET_DATE = new Date("2026-02-19T00:00:00"); // Feb 19, 2026 12:00 AM

const CountdownTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      // Get current time in Ireland timezone
      const nowInIreland = toZonedTime(new Date(), IRELAND_TIMEZONE);
      const targetInIreland = toZonedTime(TARGET_DATE, IRELAND_TIMEZONE);

      const days = Math.max(0, differenceInDays(targetInIreland, nowInIreland));
      const hours = Math.max(0, differenceInHours(targetInIreland, nowInIreland) % 24);
      const minutes = Math.max(0, differenceInMinutes(targetInIreland, nowInIreland) % 60);
      const seconds = Math.max(0, differenceInSeconds(targetInIreland, nowInIreland) % 60);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
      <div className="text-center space-y-8 max-w-4xl w-full font-poppins">

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto">
          <div className="bg-card/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-primary/20 shadow-lg hover:scale-105 transition-transform">
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-celebration-dark-red">{timeRemaining.days}</div>
            <div className="text-xs sm:text-sm md:text-base text-muted-foreground mt-2 font-medium">
              Days
            </div>
          </div>

          <div className="bg-card/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-accent/20 shadow-lg hover:scale-105 transition-transform">
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-celebration-dark-red">{timeRemaining.hours}</div>
            <div className="text-xs sm:text-sm md:text-base text-muted-foreground mt-2 font-medium">
              Hours
            </div>
          </div>

          <div className="bg-card/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-secondary/20 shadow-lg hover:scale-105 transition-transform">
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-celebration-dark-red">{timeRemaining.minutes}</div>
            <div className="text-xs sm:text-sm md:text-base text-muted-foreground mt-2 font-medium">
              Minutes
            </div>
          </div>

          <div className="bg-card/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-primary/20 shadow-lg hover:scale-105 transition-transform">
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-celebration-dark-red">{timeRemaining.seconds}</div>
            <div className="text-xs sm:text-sm md:text-base text-muted-foreground mt-2 font-medium">
              Seconds
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-yellow-300 animate-pulse" />
            <p className="text-3xl sm:text-4xl md:text-5xl font-pacifico text-white drop-shadow-[0_2px_8px_rgba(255,215,0,0.8)]">
              Hi Ajitha,
            </p>
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-yellow-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          <p className="text-2xl sm:text-3xl md:text-4xl text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Advanced Happy Birthday Wishes
          </p>
          
          <div className="flex items-center justify-center gap-2 text-xl sm:text-2xl text-yellow-200 font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span>February 19, 2026</span>
            <Sparkles className="w-5 h-5 text-yellow-300" />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center text-3xl sm:text-4xl">
          🎊 🎁 🎉 🎂 🎈
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
