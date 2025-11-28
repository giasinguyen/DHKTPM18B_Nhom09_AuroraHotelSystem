import { type ReactNode } from "react";

interface VideoBannerProps {
  children: ReactNode;
  videoSrc?: string;
  overlayOpacity?: number;
  className?: string;
}

const defaultVideoSrc = "/src/assets/videos/aurora_hotel_2025-11-28_v1.mp4";

/**
 * Layout component with video background
 * Có thể dùng cho auth pages, landing pages, hoặc bất kỳ trang nào cần background video
 */
export default function VideoBanner({
  children,
  videoSrc = defaultVideoSrc,
  overlayOpacity = 0.3,
  className = "",
}: VideoBannerProps) {
  return (
    <div className={`min-h-screen relative overflow-hidden ${className}`}>
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better readability */}
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center pt-32 pb-12 px-4">
        {children}
      </div>
    </div>
  );
}

