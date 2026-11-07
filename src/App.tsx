import React, { useState, useEffect } from 'react';
import { CheckerboardBackground } from './components/uiverse/CheckerboardBackground';
import { StarPreloader } from './components/uiverse/StarPreloader';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { IdeasLabSection } from './components/sections/IdeasLabSection';
import { AchievementsSection } from './components/sections/AchievementsSection';
import { ContactSection } from './components/sections/ContactSection';
import { BackToTop } from './components/common/BackToTop';

import { ThreeDSpatialCanvas } from './components/3d/ThreeDSpatialCanvas';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [isImmersive3D, setIsImmersive3D] = useState(false);

  // Preloader lifecycle: smooth initial loading display without excessive delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // Track active section for navbar highlighting
  useEffect(() => {
    const sections = ['home', 'spatial-universe', 'about', 'skills', 'projects', 'ideas-lab', 'achievements', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExplore3D = () => {
    const element = document.getElementById('spatial-universe');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#08080b] text-[#f4f4f6]">
      {/* REFERENCE 05: Star Preloader */}
      <StarPreloader isLoading={isLoading} />

      {/* REFERENCE 01: 3D Checkerboard Background */}
      <CheckerboardBackground />

      {/* Primary Navigation */}
      <Navbar 
        activeSection={activeSection} 
        onExplore3D={handleExplore3D}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        <HeroSection 
          onExplore3D={handleExplore3D}
        />

        {/* 3D Spatial Universe Interactive Section */}
        <section id="spatial-universe" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-cyan-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>3D INTERACTIVE UNIVERSE · THREE.JS & UIVERSE</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                Spatial Discipline Matrix
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
                Real-time procedural 3D WebGL space. Click and hover nodes to inspect disciplines, switch camera perspectives, or toggle wireframe shaders.
              </p>
            </div>
          </div>

          <ThreeDSpatialCanvas 
            isImmersiveMode={isImmersive3D}
            onToggleImmersive={() => setIsImmersive3D(!isImmersive3D)}
          />
        </section>

        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <IdeasLabSection />
        <AchievementsSection />
        <ContactSection />
      </main>

      {/* Back to Top button: appears when scrolled past hero section */}
      <BackToTop heroElementId="home" threshold={350} />
    </div>
  );
}

