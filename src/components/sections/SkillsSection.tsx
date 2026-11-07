import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../../data/portfolio-data';
import { Terminal, Smartphone, Palette, CheckCircle2 } from 'lucide-react';
import { ThreeDTiltCard } from '../uiverse/ThreeDTiltCard';


export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredCategories = activeTab === 'all'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter((c) => c.id === activeTab);

  return (
    <section id="skills" className="py-24 relative z-10 border-t border-zinc-800/70 bg-[#09090d]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-purple-400">
                02. CAPABILITIES & EXPERTISE
              </span>
              <span className="w-12 h-px bg-purple-500/40" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Skills & Expertise
            </h2>
            <p className="mt-2 text-zinc-400 max-w-xl text-base">
              A pragmatic blend of hands-on system troubleshooting, mobile content production, and entrepreneurial concepting.
            </p>
          </div>

          {/* Category Filter Tabs (Zero-Pill: functional segmented control) */}
          <div className="flex items-center gap-1 p-1 bg-zinc-900/90 border border-zinc-800 rounded-xl overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Domains
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === cat.id
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {cat.title.split('&')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCategories.map((category) => (
            <ThreeDTiltCard
              key={category.id}
              maxTilt={7}
              scale={1.01}
              className="bg-[#0f0f15] border border-zinc-800/90 hover:border-purple-500/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl hover:shadow-[0_10px_35px_rgba(168,85,247,0.2)] transition-shadow duration-300 group"
            >
              <div className="uiverse-3d-layer-1">
                {/* Category Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      {category.subtitle}
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-400">
                    {category.id === 'it-tech' && <Terminal className="w-5 h-5" />}
                    {category.id === 'creative-design' && <Palette className="w-5 h-5" />}
                    {category.id === 'photo-video' && <Smartphone className="w-5 h-5" />}
                    {category.id === 'innovation-entrepreneurship' && <CheckCircle2 className="w-5 h-5" />}
                  </div>
                </div>

                {/* Authentic Smartphone Framing Note (Mandatory requirement from user) */}
                {category.authenticNote && (
                  <div className="mb-6 p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/25 flex items-start gap-2.5">
                    <Smartphone className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-purple-200/90 leading-relaxed">
                      {category.authenticNote}
                    </p>
                  </div>
                )}

                {/* Clean Typographic Skills List (Zero pill spam) */}
                <div className="divide-y divide-zinc-800/60 mt-4">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="py-3 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400/80 shrink-0" />
                        <span className="text-sm font-semibold text-zinc-200">
                          {skill.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-right">
                        {skill.level && (
                          <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/50 border border-emerald-500/30">
                            {skill.level}
                          </span>
                        )}
                        {skill.note && (
                          <span className="text-xs font-mono text-zinc-400 hidden sm:inline-block">
                            {skill.note}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom footer footnote */}
              <div className="mt-6 pt-4 border-t border-zinc-800/70 flex items-center justify-between text-[11px] font-mono text-zinc-400 uiverse-3d-layer-1">
                <span>{category.skills.length} core competencies</span>
                <span className="text-purple-400 font-semibold">Active Practice</span>
              </div>
            </ThreeDTiltCard>
          ))}
        </div>

      </div>
    </section>
  );
};
