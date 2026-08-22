import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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

      {/* Decorative corner ornaments */}
      <div className="absolute top-8 left-8 w-16 h-16 opacity-30">
        <svg viewBox="0 0 60 60" fill="none">
          <path d="M0 0 L60 0 L60 4 M0 0 L0 60 L4 60" stroke="#C9A84C" strokeWidth="1" />
          <path d="M10 10 L20 10 M10 10 L10 20" stroke="#C9A84C" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="absolute top-8 right-8 w-16 h-16 opacity-30 scale-x-[-1]">
        <svg viewBox="0 0 60 60" fill="none">
          <path d="M0 0 L60 0 L60 4 M0 0 L0 60 L4 60" stroke="#C9A84C" strokeWidth="1" />
          <path d="M10 10 L20 10 M10 10 L10 20" stroke="#C9A84C" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="absolute bottom-8 left-8 w-16 h-16 opacity-30 scale-y-[-1]">
        <svg viewBox="0 0 60 60" fill="none">
          <path d="M0 0 L60 0 L60 4 M0 0 L0 60 L4 60" stroke="#C9A84C" strokeWidth="1" />
          <path d="M10 10 L20 10 M10 10 L10 20" stroke="#C9A84C" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="absolute bottom-8 right-8 w-16 h-16 opacity-30 scale-x-[-1] scale-y-[-1]">
        <svg viewBox="0 0 60 60" fill="none">
          <path d="M0 0 L60 0 L60 4 M0 0 L0 60 L4 60" stroke="#C9A84C" strokeWidth="1" />
          <path d="M10 10 L20 10 M10 10 L10 20" stroke="#C9A84C" strokeWidth="0.5" />
        </svg>
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-2xl mx-auto"
      >
        {/* Small label */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.6em' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="font-sans text-gold/70 text-xs uppercase tracking-[0.5em] mb-8"
        >
          Мы счастливы пригласить вас
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="section-divider mb-8"
        />

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

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="section-divider mt-8 mb-8"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="font-serif italic text-white/60 text-xl"
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
