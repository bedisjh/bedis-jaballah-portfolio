import React, { useState } from 'react';
import { PROJECTS, ProjectItem } from '../../data/portfolio-data';
import { ArrowUpRight, CheckCircle, X, Layers, ExternalLink } from 'lucide-react';
import { ThreeDTiltCard } from '../uiverse/ThreeDTiltCard';


export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [filter, setFilter] = useState<string>('ALL');

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = ['ALL', 'Cultural Tourism', 'Media Management', 'IT Diagnostics', 'Creative Media'];

  const filteredProjects = filter === 'ALL'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category.toLowerCase().includes(filter.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(filter.toLowerCase())));

  return (
    <section id="projects" className="py-24 relative z-10 border-t border-zinc-800/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-purple-400">
                03. SELECTED WORKS & VENTURES
              </span>
              <span className="w-12 h-px bg-purple-500/40" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Featured Projects
            </h2>
            <p className="mt-2 text-zinc-400 max-w-xl text-base">
              Original initiatives spanning tourism innovation, student organization media leadership, and hands-on system troubleshooting.
            </p>
          </div>

          {/* Interactive filter control */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-900/80 border border-zinc-800 rounded-xl overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  filter === cat
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Showcase Grid (Bento style: Innova Live featured large, others sleek) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {filteredProjects.map((project, index) => {
            const isFeatured = project.featured;

            return (
              <ThreeDTiltCard
                key={project.id}
                onClick={() => setSelectedProject(project)}
                maxTilt={9}
                scale={1.02}
                className={`lg:col-span-6 flex flex-col justify-between bg-[#0f0f15] border border-zinc-800 hover:border-purple-500/60 rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_10px_35px_rgba(168,85,247,0.25)] transition-shadow duration-300 group`}
              >
                {/* Visual Media Container with 3D Depth Layer */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950 uiverse-3d-layer-1">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f15] via-[#0f0f15]/30 to-transparent" />

                  {/* Top Status & Role Badges with 3D Depth Layer */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 uiverse-3d-layer-2">
                    <span className="px-3 py-1 text-[10px] font-mono font-bold tracking-wider uppercase rounded-md bg-[#08080b]/90 text-purple-300 border border-purple-500/30 backdrop-blur-md shadow-md">
                      {project.statusBadge}
                    </span>

                    {project.role && (
                      <span className="px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase rounded-md bg-zinc-900/90 text-zinc-300 border border-zinc-700/60 backdrop-blur-md">
                        {project.role}
                      </span>
                    )}
                  </div>

                  {project.slogan && (
                    <div className="absolute bottom-3 left-4 right-4 uiverse-3d-layer-2">
                      <p className="text-xs font-mono italic text-purple-200 drop-shadow-md">
                        "{project.slogan}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Content Details with 3D Depth Layer */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow uiverse-3d-layer-2">
                  <div>
                    {/* Category unboxed text */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-zinc-400 mb-2">
                      <span className="text-purple-300 font-medium">{project.category}</span>
                      <span className="text-zinc-600 hidden sm:inline" aria-hidden="true">·</span>
                      <span className="text-zinc-500 hidden sm:inline">Concept & Practice</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </h3>

                    <p className="mt-3 text-sm text-zinc-400 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Highlights tag bar */}
                  <div className="mt-6 pt-4 border-t border-zinc-800/80">
                    <div className="flex flex-wrap gap-1.5">
                      {project.highlights.slice(0, 3).map((hl) => (
                        <span
                          key={hl}
                          className="text-[11px] font-mono text-zinc-400 bg-zinc-900/80 border border-zinc-800 px-2 py-0.5 rounded-sm"
                        >
                          {hl}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ThreeDTiltCard>
            );
          })}
        </div>

      </div>

      {/* FULL PROJECT DETAIL MODAL */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          <div 
            className="bg-[#101018] border border-purple-500/30 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200"
          >
            {/* Modal Image Header */}
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101018] via-transparent to-black/40" />

              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 hover:bg-black text-zinc-300 hover:text-white border border-zinc-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                aria-label="Close Project Modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-xs font-mono uppercase tracking-widest text-purple-400 block mb-1">
                  {selectedProject.category}
                </span>
                <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {selectedProject.title}
                </h3>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 sm:p-8 space-y-6">
              {selectedProject.slogan && (
                <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30">
                  <p className="text-sm sm:text-base font-semibold text-purple-200 italic">
                    "{selectedProject.slogan}"
                  </p>
                </div>
              )}

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Executive Overview
                </h4>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-3">
                  Scope, Methodology & Distinctions
                </h4>
                <ul className="space-y-2.5">
                  {selectedProject.detailedPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-3">
                  Project Highlights
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-xs font-mono px-3 py-1 rounded-md bg-zinc-900 border border-zinc-700/70 text-zinc-200"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400">
                  Status: {selectedProject.statusBadge}
                </span>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2 text-xs font-semibold text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
