import { useEffect, useState } from "react";

export default function PersistentTimer({duration}:{duration:number}) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    // Get or set the start time in localStorage
    let storedStart = localStorage.getItem("timerStart");
    let startTime: number;

    if (storedStart) {
      startTime = parseInt(storedStart);
    } else {
      startTime = Date.now();
      localStorage.setItem("timerStart", startTime.toString());
    }

    const timer = setInterval(() => {
      const now = Date.now();
      const secondsPassed = Math.floor((now - startTime) / 1000);
      if (secondsPassed >= duration * 60) {
        setElapsed(duration * 60); 
        clearInterval(timer);
        localStorage.removeItem("timerStart");
        return;
      }
      setElapsed(secondsPassed);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60).toString().padStart(2, "0");
    const secs = (s % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className=" text-lg border-1 border-red-600 bg-black text-white w-20 flex justify-center m-auto rounded-xl">
      {formatTime(elapsed)}
    </div>
  );
}
