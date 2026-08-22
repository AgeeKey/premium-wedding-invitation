import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WEDDING_DATE = new Date('2025-02-15T15:00:00');

function getTimeLeft() {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

interface UnitProps {
  value: number;
  label: string;
}

function CountUnit({ value, label }: UnitProps) {
  return (
    <motion.div
      className="flex flex-col items-center"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center rounded-sm"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(201,168,76,0.3)',
          boxShadow: 'inset 0 1px 0 rgba(201,168,76,0.1)',
        }}
      >
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-sm opacity-20"
          style={{ background: 'radial-gradient(circle at center, rgba(201,168,76,0.3), transparent 70%)' }}
        />
        <motion.span
          key={value}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="font-serif font-light relative z-10"
          style={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            background: 'linear-gradient(135deg, #C9A84C 0%, #F0D060 50%, #C9A84C 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </div>
      <p className="font-sans text-white/40 text-xs tracking-[0.3em] uppercase mt-3">{label}</p>
    </motion.div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const isPast = WEDDING_DATE.getTime() < new Date().getTime();

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #0f0f0f 50%, #0A0A0A 100%)' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-gold/5 blur-[100px]" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-gold/60 text-xs tracking-[0.5em] uppercase mb-4">До свадьбы</p>
          <div className="section-divider mb-6" />
          <h2 className="font-serif text-white text-4xl md:text-5xl font-light">
            {isPast ? 'Мы поженились!' : 'Обратный отсчёт'}
          </h2>
          {!isPast && (
            <p className="font-serif italic text-white/40 text-lg mt-3">
              15 февраля 2025 в 15:00
            </p>
          )}
        </motion.div>

        {isPast ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="font-serif text-gold text-6xl">💍</p>
            <p className="font-serif text-white text-2xl mt-4">Мы вместе навсегда</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-4 md:gap-8 flex-wrap"
          >
            <CountUnit value={timeLeft.days} label="Дней" />
            <div className="font-serif text-gold/60 text-4xl pb-8">:</div>
            <CountUnit value={timeLeft.hours} label="Часов" />
            <div className="font-serif text-gold/60 text-4xl pb-8">:</div>
            <CountUnit value={timeLeft.minutes} label="Минут" />
            <div className="font-serif text-gold/60 text-4xl pb-8">:</div>
            <CountUnit value={timeLeft.seconds} label="Секунд" />
          </motion.div>
        )}

        {/* Progress bar */}
        {!isPast && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-12 max-w-md mx-auto"
          >
            <div className="h-px bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.min(100, (1 - timeLeft.days / 365) * 100)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.8 }}
                className="h-full"
                style={{ background: 'linear-gradient(90deg, #C9A84C, #F0D060)' }}
              />
            </div>
            <p className="font-sans text-white/30 text-xs text-center mt-2 tracking-widest">
              Путь к нашему дню
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
