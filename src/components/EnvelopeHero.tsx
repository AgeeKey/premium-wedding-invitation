import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { KyrgyzBorder, KyrgyzCorner, KyrgyzRosette } from './KyrgyzOrnament';

// Mixkit free-to-use video (nature / romantic)
const VIDEO_URL = 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-walk-and-turn-together-in-a-park-24757-large.mp4';

export default function EnvelopeHero() {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const fireConfetti = () => {
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#C9A84C', '#F0D060', '#E8D5A3'] });
    fire(0.2, { spread: 60, colors: ['#C9A84C', '#ffffff', '#F0D060'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#C9A84C', '#8B6914', '#F0D060'] });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors: ['#C9A84C', '#ffffff'] });
    fire(0.1, { spread: 120, startVelocity: 45, colors: ['#F0D060', '#C9A84C'] });
  };

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => {
      fireConfetti();
      setShowContent(true);
      // Trigger music player
      window.dispatchEvent(new CustomEvent('envelope-opened'));
    }, 800);
  };

  useEffect(() => {
    if (!showContent) return;
    const timer = setTimeout(() => {
      const el = document.getElementById('invitation-content');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 1200);
    return () => clearTimeout(timer);
  }, [showContent]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-luxury-black">
      {/* Video background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <video
          src={VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: videoLoaded ? 0.25 : 0 }}
        />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-luxury-black/70" />
        {/* Parallax ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-gold/3 blur-[80px]" />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gold/3 blur-[80px]" />
      </div>

      {/* Kyrgyz ornament borders */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none">
        <KyrgyzBorder opacity={0.3} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none rotate-180">
        <KyrgyzBorder opacity={0.3} />
      </div>

      {/* Kyrgyz corner ornaments */}
      <div className="absolute top-12 left-6 pointer-events-none">
        <KyrgyzCorner opacity={0.35} />
      </div>
      <div className="absolute top-12 right-6 pointer-events-none">
        <KyrgyzCorner opacity={0.35} flip />
      </div>

      {/* Floating Kyrgyz rosettes */}
      {[
        { x: '8%', y: '20%', size: 48, delay: 0 },
        { x: '88%', y: '15%', size: 36, delay: 1 },
        { x: '5%', y: '70%', size: 32, delay: 2 },
        { x: '92%', y: '65%', size: 44, delay: 0.5 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: pos.x, top: pos.y }}
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6 + i, repeat: Infinity, delay: pos.delay, ease: 'easeInOut' }}
        >
          <KyrgyzRosette size={pos.size} opacity={0.2} />
        </motion.div>
      ))}

      {/* Floating gold dots */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-1 h-1 rounded-full bg-gold/40"
          style={{
            left: `${15 + i * 14}%`,
            top: `${25 + (i % 3) * 22}%`,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      {/* Logo / Monogram */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="mb-12 text-center"
      >
        <p className="font-serif text-gold/70 text-sm tracking-[0.4em] uppercase mb-1">Premium Wedding Invitation</p>
        <p className="font-sans text-gold/40 text-xs tracking-[0.3em] uppercase mb-3">Той чакырыгы</p>
        <div className="section-divider" />
      </motion.div>

      {/* 3D Envelope */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative perspective-1000 cursor-pointer select-none"
        onClick={handleOpen}
      >
        <motion.div
          className="relative w-80 h-52 md:w-96 md:h-64"
          animate={isOpen ? { rotateY: 0, scale: 1.05 } : {}}
          whileHover={!isOpen ? { scale: 1.03, rotateY: 5 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Envelope body */}
          <div
            className="absolute inset-0 rounded-sm"
            style={{
              background: 'linear-gradient(145deg, #1a1a1a 0%, #111 50%, #0f0f0f 100%)',
              border: '1px solid rgba(201,168,76,0.35)',
              boxShadow: isOpen
                ? '0 40px 80px rgba(201,168,76,0.3), inset 0 0 60px rgba(201,168,76,0.05)'
                : '0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,168,76,0.1)',
            }}
          >
            {/* Envelope fold lines */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: 'linear-gradient(135deg, transparent 49.5%, rgba(201,168,76,0.4) 49.5%, rgba(201,168,76,0.4) 50.5%, transparent 50.5%)',
              }}
            />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: 'linear-gradient(225deg, transparent 49.5%, rgba(201,168,76,0.4) 49.5%, rgba(201,168,76,0.4) 50.5%, transparent 50.5%)',
              }}
            />

            {/* Wax seal center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={isOpen ? { scale: 0, opacity: 0 } : { scale: [1, 1.05, 1] }}
                transition={isOpen ? { duration: 0.3 } : { duration: 2, repeat: Infinity }}
                className="flex flex-col items-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #C9A84C 0%, #F0D060 50%, #8B6914 100%)',
                    boxShadow: '0 0 20px rgba(201,168,76,0.5)',
                  }}
                >
                  <span className="font-serif text-luxury-black font-bold text-xl">A&V</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Envelope flap */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 origin-top"
            animate={isOpen ? { rotateX: -180, opacity: 0.7 } : { rotateX: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'top center',
              background: 'linear-gradient(180deg, #1a1a1a 0%, #111 100%)',
              borderBottom: '1px solid rgba(201,168,76,0.3)',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
          />
        </motion.div>

        {/* Letter rising from envelope */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -80, opacity: 1 }}
              exit={{ y: 0, opacity: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -top-4 left-4 right-4 glass-card rounded-sm p-5 text-center"
              style={{ boxShadow: '0 20px 60px rgba(201,168,76,0.2)' }}
            >
              <p className="font-serif text-gold text-lg italic">Сиз чакырылдыңыз</p>
              <p className="font-sans text-white/60 text-xs tracking-widest uppercase mt-1">Вы приглашены · на бракосочетание</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* CTA Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-10 text-center"
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div key="closed" exit={{ opacity: 0, y: -10 }}>
              <motion.p
                className="font-sans text-white/50 text-sm tracking-[0.3em] uppercase"
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                Ачуу үчүн басыңыз · Нажмите, чтобы открыть
              </motion.p>
            </motion.div>
          ) : (
            <motion.p
              key="open"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-gold text-base italic"
            >
              Прокрутите вниз ↓
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
