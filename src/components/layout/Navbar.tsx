import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Orbit } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onExplore3D?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeSection, 
  onExplore3D,
}) => {


  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Ideas Lab', href: '#ideas-lab' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08080b]/85 backdrop-blur-md border-b border-zinc-800/80 py-3 shadow-lg shadow-black/30'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict 3-Zone Top Bar Contract */}
        <div className="flex items-center justify-between gap-8">
          
          {/* Zone 1: Single Brand Wordmark */}
          <a
            href="#home"
            className="text-xl font-extrabold tracking-tight text-white hover:text-purple-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 group"
          >
            <span className="font-mono text-purple-500 font-black text-2xl group-hover:rotate-12 transition-transform inline-block">/</span>
            <span>BEDIS</span>
            <span className="text-purple-500 text-2xl leading-none">.</span>
          </a>

          {/* Zone 2: Navigation Links (Clean text links with active indicator) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Actions */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {onExplore3D && (
              <button
                type="button"
                onClick={onExplore3D}
                className="px-3 py-1.5 text-xs font-semibold text-cyan-300 bg-cyan-950/40 border border-cyan-500/40 rounded-lg hover:bg-cyan-900/50 hover:border-cyan-400 hover:text-white transition-all duration-200 whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
              >
                <Orbit className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '12s' }} />
                <span>3D Universe</span>
              </button>
            )}

            <a
              href="#contact"
              className="px-4 py-2 text-xs font-semibold text-white bg-zinc-900 border border-purple-500/40 rounded-lg hover:bg-purple-950/40 hover:border-purple-400 transition-all duration-200 whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
            >
              <span>Let's Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-purple-400" />
            </a>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0c12] border-b border-zinc-800 px-4 pt-3 pb-6 mt-3 space-y-3 shadow-2xl animate-in slide-in-from-top-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-zinc-800 space-y-2">
            {onExplore3D && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onExplore3D();
                }}
                className="w-full py-2.5 text-center text-xs font-semibold text-cyan-200 bg-cyan-950/70 border border-cyan-500/50 rounded-lg hover:bg-cyan-900 transition-colors flex items-center justify-center gap-2"
              >
                <Orbit className="w-4 h-4 text-cyan-400" />
                <span>3D Spatial Universe</span>
              </button>
            )}

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-xs font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors block"
            >
              Let's Connect
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
