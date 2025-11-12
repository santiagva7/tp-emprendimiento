import { useEffect, useState } from "react";

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-primary via-secondary to-primary transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="animate-in fade-in zoom-in duration-700">
        <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-sm shadow-2xl">
          <img src="/logo.jpeg" alt="COBET" className="h-24 w-24 object-contain" />
        </div>
        <h1 className="mb-3 text-5xl font-bold text-white tracking-tight">COBET</h1>
        <p className="text-xl text-white/90 font-light tracking-wide">
          Gestión empresarial inteligente
        </p>
      </div>
      <div className="absolute bottom-10">
        <div className="h-1 w-16 bg-white/30 rounded-full overflow-hidden">
          <div className="h-full w-full bg-white animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
