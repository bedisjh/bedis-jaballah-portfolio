import React, { useState } from 'react';

/**
 * REFERENCE 02 — ANIMATED 3D CUBE
 * Exact Source: Uiverse.io by chase2k25
 * Features:
 * - .stage with stageJump 4s cubic-bezier
 * - .cube with autoRotate 8s linear
 * - 6 faces: CREATE, INNOVATE, DESIGN, BUILD, EXPLORE, TECHNOLOGY
 * - .panel-num & .panel-label
 * - .pop-burst with comic flash word
 * - .shadow-floor with shadowPulse
 * - Black, white, electric purple, and blue palette
 */
export const AnimatedCube: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isExploded, setIsExploded] = useState(false);

  const faces = [
    { num: '01', label: 'CREATE', class: 'f-1' },
    { num: '02', label: 'INNOVATE', class: 'f-2' },
    { num: '03', label: 'DESIGN', class: 'f-3' },
    { num: '04', label: 'BUILD', class: 'f-4' },
    { num: '05', label: 'EXPLORE', class: 'f-5' },
    { num: '06', label: 'TECH', class: 'f-6' },
  ];

  return (
    <div 
      className="flex flex-col items-center justify-center p-2 select-none relative"
      aria-label="3D Core Disciplines Cube: Create, Innovate, Design, Build, Explore, Technology"
    >
      {/* Container from chase2k25 with Apple-style slow-motion exploded view transition */}
      <div 
        className={`chase-cube-container cursor-pointer group ${isPaused ? 'is-paused' : ''} ${isExploded ? 'is-exploded' : ''}`}
        onClick={() => setIsExploded(!isExploded)}
        title={isExploded ? 'Click to smoothly reassemble cube' : 'Click for Apple-style slow-motion exploded view'}
      >
        {/* Comic flash word */}
        <div className="pop-burst" aria-hidden="true">
          <div className="pop-word">
            BEDIS
          </div>
        </div>

        {/* Stage with jump and scale */}
        <div className="chase-cube-stage">
          {/* Cube with full 360 rotation */}
          <div className="chase-cube">
            {/* Apple Keynote Style Internal Tech Showcase Core */}
            <div className="cube-tech-core" aria-hidden="true">
              <div className="tech-core-chip">
                <div className="tech-core-die" />
              </div>
              <span className="text-[7px] font-mono tracking-widest text-cyan-300 mt-1 uppercase font-bold">
                CORE
              </span>
            </div>

            {faces.map((f) => (
              <div key={f.num} className={`chase-face ${f.class}`}>
                <span className="panel-num">{f.num}</span>
                <span className="panel-label">{f.label}</span>
              </div>
            ))}
          </div>

          {/* Floor shadow synced with jump */}
          <div className="shadow-floor" />
        </div>
      </div>

      {/* Control hint bar */}
      <div className="mt-8 text-[11px] font-mono tracking-wider text-zinc-400 flex items-center gap-2 flex-wrap justify-center">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <button 
          onClick={(e) => { e.stopPropagation(); setIsExploded(!isExploded); }}
          className={`px-2 py-0.5 rounded border transition-all text-[10px] font-bold uppercase tracking-wider ${
            isExploded 
              ? 'bg-cyan-950/60 text-cyan-300 border-cyan-500/60 shadow-[0_0_12px_rgba(6,182,212,0.3)]' 
              : 'bg-zinc-900/80 text-purple-300 border-purple-500/40 hover:border-purple-400'
          }`}
        >
          {isExploded ? 'ASSEMBLE' : 'EXPLODED VIEW'}
        </button>
        <span className="text-zinc-600">·</span>
        <button 
          onClick={(e) => { e.stopPropagation(); setIsPaused(!isPaused); }}
          className="text-zinc-400 hover:text-white transition-colors focus:outline-none uppercase text-[10px] font-semibold"
        >
          {isPaused ? 'RESUME' : 'PAUSE'}
        </button>
      </div>
    </div>
  );
};
