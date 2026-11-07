import React from 'react';

interface StarPreloaderProps {
  isLoading: boolean;
}

/**
 * REFERENCE 05 — ANIMATED STAR PRELOADER
 * Exact Source: Uiverse.io by narmesh_sah
 * Markup:
 * <div class="preloader">
 *   <div class="crack crack1"></div>
 *   <div class="crack crack2"></div>
 *   <div class="crack crack3"></div>
 *   <div class="crack crack4"></div>
 *   <div class="crack crack5"></div>
 * </div>
 * Uses the exact polygon clip-path for 5 rotating star cracks.
 */
export const StarPreloader: React.FC<StarPreloaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#08080b] transition-opacity duration-700 ease-out"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      {/* Exact narmesh_sah Preloader Container */}
      <div className="star-preloader-container">
        <div className="star-crack crack1" />
        <div className="star-crack crack2" />
        <div className="star-crack crack3" />
        <div className="star-crack crack4" />
        <div className="star-crack crack5" />
      </div>

      {/* Typography & Brand status */}
      <div className="mt-8 flex flex-col items-center text-center">
        <span className="font-mono text-xs tracking-[0.25em] uppercase text-purple-300 font-bold">
          BEDIS JABALLAH
        </span>
        <span className="text-[11px] font-mono tracking-wider text-zinc-500 mt-1">
          INITIALIZING DIGITAL PORTFOLIO
        </span>
      </div>
    </div>
  );
};
