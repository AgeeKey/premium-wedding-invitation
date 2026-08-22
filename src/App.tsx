import { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

import EnvelopeHero from './components/EnvelopeHero';
import Header from './components/Header';
import DateTimeSection from './components/DateTimeSection';
import DressCode from './components/DressCode';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import Location from './components/Location';
import Countdown from './components/Countdown';
import RSVP from './components/RSVP';
import Footer from './components/Footer';

function SectionDivider() {
  return (
    <div className="flex items-center gap-4 px-6 max-w-4xl mx-auto">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/20" />
      <div
        className="w-2 h-2 rotate-45"
        style={{ background: 'linear-gradient(135deg, #C9A84C, #8B6914)' }}
      />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/20" />
    </div>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Prevent default scroll restoration
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="noise-overlay">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-50"
        style={{ scaleX, background: 'linear-gradient(90deg, #C9A84C, #F0D060, #C9A84C)', transformOrigin: '0%' }}
        aria-hidden="true"
      />

      {/* Floating nav dots */}
      <nav
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3"
        aria-label="Section navigation"
      >
        {['hero', 'invitation-content', 'datetime', 'dresscode', 'timeline', 'gallery', 'location', 'countdown', 'rsvp'].map((id) => (
          <button
            key={id}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
            className="w-1.5 h-1.5 rounded-full bg-white/20 hover:bg-gold/80 transition-all duration-300 hover:scale-150"
            aria-label={`Go to ${id} section`}
          />
        ))}
      </nav>

      <main>
        {/* Hero envelope */}
        <section id="hero">
          <EnvelopeHero />
        </section>

        {/* Invitation header */}
        <section id="invitation-content">
          <Header />
        </section>

        <SectionDivider />

        {/* Date & Time */}
        <section id="datetime">
          <DateTimeSection />
        </section>

        <SectionDivider />

        {/* Dress Code */}
        <section id="dresscode">
          <DressCode />
        </section>

        <SectionDivider />

        {/* Timeline */}
        <section id="timeline">
          <Timeline />
        </section>

        <SectionDivider />

        {/* Gallery */}
        <section id="gallery">
          <Gallery />
        </section>

        <SectionDivider />

        {/* Location */}
        <section id="location">
          <Location />
        </section>

        <SectionDivider />

        {/* Countdown */}
        <section id="countdown">
          <Countdown />
        </section>

        <SectionDivider />

        {/* RSVP */}
        <section id="rsvp">
          <RSVP />
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
