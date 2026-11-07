import React from 'react';

/**
 * REFERENCE 01 — 3D CHECKERBOARD BACKGROUND
 * Exact Source: Uiverse.io by escannord
 * Features:
 * - 45deg double linear-gradient checkerboard (60px x 60px)
 * - perspective: 1000px, transform-style: preserve-3d
 * - ::before pseudo-element with rotateX(80deg) and 500px dark depth shadows
 * Adapted with subtle opacity so portfolio typography remains crystal clear.
 */
export const CheckerboardBackground: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
      aria-hidden="true"
    >
      {/* Exact escannord 3D checkerboard container */}
      <div className="escannord-checkerboard absolute inset-0 opacity-80" />

      {/* Atmospheric dark gradient overlays to guarantee perfect reading contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08080b]/90 via-transparent to-[#08080b]/95 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};
