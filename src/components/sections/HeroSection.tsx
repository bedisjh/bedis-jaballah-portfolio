import React from 'react';
import { ArrowDown, FolderGit2, Send, Orbit } from 'lucide-react';
import { PERSONAL_BRAND } from '../../data/portfolio-data';
import { AnimatedCube } from '../uiverse/AnimatedCube';
import { ThreeDTiltCard } from '../uiverse/ThreeDTiltCard';


interface HeroSectionProps {
  onExplore3D?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore3D }) => {


  return (
    <section 
      id="home" 
      className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto">
        
        {/* Two-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Small introduction kicker */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-purple-400">
                {PERSONAL_BRAND.heroIntroduction}
              </span>
              <span className="w-8 h-px bg-purple-500/50" />
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.05]">
              {PERSONAL_BRAND.name}
            </h1>

            {/* Professional Positioning */}
            <div className="mt-3 flex flex-col gap-1">
              <p className="text-xs sm:text-sm font-mono tracking-wider text-purple-300 font-semibold flex items-center gap-2 flex-wrap">
                <span>🎮 Gamer at heart</span>
                <span className="text-zinc-600">|</span>
                <span>Content Creator</span>
                <span className="text-zinc-600">|</span>
                <span>Multi-talented</span>
              </p>
              <p className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <span>New TikTok:</span>
                <a
                  href="https://tiktok.com/@bedis.cm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-colors font-semibold hover:underline"
                >
                  @bedis.cm
                </a>
              </p>
            </div>

            {/* Personal Statement */}
            <blockquote className="mt-6 border-l-2 border-purple-500/60 pl-4 py-1 text-lg sm:text-xl font-medium text-zinc-100 italic">
              "{PERSONAL_BRAND.statement}"
            </blockquote>

            {/* Short Description */}
            <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed">
              {PERSONAL_BRAND.bio}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <a
                href="#projects"
                className="uiverse-3d-button px-6 py-3 text-sm font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-xl flex items-center gap-2 group cursor-pointer"
              >
                <FolderGit2 className="w-4 h-4 text-purple-200 group-hover:scale-110 transition-transform" />
                <span>Explore My Work</span>
              </a>

              {onExplore3D && (
                <button
                  type="button"
                  onClick={onExplore3D}
                  className="uiverse-3d-button px-5 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl flex items-center gap-2 group cursor-pointer"
                >
                  <Orbit className="w-4 h-4 text-cyan-300 group-hover:rotate-45 transition-transform" />
                  <span>3D Universe</span>
                </button>
              )}

              <a
                href="#contact"
                className="px-5 py-3 text-sm font-semibold text-zinc-200 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 rounded-xl transition-all duration-200 flex items-center gap-2 hover:border-purple-500/50"
              >
                <Send className="w-4 h-4 text-zinc-400" />
                <span>Let's Connect</span>
              </a>
            </div>


            {/* Authenticity indicator */}
            <div className="mt-8 flex items-center gap-3 text-xs text-zinc-400 font-mono">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500/80" />
              <span>Based at ISET Djerba, Tunisia · Available for Innovation Projects</span>
            </div>
          </div>

          {/* Right Column: Reference 02 Animated 3D Cube */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Background subtle radial aura */}
            <div className="absolute inset-0 bg-radial-gradient from-purple-500/10 via-transparent to-transparent blur-2xl pointer-events-none" />

            <div className="w-full flex items-center justify-center py-6">
              <AnimatedCube />
            </div>

            {/* Interactive hint */}
            <p className="text-[11px] font-mono text-zinc-400 text-center max-w-xs">
              Interactive 3D Matrix · Click cube to toggle rotational dynamics
            </p>
          </div>

        </div>

        {/* Full-width 3D KPI strip below hero split */}
        <div className="mt-16 pt-8 border-t border-zinc-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
          <ThreeDTiltCard maxTilt={8} scale={1.03} className="p-4 rounded-xl bg-[#0f0f16]/90 border border-zinc-800 hover:border-purple-500/50 shadow-lg">
            <div className="uiverse-3d-layer-1">
              <span className="block text-[11px] font-mono text-purple-400 uppercase tracking-wider">Institution</span>
              <span className="mt-1 block text-sm font-bold text-white">ISET Djerba</span>
              <span className="text-[11px] text-zinc-400">Higher Institute of Tech Studies</span>
            </div>
          </ThreeDTiltCard>

          <ThreeDTiltCard maxTilt={8} scale={1.03} className="p-4 rounded-xl bg-[#0f0f16]/90 border border-zinc-800 hover:border-purple-500/50 shadow-lg">
            <div className="uiverse-3d-layer-1">
              <span className="block text-[11px] font-mono text-purple-400 uppercase tracking-wider">Startup Focus</span>
              <span className="mt-1 block text-sm font-bold text-white">Innova Live</span>
              <span className="text-[11px] text-zinc-400">Cultural Tourism Concept</span>
            </div>
          </ThreeDTiltCard>

          <ThreeDTiltCard maxTilt={8} scale={1.03} className="p-4 rounded-xl bg-[#0f0f16]/90 border border-zinc-800 hover:border-purple-500/50 shadow-lg">
            <div className="uiverse-3d-layer-1">
              <span className="block text-[11px] font-mono text-purple-400 uppercase tracking-wider">Creative Leadership</span>
              <span className="mt-1 block text-sm font-bold text-white">Media Manager</span>
              <span className="text-[11px] text-zinc-400">Enactus ISET Djerba</span>
            </div>
          </ThreeDTiltCard>

          <ThreeDTiltCard maxTilt={8} scale={1.03} className="p-4 rounded-xl bg-[#0f0f16]/90 border border-zinc-800 hover:border-purple-500/50 shadow-lg">
            <div className="uiverse-3d-layer-1">
              <span className="block text-[11px] font-mono text-purple-400 uppercase tracking-wider">Creator Pacing</span>
              <span className="mt-1 block text-sm font-bold text-white">CapCut & Canva</span>
              <span className="text-[11px] text-zinc-400">Mastered Editing Tooling</span>
            </div>
          </ThreeDTiltCard>
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <div className="relative mt-12 flex justify-center z-10 pointer-events-none">
        <a
          href="#about"
          className="pointer-events-auto flex flex-col items-center gap-2 text-zinc-400 hover:text-purple-400 transition-colors group"
          aria-label="Scroll to About Me section"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 group-hover:text-purple-300">SCROLL DOWN</span>
          <ArrowDown className="w-4 h-4 text-zinc-400 animate-bounce group-hover:text-purple-400" />
        </a>
      </div>
    </section>
  );
};
