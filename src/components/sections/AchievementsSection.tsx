import React, { useState } from 'react';
import { ACHIEVEMENTS } from '../../data/portfolio-data';
import { AchievementCard } from '../uiverse/AchievementCard';
import { ThreeDTiltCard } from '../uiverse/ThreeDTiltCard';
import { Award, FileText, CheckCircle2, X, Download, Mail, ExternalLink } from 'lucide-react';
import { PERSONAL_BRAND } from '../../data/portfolio-data';

export const AchievementsSection: React.FC = () => {
  const [cvModalOpen, setCvModalOpen] = useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCvModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="achievements" className="py-24 relative z-10 border-t border-zinc-800/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-purple-400 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-purple-400" />
                <span>05. VERIFIED MILESTONES & CREDENTIALS</span>
              </span>
              <span className="w-12 h-px bg-purple-500/40" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Achievements & CV Highlights
            </h2>
            <p className="mt-2 text-zinc-400 max-w-xl text-base">
              Quantified milestones, academic enrollment, and creative production leadership with interactive 3D perspective.
            </p>
          </div>

          {/* CV Action Button (Tactile 3D button) */}
          <div>
            <button
              onClick={() => setCvModalOpen(true)}
              className="uiverse-3d-button px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-purple-400 text-xs font-mono font-semibold text-zinc-200 hover:text-white flex items-center gap-2 group cursor-pointer"
            >
              <FileText className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              <span>Review CV Dossier</span>
            </button>
          </div>
        </div>

        {/* 4 Glowing Achievement Cards (Reference 04) Grid with 3D Tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {ACHIEVEMENTS.map((item) => (
            <ThreeDTiltCard key={item.id} maxTilt={9} scale={1.02} className="h-full">
              <div className="h-full uiverse-3d-layer-1">
                <AchievementCard item={item} />
              </div>
            </ThreeDTiltCard>
          ))}
        </div>

        {/* Academic / Leadership Footnote with 3D Depth */}
        <ThreeDTiltCard maxTilt={5} scale={1.01} className="mt-12">
          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 uiverse-3d-layer-1">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-950/50 border border-purple-500/30 text-purple-400 uiverse-3d-layer-2">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="uiverse-3d-layer-1">
                <h4 className="text-sm font-bold text-white">Transparency & Rigor Policy</h4>
                <p className="text-xs text-zinc-400">
                  All claims and metrics reflect verifiable student engagements, official organizational roles, and honest audit statuses.
                </p>
              </div>
            </div>

            <a
              href={PERSONAL_BRAND.contacts.emailMailto}
              className="uiverse-3d-layer-2 text-xs font-mono text-purple-400 hover:text-purple-300 underline underline-offset-4 whitespace-nowrap"
            >
              Request Official Inquiries →
            </a>
          </div>
        </ThreeDTiltCard>

      </div>

      {/* CV DOSSIER MODAL */}
      {cvModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#12121a] border border-purple-500/40 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setCvModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              aria-label="Close CV Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-purple-400">
              <FileText className="w-4 h-4" />
              <span>CURRICULUM VITAE DOSSIER</span>
            </div>

            <h3 className="text-2xl font-extrabold text-white mb-1">Bedis Jaballah</h3>
            <p className="text-xs font-mono text-zinc-400 mb-6">
              IT Student @ ISET Djerba · Media Manager @ Enactus · Founder @ Innova Live
            </p>

            <div className="space-y-4 text-sm text-zinc-300 max-h-[55vh] overflow-y-auto pr-2">
              <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
                <h4 className="text-xs font-mono uppercase text-purple-400 font-bold mb-1">Education</h4>
                <p className="font-semibold text-white">Higher Institute of Technological Studies of Djerba (ISET Djerba)</p>
                <p className="text-xs text-zinc-400">Information Technology · Computer Systems & Software Fundamentals</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
                <h4 className="text-xs font-mono uppercase text-purple-400 font-bold mb-1">Leadership & Media</h4>
                <p className="font-semibold text-white">Enactus ISET Djerba — Media Manager</p>
                <p className="text-xs text-zinc-400">Directing visual media strategy, social content, and event coverage campaigns.</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
                <h4 className="text-xs font-mono uppercase text-purple-400 font-bold mb-1">Startup Venture</h4>
                <p className="font-semibold text-white">Innova Live — Founder & Project Lead</p>
                <p className="text-xs text-zinc-400">Cultural tourism and tech experience prototype for Tunisian heritage discovery.</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
                <h4 className="text-xs font-mono uppercase text-purple-400 font-bold mb-1">Core Tooling Mastered</h4>
                <p className="text-xs text-zinc-300">
                  Canva (Mastered), CapCut (Mastered), Windows Advanced Troubleshooting, PC Performance Tuning, Hardware Testing, Web Development Basics.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200">
                <p className="font-semibold">Formal PDF Document Delivery:</p>
                <p className="text-zinc-400 mt-0.5">
                  The personalized printable CV is distributed directly via email upon request for academic applications, startup programs, and professional opportunities.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between gap-3">
              <span className="text-xs text-zinc-400 font-mono">
                Location: Djerba, TN
              </span>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${PERSONAL_BRAND.contacts.email}?subject=CV%20Request%20for%20Bedis%20Jaballah`}
                  className="px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors flex items-center gap-1.5 shadow"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Request Full PDF</span>
                </a>
                <button
                  onClick={() => setCvModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800 rounded-lg"
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
