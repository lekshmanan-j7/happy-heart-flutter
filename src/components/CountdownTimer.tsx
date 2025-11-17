import { useEffect, useState } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";
import { Sparkles, Calendar } from "lucide-react";

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
      const nowInIreland = new Date(
        formatInTimeZone(new Date(), IRELAND_TIMEZONE, "yyyy-MM-dd'T'HH:mm:ss")
      );
      
      const targetInIreland = new Date(
        formatInTimeZone(TARGET_DATE, IRELAND_TIMEZONE, "yyyy-MM-dd'T'HH:mm:ss")
      );

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
          <div className="flex justify-center">
            <Calendar className="w-16 h-16 text-primary animate-pulse-glow" />
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-celebration-pink via-celebration-purple to-celebration-gold bg-clip-text text-transparent">
            Birthday Countdown
          </h1>
          
          <p className="text-xl sm:text-2xl text-muted-foreground font-medium">
            Something special is coming...
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-primary/20 shadow-lg hover:scale-105 transition-transform">
            <div className="text-5xl sm:text-6xl font-bold bg-gradient-to-br from-celebration-pink to-celebration-purple bg-clip-text text-transparent">
              {timeRemaining.days}
            </div>
            <div className="text-sm sm:text-base text-muted-foreground mt-2 font-medium">
              Days
            </div>
          </div>

          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-accent/20 shadow-lg hover:scale-105 transition-transform">
            <div className="text-5xl sm:text-6xl font-bold bg-gradient-to-br from-celebration-purple to-celebration-gold bg-clip-text text-transparent">
              {timeRemaining.hours}
            </div>
            <div className="text-sm sm:text-base text-muted-foreground mt-2 font-medium">
              Hours
            </div>
          </div>

          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-secondary/20 shadow-lg hover:scale-105 transition-transform">
            <div className="text-5xl sm:text-6xl font-bold bg-gradient-to-br from-celebration-gold to-celebration-pink bg-clip-text text-transparent">
              {timeRemaining.minutes}
            </div>
            <div className="text-sm sm:text-base text-muted-foreground mt-2 font-medium">
              Minutes
            </div>
          </div>

          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-primary/20 shadow-lg hover:scale-105 transition-transform">
            <div className="text-5xl sm:text-6xl font-bold bg-gradient-to-br from-celebration-pink to-celebration-purple bg-clip-text text-transparent">
              {timeRemaining.seconds}
            </div>
            <div className="text-sm sm:text-base text-muted-foreground mt-2 font-medium">
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
          
          <p className="text-sm text-muted-foreground">
            Ireland Time (Europe/Dublin)
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center text-3xl sm:text-4xl">
          🎊 🎁 🎉 🎂 🎈
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
