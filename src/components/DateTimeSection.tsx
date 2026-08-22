import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Heart } from 'lucide-react';

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  index: number;
}

function InfoCard({ icon, label, value, sub, index }: InfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="glass-card rounded-sm p-8 text-center flex-1 min-w-[200px] cursor-default"
      style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}
    >
      <div className="flex justify-center mb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(240,208,96,0.05))', border: '1px solid rgba(201,168,76,0.3)' }}
        >
          <span className="text-gold">{icon}</span>
        </div>
      </div>
      <p className="font-sans text-gold/60 text-xs tracking-[0.3em] uppercase mb-2">{label}</p>
      <p className="font-serif text-white text-2xl font-medium">{value}</p>
      {sub && <p className="font-sans text-white/40 text-sm mt-1">{sub}</p>}
    </motion.div>
  );
}

export default function DateTimeSection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* BG decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 rounded-full bg-gold/5 blur-[80px]" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 rounded-full bg-gold/5 blur-[80px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-gold/60 text-xs tracking-[0.5em] uppercase mb-4">Детали торжества</p>
          <div className="section-divider mb-6" />
          <h2 className="font-serif text-white text-4xl md:text-5xl font-light">
            Дата & Время
          </h2>
        </motion.div>

        {/* Big date display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-16 relative"
        >
          <div className="relative inline-block">
            <p className="font-serif font-light leading-none text-shadow-gold"
              style={{
                fontSize: 'clamp(5rem, 20vw, 12rem)',
                background: 'linear-gradient(135deg, #C9A84C 0%, #F0D060 40%, #C9A84C 70%, #8B6914 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              15
            </p>
          </div>
          <p className="font-serif text-white/70 text-3xl md:text-4xl -mt-4 tracking-[0.3em]">
            Февраля
          </p>
          <p className="font-sans text-gold/60 text-sm tracking-[0.5em] uppercase mt-3">
            2025 года
          </p>
        </motion.div>

        {/* Info cards */}
        <div className="flex flex-wrap gap-4 justify-center">
          <InfoCard icon={<Calendar size={20} />} label="Дата" value="15 февраля" sub="суббота" index={0} />
          <InfoCard icon={<Clock size={20} />} label="Время" value="15:00" sub="Начало регистрации в 14:30" index={1} />
          <InfoCard icon={<MapPin size={20} />} label="Место" value="Grand Hall" sub="Тверская ул., 15, Москва" index={2} />
          <InfoCard icon={<Heart size={20} />} label="Формат" value="Чёрный галстук" sub="Black Tie Optional" index={3} />
        </div>
      </div>
    </section>
  );
}
