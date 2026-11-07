import React, { useState } from 'react';
import { IDEAS_LAB, IdeaItem } from '../../data/portfolio-data';
import { FlaskConical, Atom, Plus, ArrowRight, X, Lightbulb } from 'lucide-react';
import { ThreeDTiltCard } from '../uiverse/ThreeDTiltCard';


export const IdeasLabSection: React.FC = () => {

  const [selectedIdea, setSelectedIdea] = useState<IdeaItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [activeStatus, setActiveStatus] = useState<string>('ALL');
  const [customIdeaModal, setCustomIdeaModal] = useState(false);
  const [submittedIdea, setSubmittedIdea] = useState(false);
  const [newIdeaTitle, setNewIdeaTitle] = useState('');
  const [newIdeaDesc, setNewIdeaDesc] = useState('');

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIdea(null);
        setCustomIdeaModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = ['ALL', 'Digital Culture', 'Tech Systems', 'Creator Tools', 'Innovation & Impact'];
  const statuses = ['ALL', 'CONCEPT', 'IN DEVELOPMENT', 'PROTOTYPE', 'COMPLETED'];

  const filteredIdeas = IDEAS_LAB.filter((idea) => {
    const catMatch = activeCategory === 'ALL' || idea.category === activeCategory;
    const statMatch = activeStatus === 'ALL' || idea.status === activeStatus;
    return catMatch && statMatch;
  });

  const handleProposeIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIdeaTitle.trim()) return;
    setSubmittedIdea(true);
    setTimeout(() => {
      setSubmittedIdea(false);
      setCustomIdeaModal(false);
      setNewIdeaTitle('');
      setNewIdeaDesc('');
    }, 2000);
  };

  return (
    <section id="ideas-lab" className="py-24 relative z-10 border-t border-zinc-800/70 bg-[#09090e]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Futuristic Laboratory Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-purple-400 flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                <span>04. EXPERIMENTAL WORKSPACE</span>
              </span>
              <span className="w-12 h-px bg-purple-500/40" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>Ideas Lab</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/40 text-purple-300">
                LAB ENV
              </span>
            </h2>
            <p className="mt-2 text-zinc-300 italic text-base sm:text-lg max-w-2xl">
              "Not every idea is a project yet. Every project starts with an idea."
            </p>
            <p className="mt-1 text-xs text-zinc-400 max-w-xl">
              Incubating concepts, algorithmic troubleshooting routines, and creative startup frameworks before formal launch.
            </p>
          </div>

          {/* Actions: Propose Concept */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setCustomIdeaModal(true)}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-purple-500/40 hover:border-purple-400 text-xs font-mono font-semibold text-purple-200 hover:text-white transition-all duration-200 flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-3.5 h-3.5 text-purple-400" />
              <span>Propose Concept</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar (Category & Status) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-zinc-800">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeCategory === c
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900/60'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Status Badges */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
            <span className="text-zinc-400 text-[11px] hidden lg:inline mr-1">Status:</span>
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setActiveStatus(s)}
                className={`px-2.5 py-0.5 rounded text-[11px] font-mono transition-colors whitespace-nowrap ${
                  activeStatus === s
                    ? 'bg-zinc-100 text-zinc-900 font-bold'
                    : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900/80 border border-zinc-800'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Ideas Lab Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredIdeas.map((idea) => {
            const statusColors: Record<string, string> = {
              CONCEPT: 'text-blue-400 border-blue-500/30 bg-blue-950/30',
              'IN DEVELOPMENT': 'text-purple-300 border-purple-500/40 bg-purple-950/40',
              PROTOTYPE: 'text-amber-400 border-amber-500/30 bg-amber-950/30',
              COMPLETED: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/30',
            };

            return (
              <ThreeDTiltCard
                key={idea.id}
                onClick={() => setSelectedIdea(idea)}
                maxTilt={8}
                scale={1.02}
                className="group bg-[#0e0e14] border border-zinc-800 hover:border-purple-500/60 rounded-2xl p-6 sm:p-7 transition-all duration-300 shadow-lg hover:shadow-[0_10px_35px_rgba(168,85,247,0.2)] flex flex-col justify-between"
              >
                <div className="uiverse-3d-layer-1">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-semibold">
                      {idea.category}
                    </span>
                    <span className={`text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded border ${statusColors[idea.status] || 'text-zinc-400'}`}>
                      {idea.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                    {idea.title}
                  </h3>

                  <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                    {idea.shortDescription}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between uiverse-3d-layer-2">
                  <div className="flex flex-wrap gap-1.5">
                    {idea.techStackOrMethod.slice(0, 2).map((t) => (
                      <span key={t} className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-mono text-purple-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </ThreeDTiltCard>
            );
          })}
        </div>

      </div>

      {/* IDEA DETAIL MODAL */}
      {selectedIdea && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#12121c] border border-purple-500/30 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedIdea(null)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              aria-label="Close Idea Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-purple-400">
                {selectedIdea.category}
              </span>
              <span className="text-zinc-600">·</span>
              <span className="text-xs font-mono text-zinc-300 font-bold">
                {selectedIdea.status}
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-white tracking-tight mb-4">
              {selectedIdea.title}
            </h3>

            <div className="space-y-4 text-sm text-zinc-300 leading-relaxed">
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <h5 className="text-xs font-mono uppercase text-zinc-400 mb-1">Concept Summary</h5>
                <p>{selectedIdea.shortDescription}</p>
              </div>

              <div>
                <h5 className="text-xs font-mono uppercase text-zinc-400 mb-1">Laboratory Development Notes</h5>
                <p className="text-zinc-300">{selectedIdea.fullNotes}</p>
              </div>

              <div>
                <h5 className="text-xs font-mono uppercase text-zinc-400 mb-1">Target Impact</h5>
                <p className="text-purple-200/90">{selectedIdea.potentialImpact}</p>
              </div>

              <div>
                <h5 className="text-xs font-mono uppercase text-zinc-400 mb-2">Architectural Components</h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedIdea.techStackOrMethod.map((item) => (
                    <span key={item} className="text-xs font-mono px-2.5 py-1 rounded bg-purple-950/40 border border-purple-500/30 text-purple-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end">
              <button
                onClick={() => setSelectedIdea(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
              >
                Close Lab Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROPOSE CONCEPT MODAL */}
      {customIdeaModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#12121c] border border-purple-500/30 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setCustomIdeaModal(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              aria-label="Close Propose Idea Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-purple-400">
              <Lightbulb className="w-4 h-4" />
              <span>IDEAS LAB REPOSITORY</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Propose / Draft a Concept</h3>
            <p className="text-xs text-zinc-400 mb-4">
              Add your idea or project inquiry directly into the Ideas Lab staging queue.
            </p>

            {submittedIdea ? (
              <div className="p-6 text-center bg-purple-950/30 border border-purple-500/30 rounded-xl my-4">
                <Lightbulb className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h4 className="text-base font-bold text-white">Concept Logged Successfully</h4>
                <p className="text-xs text-zinc-400 mt-1">Staged into the Ideas Lab database.</p>
              </div>
            ) : (
              <form onSubmit={handleProposeIdea} className="space-y-4">
                <div>
                  <label htmlFor="idea-title" className="block text-xs font-mono text-zinc-300 mb-1">
                    Concept Title
                  </label>
                  <input
                    id="idea-title"
                    type="text"
                    required
                    value={newIdeaTitle}
                    onChange={(e) => setNewIdeaTitle(e.target.value)}
                    placeholder="e.g. Interactive Audio Guide for Djerbahood"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="idea-desc" className="block text-xs font-mono text-zinc-300 mb-1">
                    Concept Overview & Notes
                  </label>
                  <textarea
                    id="idea-desc"
                    required
                    rows={3}
                    value={newIdeaDesc}
                    onChange={(e) => setNewIdeaDesc(e.target.value)}
                    placeholder="Describe the problem, intended technology, and community value..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-purple-500 focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setCustomIdeaModal(false)}
                    className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors shadow-md"
                  >
                    Stage Concept
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
