import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { shouldShowBackToTop } from '../../utils/portfolio-logic';

interface BackToTopProps {
  heroElementId?: string;
  threshold?: number;
}

export const BackToTop: React.FC<BackToTopProps> = ({
  heroElementId = 'home',
  threshold = 400,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      let scrollThreshold = threshold;
      const heroElement = document.getElementById(heroElementId);
      if (heroElement) {
        // Trigger as soon as the user scrolls past the hero section
        scrollThreshold = Math.max(heroElement.offsetHeight - 120, 250);
      }

      setIsVisible(shouldShowBackToTop(window.scrollY, scrollThreshold));
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [heroElementId, threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTop();
    }
  };

  return (
    <div
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 transition-all duration-300 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
          : 'opacity-0 translate-y-4 pointer-events-none scale-90'
      }`}
    >
      <div className="relative group flex items-center justify-end">
        {/* Hover text label / tooltip */}
        <span
          className={`absolute right-full mr-3 px-2.5 py-1 text-xs font-mono font-medium text-zinc-300 bg-[#12121c]/90 border border-purple-500/30 rounded-md backdrop-blur-md whitespace-nowrap shadow-lg transition-all duration-200 pointer-events-none ${
            isHovered
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-2'
          }`}
        >
          Back to top
        </span>

        {/* Back to top button */}
        <button
          type="button"
          onClick={scrollToTop}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          aria-label="Back to top"
          title="Scroll back to top"
          className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-[#0e0e16]/90 hover:bg-purple-950/60 border border-purple-500/40 hover:border-purple-400 text-white shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_15px_rgba(168,85,247,0.25)] hover:shadow-[0_4px_25px_rgba(0,0,0,0.8),0_0_25px_rgba(168,85,247,0.5)] backdrop-blur-md transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
        >
          {/* Subtle perimeter glow accent */}
          <span className="absolute inset-0 rounded-xl bg-gradient-to-tr from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none" />

          {/* Icon with hover bounce */}
          <ArrowUp className="w-5 h-5 text-purple-300 group-hover:text-white transition-colors duration-200 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
};
