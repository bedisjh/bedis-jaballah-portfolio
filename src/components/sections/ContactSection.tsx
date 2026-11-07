import React, { useState } from 'react';
import { PERSONAL_BRAND } from '../../data/portfolio-data';
import { MinecraftChestContact } from '../uiverse/MinecraftChestContact';
import { validateContactForm, ContactFormData } from '../../utils/portfolio-logic';
import { Send, CheckCircle2, AlertCircle, Instagram, Mail, ArrowUp } from 'lucide-react';
import { ThreeDTiltCard } from '../uiverse/ThreeDTiltCard';


export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData);

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setFormErrors({});
    setSubmitted(true);

    // Form resets after delay
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="py-24 relative z-10 border-t border-zinc-800/80 bg-[#07070a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contact Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-purple-400">
              06. CONTACT & COLLABORATION
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            LET'S BUILD SOMETHING TOGETHER.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed">
            Have an idea, a project, or an opportunity? Let's connect.
          </p>
        </div>

        {/* Central Stage: Reference 03 Minecraft Chest Contact Component */}
        <div className="pt-10 pb-8 mb-16">
          <MinecraftChestContact />
        </div>

        {/* 3D Direct Transmission Command Console */}
        <ThreeDTiltCard 
          maxTilt={5} 
          scale={1.01} 
          className="max-w-xl mx-auto bg-[#0d0d14]/95 border border-purple-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden hover:shadow-[0_15px_40px_rgba(168,85,247,0.25)]"
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800 uiverse-3d-layer-1">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-semibold">Direct Note</span>
              <h3 className="text-lg font-bold text-white">Send a Message</h3>
            </div>
            <span className="text-xs font-mono text-zinc-400">Response within 24h</span>
          </div>

          {submitted ? (
            <div className="py-12 text-center flex flex-col items-center justify-center animate-in fade-in uiverse-3d-layer-2">
              <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mb-3 shadow-lg">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Message Transmitted</h4>
              <p className="text-xs text-zinc-400 mt-1 max-w-xs">
                Thank you for reaching out! Bedis will review your note and respond promptly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 uiverse-3d-layer-1" noValidate>
              <div>
                <label htmlFor="contact-name" className="block text-xs font-mono text-zinc-300 mb-1">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Dupont"
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border text-white text-sm focus:outline-none transition-colors ${
                    formErrors.name ? 'border-rose-500 focus:border-rose-400' : 'border-zinc-700 focus:border-purple-500'
                  }`}
                />
                {formErrors.name && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{formErrors.name}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-mono text-zinc-300 mb-1">
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@domain.com"
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border text-white text-sm focus:outline-none transition-colors ${
                    formErrors.email ? 'border-rose-500 focus:border-rose-400' : 'border-zinc-700 focus:border-purple-500'
                  }`}
                />
                {formErrors.email && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{formErrors.email}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono text-zinc-300 mb-1">
                  Project or Inquiries
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your idea, startup inquiry, or collaboration..."
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border text-white text-sm focus:outline-none transition-colors resize-none ${
                    formErrors.message ? 'border-rose-500 focus:border-rose-400' : 'border-zinc-700 focus:border-purple-500'
                  }`}
                />
                {formErrors.message && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{formErrors.message}</span>
                  </p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="uiverse-3d-button w-full py-3.5 text-xs font-mono font-bold tracking-widest uppercase text-white bg-purple-600 hover:bg-purple-500 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Direct Transmission</span>
                </button>
              </div>
            </form>
          )}
        </ThreeDTiltCard>

        {/* Global Footer */}
        <footer className="mt-24 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div>
            <p className="text-zinc-300 font-medium">
              "Designed with curiosity. Built with creativity."
            </p>
            <p className="text-zinc-400 mt-1">
              © {new Date().getFullYear()} Bedis Jaballah. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={PERSONAL_BRAND.contacts.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href={PERSONAL_BRAND.contacts.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              TikTok
            </a>
            <a
              href={PERSONAL_BRAND.contacts.emailMailto}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Email
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
              title="Return to top"
              aria-label="Return to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </footer>

      </div>
    </section>
  );
};
