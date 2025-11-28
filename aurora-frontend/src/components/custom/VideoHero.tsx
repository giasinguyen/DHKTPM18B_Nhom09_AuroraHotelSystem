import { type ReactNode } from "react";

interface VideoHeroProps {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  videoSrc?: string;
  overlayOpacity?: number;
  className?: string;
  height?: "full" | "hero"; // "full" for full screen, "hero" for h-96
}

const defaultVideoSrc = "/src/assets/videos/aurora_hotel_2025-11-28_v1.mp4";

/**
 * Hero section component with video background
 * Có thể dùng cho hero section hoặc full page wrapper
 */
export default function VideoHero({
  title,
  subtitle,
  children,
  videoSrc = defaultVideoSrc,
  overlayOpacity = 0.3,
  className = "",
  height = "hero", // default là hero section
}: VideoHeroProps) {
  const heightClass = height === "full" ? "min-h-screen" : "h-96";
  const containerClass = height === "full" 
    ? "min-h-screen flex items-center justify-center pt-32 pb-12 px-4"
    : "h-full flex items-center justify-center";

  return (
    <section className={`relative ${heightClass} ${className}`}>
      <div className="absolute inset-0 z-0">
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      </div>
      <div className={`relative z-10 ${containerClass}`}>
        {children ? (
          children
        ) : (
          <div className="text-center text-white px-4">
            {title && <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>}
            {subtitle && <p className="text-xl opacity-90">{subtitle}</p>}
          </div>
        )}
      </div>
    </section>
  );
}
