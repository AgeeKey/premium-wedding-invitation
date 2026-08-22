import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

// Using placeholder gradient images
const photos = [
  { id: 1, bg: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)', label: 'Наша история' },
  { id: 2, bg: 'linear-gradient(135deg, #2a1a0a 0%, #3a2a1a 100%)', label: 'Помолвка' },
  { id: 3, bg: 'linear-gradient(135deg, #0a1a2a 0%, #1a2a3a 100%)', label: 'Путешествие' },
  { id: 4, bg: 'linear-gradient(135deg, #1a0a1a 0%, #2a1a2a 100%)', label: 'Портрет' },
  { id: 5, bg: 'linear-gradient(135deg, #0a1a0a 0%, #1a2a1a 100%)', label: 'Семья' },
  { id: 6, bg: 'linear-gradient(135deg, #1a1a0a 0%, #2a2a1a 100%)', label: 'Вместе' },
];

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-gold/60 text-xs tracking-[0.5em] uppercase mb-4">Галерея</p>
          <div className="section-divider mb-6" />
          <h2 className="font-serif text-white text-4xl md:text-5xl font-light">Наши Моменты</h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelected(photo.id)}
              className="relative aspect-square rounded-sm overflow-hidden cursor-pointer group"
              style={{ background: photo.bg, border: '1px solid rgba(201,168,76,0.1)' }}
            >
              {/* Hover overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
              >
                <div className="flex flex-col items-center gap-2">
                  <ZoomIn className="text-gold" size={24} />
                  <p className="font-sans text-white text-xs tracking-widest uppercase">{photo.label}</p>
                </div>
              </motion.div>

              {/* Gold shimmer effect */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  background: 'linear-gradient(45deg, transparent 30%, rgba(201,168,76,0.3) 50%, transparent 70%)',
                  backgroundSize: '200% 200%',
                }}
              />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="font-sans text-gold/60 text-xs tracking-widest uppercase">{photo.label}</p>
              </div>

              {/* Gold corner */}
              <div className="absolute top-2 right-2 w-4 h-4 opacity-60">
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M0 0 L16 0 L16 2 M0 0 L0 16 L2 16" stroke="#C9A84C" strokeWidth="1" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selected !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)' }}
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={e => e.stopPropagation()}
                className="relative w-full max-w-2xl aspect-square rounded-sm"
                style={{
                  background: photos.find(p => p.id === selected)?.bg,
                  border: '1px solid rgba(201,168,76,0.3)',
                  boxShadow: '0 40px 80px rgba(201,168,76,0.2)',
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="font-serif text-gold/40 text-xl italic">
                    {photos.find(p => p.id === selected)?.label}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.4)' }}
                >
                  <X className="text-gold" size={18} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
