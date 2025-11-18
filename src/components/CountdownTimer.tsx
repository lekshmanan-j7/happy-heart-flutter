import { useEffect, useState } from "react";
import { toZonedTime } from "date-fns-tz";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";
import { Sparkles } from "lucide-react";

const IRELAND_TIMEZONE = "Europe/Dublin";
const TARGET_DATE = new Date("2026-02-19T00:01:00");

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

      const days = differenceInDays(targetInIreland, nowInIreland);
      const hours = differenceInHours(targetInIreland, nowInIreland) % 24;
      const minutes = differenceInMinutes(targetInIreland, nowInIreland) % 60;
      const seconds = differenceInSeconds(targetInIreland, nowInIreland) % 60;

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-celebration-rose/20 to-background flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-4xl w-full">
        <div className="space-y-4 animate-bounce-in">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-celebration-gold via-celebration-pink to-celebration-purple bg-clip-text text-transparent">
            Birthday Countdown
          </h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto">
          <div className="bg-card/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-primary/20 shadow-lg hover:scale-105 transition-transform">
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-br from-celebration-pink to-celebration-purple bg-clip-text text-transparent">{timeRemaining.days}</div>
            <div className="text-xs sm:text-sm md:text-base text-muted-foreground mt-2 font-medium">
              Days
            </div>
          </div>

          <div className="bg-card/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-accent/20 shadow-lg hover:scale-105 transition-transform">
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-br from-celebration-purple to-celebration-gold bg-clip-text text-transparent">{timeRemaining.hours}</div>
            <div className="text-xs sm:text-sm md:text-base text-muted-foreground mt-2 font-medium">
              Hours
            </div>
          </div>

          <div className="bg-card/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-secondary/20 shadow-lg hover:scale-105 transition-transform">
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-br from-celebration-gold to-celebration-pink bg-clip-text text-transparent">{timeRemaining.minutes}</div>
            <div className="text-xs sm:text-sm md:text-base text-muted-foreground mt-2 font-medium">
              Minutes
            </div>
          </div>

          <div className="bg-card/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-primary/20 shadow-lg hover:scale-105 transition-transform">
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-br from-celebration-pink to-celebration-purple bg-clip-text text-transparent">{timeRemaining.seconds}</div>
            <div className="text-xs sm:text-sm md:text-base text-muted-foreground mt-2 font-medium">
              Seconds
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xl sm:text-2xl text-muted-foreground font-medium">
            Advanced Happy Birthday Wishes
          </p>
          
          <div className="flex items-center justify-center gap-2 text-lg sm:text-xl text-celebration-gold font-semibold">
            <Sparkles className="w-5 h-5 text-celebration-gold" />
            <span>February 19, 2026</span>
            <Sparkles className="w-5 h-5 text-celebration-gold" />
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
