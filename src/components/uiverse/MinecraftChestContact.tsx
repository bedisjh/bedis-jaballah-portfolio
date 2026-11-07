import React, { useState, useRef } from 'react';
import { Instagram, Mail, ExternalLink, KeyRound, Check, Copy } from 'lucide-react';
import { PERSONAL_BRAND } from '../../data/portfolio-data';

/**
 * REFERENCE 03 — MINECRAFT CHEST CONTACT COMPONENT
 * Exact Source: Uiverse.io by mamyapro123
 * Features:
 * - Full 3D isometric chest with exact sampled Minecraft wood & iron colors
 * - Complete 6-faced chest-base & 6-faced chest-lid
 * - Complete 6-faced 3D metal latch rig (.mc-latch)
 * - Exact wood plank procedural repeating linear gradients
 * - Interactive Contact Gateway: clicking opens the lid and reveals Instagram, TikTok, and direct Email!
 */
export const MinecraftChestContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleChest = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next && containerRef.current) {
        setTimeout(() => {
          containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 150);
      }
      return next;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleChest();
    }
  };

  const copyEmailToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(PERSONAL_BRAND.contacts.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div ref={containerRef} className="w-full max-w-xl mx-auto flex flex-col items-center">
      
      {/* Exact mamyapro123 3D Minecraft Environment & Rig */}
      <div className="mc-environment">
        <div 
          className="mc-chest-wrapper cursor-pointer select-none"
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close Minecraft Chest' : 'Open Minecraft Contact Chest to connect on Instagram, TikTok, or Email'}
          onClick={toggleChest}
          onKeyDown={handleKeyDown}
        >
          {/* 3D Isometric Chest */}
          <div className="mc-chest">
            {/* Soft Ambient Contact Shadow */}
            <div className={`mc-chest-shadow ${isOpen ? 'is-open' : ''}`} aria-hidden="true" />
            
            {/* Base (6 Faces) */}
            <div className="chest-part chest-base">
              <div className="c-face base-front" />
              <div className="c-face base-back" />
              <div className="c-face base-left" />
              <div className="c-face base-right" />
              <div className="c-face base-top" />
              <div className="c-face base-bottom" />
            </div>

            {/* Lid (6 Faces + 6-Faced Metal Latch) */}
            <div className={`chest-part chest-lid ${isOpen ? 'is-open' : ''}`}>
              <div className="c-face lid-front" />
              <div className="c-face lid-back" />
              <div className="c-face lid-left" />
              <div className="c-face lid-right" />
              <div className="c-face lid-top" />
              <div className="c-face lid-bottom" />

              {/* Solid 3D Metal Latch Rig */}
              <div className="mc-latch">
                <div className="latch-f latch-front" />
                <div className="latch-f latch-back" />
                <div className="latch-f latch-left" />
                <div className="latch-f latch-right" />
                <div className="latch-f latch-top" />
                <div className="latch-f latch-bottom" />
              </div>
            </div>

          </div>

          {/* Minecraft Status Text from mamyapro123 */}
          <div className="mc-chest-text">
            {isOpen ? 'CHEST OPEN · CLICK TO CLOSE' : 'CLICK CHEST TO CONNECT'}
          </div>
        </div>
      </div>

      {/* REVEALED CONTACT GATEWAYS (Instagram, TikTok, Email) */}
      <div 
        className={`w-full transition-all duration-500 ease-out overflow-hidden ${
          isOpen ? 'max-h-[550px] opacity-100 mt-4' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-[#101016]/95 border border-purple-500/40 rounded-2xl p-6 sm:p-7 backdrop-blur-xl shadow-2xl relative">
          
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-purple-400" />
                <span>Unlocked Gateways</span>
              </p>
              <h4 className="text-lg font-bold text-white tracking-tight">Direct Connection with Bedis</h4>
            </div>
            
            <button
              onClick={copyEmailToClipboard}
              className="text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 transition-colors"
              title="Copy direct email address"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-sans font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </div>

          {/* 3 Real Clickable Contact Gateways */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* 1. Instagram */}
            <a
              href={PERSONAL_BRAND.contacts.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-purple-500/60 hover:bg-purple-950/20 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-sm">
                  <Instagram className="w-4 h-4" />
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-purple-400 transition-colors" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">Instagram</span>
                <span className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">@bedis.jh</span>
              </div>
            </a>

            {/* 2. TikTok */}
            <a
              href={PERSONAL_BRAND.contacts.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-blue-500/60 hover:bg-blue-950/20 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-black border border-zinc-700 flex items-center justify-center text-white shadow-sm">
                  <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.94-4.52V8.71a8.21 8.21 0 0 0 4.83 1.54V6.79a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-blue-400 transition-colors" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">TikTok</span>
                <span className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">@bedis.jaballah</span>
              </div>
            </a>

            {/* 3. Direct Email */}
            <a
              href={PERSONAL_BRAND.contacts.emailMailto}
              className="group p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/60 hover:bg-emerald-950/20 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-600/30 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-sm">
                  <Mail className="w-4 h-4" />
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">Direct Email</span>
                <span className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors truncate block">bedisjaballah9</span>
              </div>
            </a>

          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
            <span>Primary inbox response time: &lt; 24h</span>
            <span className="text-purple-400 font-mono">ISET Djerba, TN</span>
          </div>
        </div>
      </div>
    </div>
  );
};
