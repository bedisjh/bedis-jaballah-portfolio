import React from 'react';
import { AchievementItem } from '../../data/portfolio-data';
import { ShieldCheck, Info } from 'lucide-react';

interface AchievementCardProps {
  item: AchievementItem;
}

/**
 * REFERENCE 04 — GLOWING ACHIEVEMENT / STATISTIC CARD
 * Source: Uiverse.io by Spacious74
 * Reusable component featuring:
 * - Dark radial background
 * - Perimeter orbiting glowing light dot
 * - Soft diffuse light ray
 * - High-impact gradient typography
 * - Transparent verification disclosure
 */
export const AchievementCard: React.FC<AchievementCardProps> = ({ item }) => {
  const isPendingAudit = item.verificationStatus === 'reported_pending_audit';

  return (
    <div className="achievement-card p-6 md:p-8 flex flex-col justify-between h-full relative group">
      {/* Perimeter Orbiting Glowing Dot */}
      <div className="card-orbit-dot" aria-hidden="true" />

      {/* Blurred Soft Light Ray Effect */}
      <div className="card-light-ray" aria-hidden="true" />

      {/* Top Header Row with Category Badge & Status */}
      <div className="relative z-10 flex items-center justify-between gap-3 mb-6">
        <span className="text-[11px] font-mono tracking-wider uppercase text-purple-400 font-semibold">
          {item.badge || 'STATISTIC'}
        </span>

        {isPendingAudit ? (
          <span 
            className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-300/90"
            title="Previously reported — currently undergoing verified audit"
          >
            <Info className="w-3 h-3 text-amber-400" />
            <span>Under Audit</span>
          </span>
        ) : (
          <span 
            className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400/90"
            title="Verified academic or leadership role"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified</span>
          </span>
        )}
      </div>

      {/* Main Metric & Typography */}
      <div className="relative z-10 my-auto py-2">
        <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-100 to-purple-400 bg-clip-text text-transparent font-mono tabular-nums leading-none">
          {item.metric}
        </div>
        <h3 className="mt-3 text-lg sm:text-xl font-bold text-zinc-100 tracking-tight">
          {item.label}
        </h3>
        <p className="mt-1 text-sm text-zinc-400 leading-relaxed">
          {item.sublabel}
        </p>
      </div>

      {/* Bottom Verification Disclosure */}
      <div className="relative z-10 mt-6 pt-4 border-t border-zinc-800/80">
        <p className={`text-xs leading-relaxed ${isPendingAudit ? 'text-amber-300/80' : 'text-zinc-500'}`}>
          {item.verificationNote}
        </p>
      </div>
    </div>
  );
};
