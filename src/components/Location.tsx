import { motion } from 'framer-motion';
import { MapPin, Navigation, Phone, Globe } from 'lucide-react';

export default function Location() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/3 blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-gold/60 text-xs tracking-[0.5em] uppercase mb-4">Место события</p>
          <div className="section-divider mb-6" />
          <h2 className="font-serif text-white text-4xl md:text-5xl font-light">Локация</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square md:aspect-auto md:h-80 rounded-sm overflow-hidden"
            style={{ border: '1px solid rgba(201,168,76,0.3)' }}
          >
            {/* Decorative map */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, #0f1117 0%, #1a1a2a 50%, #0f1117 100%)' }}
            >
              {/* Grid lines */}
              <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 320">
                {[...Array(10)].map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 32} x2="400" y2={i * 32} stroke="#C9A84C" strokeWidth="0.5" />
                ))}
                {[...Array(13)].map((_, i) => (
                  <line key={`v${i}`} x1={i * 32} y1="0" x2={i * 32} y2="320" stroke="#C9A84C" strokeWidth="0.5" />
                ))}
                {/* Decorative streets */}
                <path d="M 80 0 L 80 320" stroke="#C9A84C" strokeWidth="2" opacity="0.4" />
                <path d="M 200 0 L 200 320" stroke="#C9A84C" strokeWidth="2" opacity="0.4" />
                <path d="M 0 120 L 400 120" stroke="#C9A84C" strokeWidth="2" opacity="0.4" />
                <path d="M 0 200 L 400 200" stroke="#C9A84C" strokeWidth="2" opacity="0.4" />
                <path d="M 140 60 L 260 180 L 340 180" stroke="#C9A84C" strokeWidth="1.5" opacity="0.3" />
              </svg>

              {/* Pin */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex flex-col items-center"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-2"
                    style={{
                      background: 'linear-gradient(135deg, #C9A84C, #8B6914)',
                      boxShadow: '0 0 30px rgba(201,168,76,0.5)',
                    }}
                  >
                    <MapPin className="text-luxury-black" size={24} />
                  </div>
                  {/* Pin shadow */}
                  <motion.div
                    animate={{ scaleX: [1, 0.8, 1], opacity: [0.4, 0.2, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-6 h-2 rounded-full bg-gold/40 blur-sm"
                  />
                </motion.div>
              </div>

              {/* Pulse rings */}
              {[1, 2, 3].map(ring => (
                <motion.div
                  key={ring}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/30"
                  animate={{ scale: [0, 2.5], opacity: [0.5, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: ring * 0.7 }}
                  style={{ width: 60, height: 60 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div>
              <h3 className="font-serif text-gold text-2xl mb-2">Grand Hall Moscow</h3>
              <p className="font-sans text-white/60 text-sm leading-relaxed">
                Один из самых престижных банкетных залов Москвы с панорамным видом на Кремль
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: <MapPin size={16} />, text: 'Тверская ул., 15, Москва, 125009' },
                { icon: <Navigation size={16} />, text: 'Метро: Охотный Ряд, 5 мин пешком' },
                { icon: <Phone size={16} />, text: '+7 (495) 123-45-67' },
                { icon: <Globe size={16} />, text: 'grandhall.moscow' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-gold flex-shrink-0">{item.icon}</span>
                  <p className="font-sans text-white/60 text-sm">{item.text}</p>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="inline-flex items-center gap-2 btn-gold"
              onClick={(e) => e.preventDefault()}
            >
              <Navigation size={16} />
              <span>Построить маршрут</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
