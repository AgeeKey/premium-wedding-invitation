import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { KyrgyzDivider, KyrgyzCorner, KyrgyzRosette } from './KyrgyzOrnament';

export default function Header() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      id="invitation-content"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24"
    >
      {/* Parallax bg */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }}
        />
      </motion.div>

      {/* Kyrgyz corner ornaments */}
      <div className="absolute top-8 left-8 opacity-30 pointer-events-none">
        <KyrgyzCorner />
      </div>
      <div className="absolute top-8 right-8 opacity-30 pointer-events-none">
        <KyrgyzCorner flip />
      </div>
      <div className="absolute bottom-8 left-8 opacity-30 pointer-events-none" style={{ transform: 'scaleY(-1)' }}>
        <KyrgyzCorner />
      </div>
      <div className="absolute bottom-8 right-8 opacity-30 pointer-events-none" style={{ transform: 'scale(-1,-1)' }}>
        <KyrgyzCorner />
      </div>

      {/* Floating rosettes */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none hidden md:block">
        <KyrgyzRosette size={56} opacity={0.12} />
      </div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none hidden md:block">
        <KyrgyzRosette size={56} opacity={0.12} />
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-2xl mx-auto"
      >
        {/* Kyrgyz label */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.6em' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="font-sans text-gold/70 text-xs uppercase tracking-[0.5em] mb-2"
        >
          Мы счастливы пригласить вас
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="font-sans text-gold/40 text-[10px] uppercase tracking-[0.4em] mb-8"
        >
          Сизди чакырганыбызга бактыбыз
        </motion.p>

        {/* Kyrgyz divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <KyrgyzDivider className="mb-8" />
        </motion.div>

        {/* Names */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-serif font-light mb-2 leading-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 6rem)' }}
        >
          <span className="gold-shimmer">Александр</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-4 my-2"
        >
          <div className="h-px w-12 bg-gold/40" />
          <span className="font-serif text-gold text-2xl">&</span>
          <div className="h-px w-12 bg-gold/40" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="font-serif font-light leading-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 6rem)' }}
        >
          <span className="gold-shimmer">Виктория</span>
        </motion.h1>

        {/* Kyrgyz divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
        >
          <KyrgyzDivider className="mt-8 mb-8" />
        </motion.div>

        {/* Tagline Russian + Kyrgyz */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="font-serif italic text-white/60 text-xl"
        >
          «Сүйүү — мәңгү сапар экиөн»
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="font-serif italic text-white/30 text-base mt-2"
        >
          «Любовь — это вечное путешествие вдвоём»
        </motion.p>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.3 }}
          className="font-sans text-gold/80 text-sm tracking-[0.4em] uppercase mt-6"
        >
          15 Февраля 2025 · Москва
        </motion.p>
      </motion.div>
    </section>
  );
}
