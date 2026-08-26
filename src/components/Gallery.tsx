import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { KyrgyzDivider, KyrgyzCorner } from './KyrgyzOrnament';

const photos = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    label: 'Той башталды',
    labelRu: 'Церемония',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1511285560929-f9fe7c99bb8a?auto=format&fit=crop&w=800&q=80',
    label: 'Жаш жубайлар',
    labelRu: 'Молодожёны',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80',
    label: 'Биринчи бий',
    labelRu: 'Первый танец',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    label: 'Сүйүнүч',
    labelRu: 'Детали',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1519225421980-9e0fc14ac8fc?auto=format&fit=crop&w=800&q=80',
    label: 'Кыздын сүрөтү',
    labelRu: 'Портрет невесты',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=800&q=80',
    label: 'Гүл чечек',
    labelRu: 'Букет',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1542038374114-66ab7e2aadb2?auto=format&fit=crop&w=800&q=80',
    label: 'Жаратылыш',
    labelRu: 'Природа',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1529636798458-0baa5c9e0c20?auto=format&fit=crop&w=800&q=80',
    label: 'Ант берүү',
    labelRu: 'Клятва',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1465495976447-4039db64aa1b?auto=format&fit=crop&w=800&q=80',
    label: 'Мейман',
    labelRu: 'Гости',
  },
];

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  const selectedIdx = selected !== null ? photos.findIndex(p => p.id === selected) : -1;
  const selectedPhoto = selectedIdx >= 0 ? photos[selectedIdx] : null;

  const navPhoto = (dir: 1 | -1) => {
    const next = (selectedIdx + dir + photos.length) % photos.length;
    setSelected(photos[next].id);
  };

  useEffect(() => {
    if (selected === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelected(null);
      } else if (e.key === 'ArrowLeft') {
        const next = (selectedIdx - 1 + photos.length) % photos.length;
        setSelected(photos[next].id);
      } else if (e.key === 'ArrowRight') {
        const next = (selectedIdx + 1 + photos.length) % photos.length;
        setSelected(photos[next].id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selected, selectedIdx]);

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Kyrgyz ornament accents */}
      <div className="absolute top-8 left-8 pointer-events-none">
        <KyrgyzCorner opacity={0.2} />
      </div>
      <div className="absolute top-8 right-8 pointer-events-none">
        <KyrgyzCorner opacity={0.2} flip />
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-gold/60 text-xs tracking-[0.5em] uppercase mb-4">Галерея · Сүрөт</p>
          <KyrgyzDivider className="mb-6 max-w-xs mx-auto" />
          <h2 className="font-serif text-white text-4xl md:text-5xl font-light">Биздин Учурлар</h2>
          <p className="font-serif italic text-white/30 text-lg mt-3">Наши Моменты</p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelected(photo.id)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelected(photo.id);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`View photo: ${photo.labelRu}`}
              className="relative aspect-square rounded-sm overflow-hidden cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              style={{ border: '1px solid rgba(201,168,76,0.12)' }}
            >
              {/* Real photo */}
              <img
                src={photo.src}
                alt={photo.labelRu}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Hover overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
              >
                <div className="flex flex-col items-center gap-2">
                  <ZoomIn className="text-gold" size={24} />
                  <p className="font-sans text-white text-xs tracking-widest uppercase">{photo.label}</p>
                </div>
              </motion.div>

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="font-sans text-gold/80 text-xs tracking-[0.15em] uppercase">{photo.label}</p>
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
          {selected !== null && selectedPhoto && (
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
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={e => e.stopPropagation()}
                className="relative w-full max-w-2xl rounded-sm overflow-hidden"
                style={{
                  border: '1px solid rgba(201,168,76,0.3)',
                  boxShadow: '0 40px 80px rgba(201,168,76,0.2)',
                  aspectRatio: '1',
                }}
              >
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.labelRu}
                  className="w-full h-full object-cover"
                />
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="font-serif text-gold text-base">{selectedPhoto.label}</p>
                  <p className="font-sans text-white/50 text-xs tracking-widest mt-0.5">{selectedPhoto.labelRu}</p>
                </div>

                {/* Nav buttons */}
                <button
                  onClick={() => navPhoto(-1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  style={{ background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.4)' }}
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="text-gold" size={18} />
                </button>
                <button
                  onClick={() => navPhoto(1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  style={{ background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.4)' }}
                  aria-label="Next photo"
                >
                  <ChevronRight className="text-gold" size={18} />
                </button>

                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  style={{ background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.4)' }}
                  aria-label="Close photo preview"
                >
                  <X className="text-gold" size={16} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
