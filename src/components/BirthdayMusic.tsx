import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/button";
import  bday  from "../assets/bday.mp3"

const BirthdayMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current && hasInteracted) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log("Autoplay prevented:", error);
        }
      }
    };

    playAudio();
  }, [hasInteracted]);

  const togglePlay = async () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log("Play failed:", error);
        }
      }
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        onClick={togglePlay}
        variant="secondary"
        size="icon"
        className="rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </Button>
      <audio
        ref={audioRef}
        loop
        src={bday}
      />
    </div>
  );
};

export default BirthdayMusic;
