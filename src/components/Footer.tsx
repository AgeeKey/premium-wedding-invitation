import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-20 px-6 overflow-hidden border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full bg-gold/4 blur-[80px]" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10 text-center">
        {/* Monogram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div
            className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6"
            style={{
              background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(240,208,96,0.05))',
              border: '1px solid rgba(201,168,76,0.3)',
            }}
          >
            <span className="font-serif text-gold text-2xl font-medium">A&V</span>
          </div>

          <h3 className="font-serif font-light text-3xl text-white mb-2">
            <span className="gold-shimmer">Александр & Виктория</span>
          </h3>
          <p className="font-serif italic text-white/40 text-lg">15 февраля 2025</p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="section-divider mb-8"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif italic text-white/30 text-base mb-8 leading-relaxed"
        >
          «Счастье не в том, чтобы делать всегда, что хочешь,<br />
          а в том, чтобы всегда хотеть того, что делаешь.»
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex items-center justify-center gap-2 text-white/20 text-xs font-sans tracking-widest"
        >
          <span>Создано с</span>
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart size={12} className="text-gold/50 fill-gold/50" />
          </motion.span>
          <span>для нашего особого дня</span>
        </motion.div>

        {/* Decorative bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex justify-center gap-3 mt-8"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-gold/30"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </div>
    </footer>
  );
}
