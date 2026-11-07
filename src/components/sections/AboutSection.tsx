import React from 'react';
import { Cpu, Palette, Wrench, Lightbulb, TrendingUp, Layers, MapPin, GraduationCap } from 'lucide-react';
import { PERSONAL_BRAND } from '../../data/portfolio-data';
import { ThreeDTiltCard } from '../uiverse/ThreeDTiltCard';
import portraitImg from '../../assets/images/bedis_jaballah_portrait.jpg';


export const AboutSection: React.FC = () => {
  const pillarIcons: Record<string, React.ReactNode> = {
    Technology: <Cpu className="w-5 h-5 text-purple-400" />,
    Creativity: <Palette className="w-5 h-5 text-fuchsia-400" />,
    'Problem Solving': <Wrench className="w-5 h-5 text-blue-400" />,
    Innovation: <Lightbulb className="w-5 h-5 text-amber-400" />,
    Entrepreneurship: <TrendingUp className="w-5 h-5 text-emerald-400" />,
  };

  return (
    <section id="about" className="py-24 relative z-10 border-t border-zinc-800/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-purple-400">
              01. PHILOSOPHY & IDENTITY
            </span>
            <span className="w-12 h-px bg-purple-500/40" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            About Me
          </h2>
          <p className="mt-2 text-zinc-400 max-w-2xl text-base">
            Bridging technical execution with creative storytelling and entrepreneurial curiosity.
          </p>
        </div>

        {/* 2-Column Split: Editorial Typographic Insignia & Detailed Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Authentic 3D Monogram Insignia Box */}
          <ThreeDTiltCard 
            maxTilt={12} 
            scale={1.02} 
            className="lg:col-span-5 bg-gradient-to-br from-[#12121a] to-[#0c0c10] border border-purple-500/30 rounded-2xl p-8 relative overflow-hidden shadow-2xl hover:shadow-[0_15px_40px_rgba(168,85,247,0.25)] transition-shadow"
          >
            {/* Ambient subtle glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* Top metadata tags */}
              <div className="flex items-center justify-between pb-6 border-b border-zinc-800/80 uiverse-3d-layer-1">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <MapPin className="w-3.5 h-3.5 text-purple-400" />
                  <span>Djerba, Tunisia</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                  <span>ISET Djerba</span>
                </div>
              </div>

              {/* Authentic 3D Portrait & Identity Frame */}
              <div className="py-8 my-auto text-center flex flex-col items-center uiverse-3d-layer-2">
                <div className="relative mb-5 group">
                  {/* Subtle 3D ambient aura matching purple/blue lighting */}
                  <div className="absolute -inset-1.5 bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 rounded-2xl blur-md opacity-40 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Portrait Container */}
                  <div className="relative w-48 h-56 sm:w-56 sm:h-64 rounded-2xl overflow-hidden border-2 border-purple-500/40 bg-zinc-900 shadow-2xl">
                    <img 
                      src={portraitImg} 
                      alt="Bedis Jaballah" 
                      className="w-full h-full object-cover object-center filter contrast-[1.03] brightness-[0.98] transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Directional lighting overlay: top-left soft specular sheen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/20 via-transparent to-white/10 pointer-events-none" />
                  </div>

                  {/* 3D Elevated Badge */}
                  <div className="absolute -bottom-2.5 -right-2.5 px-2.5 py-0.5 rounded-md bg-purple-950/90 border border-purple-500/60 text-[10px] font-mono font-bold tracking-wider text-purple-300 shadow-lg backdrop-blur-sm uiverse-3d-layer-3">
                    IDENTITY
                  </div>
                </div>

                <h3 className="text-2xl font-extrabold text-white tracking-tight">
                  Bedis Jaballah
                </h3>
                <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mt-1">
                  Creative Technologist · Builder
                </p>
              </div>

              {/* Core Quote Box with 3D Depth */}
              <div className="pt-6 border-t border-zinc-800/80 bg-zinc-950/60 rounded-xl p-4 border border-zinc-800/60 shadow-inner uiverse-3d-layer-1">
                <p className="text-sm text-zinc-300 italic leading-relaxed">
                  "I don't just follow ideas. I imagine them, develop them, and turn them into reality."
                </p>
                <span className="block mt-2 text-right text-[11px] font-mono text-purple-400">
                  — Bedis Jaballah
                </span>
              </div>
            </div>
          </ThreeDTiltCard>

          {/* Right Column: Narrative Prose and 5 Key Pillars */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* Exact Master Prompt Paragraphs */}
            <div className="space-y-4 text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
              {PERSONAL_BRAND.extendedBio.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* 5 Highlights 3D Grid */}
            <div className="pt-6 mt-4 border-t border-zinc-800">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 mb-4 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span>Five Core Pillars of Practice</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PERSONAL_BRAND.pillars.map((pillar) => (
                  <ThreeDTiltCard
                    key={pillar.title}
                    maxTilt={12}
                    scale={1.03}
                    className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800/90 hover:border-purple-500/50 shadow-md hover:shadow-[0_8px_25px_rgba(168,85,247,0.2)]"
                  >
                    <div className="uiverse-3d-layer-1">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="p-1.5 rounded-lg bg-zinc-800/90 border border-zinc-700/60 shadow-sm uiverse-3d-layer-2">
                          {pillarIcons[pillar.title]}
                        </div>
                        <h5 className="text-sm font-bold text-white tracking-tight">
                          {pillar.title}
                        </h5>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </ThreeDTiltCard>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
