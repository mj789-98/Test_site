import { useState, useEffect } from "react";

const LoadingState = ({ isLoading, message = "Loading..." }) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm flex items-center justify-center z-20">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4 mx-auto"></div>
        <p className="text-white text-lg font-medium">
          {message}
          {dots}
        </p>
      </div>
    </div>
  );
};

export default LoadingState;
