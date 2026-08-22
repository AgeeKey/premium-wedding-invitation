import { motion } from 'framer-motion';

const palette = [
  { color: '#0A0A0A', name: 'Jet Black', desc: 'Строгий чёрный' },
  { color: '#C9A84C', name: 'Champagne Gold', desc: 'Золото шампань' },
  { color: '#F5F5F5', name: 'Ivory White', desc: 'Слоновая кость' },
  { color: '#2C2C2C', name: 'Charcoal', desc: 'Тёмный уголь' },
  { color: '#8B6914', name: 'Deep Gold', desc: 'Тёмное золото' },
  { color: '#D4C5A9', name: 'Sand Beige', desc: 'Песчаный беж' },
];

const rules = [
  { icon: '🎩', title: 'Мужчины', desc: 'Классический смокинг или костюм-тройка в тёмных тонах. Бабочка или галстук приветствуется.' },
  { icon: '👗', title: 'Женщины', desc: 'Вечернее или коктейльное платье. Предпочтительные оттенки: чёрный, золотой, кремовый.' },
  { icon: '❌', title: 'Пожалуйста, избегайте', desc: 'Белый и айвори цвет зарезервирован для невесты. Джинсы и повседневная одежда неуместны.' },
];

export default function DressCode() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-dark to-luxury-black" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-gold/60 text-xs tracking-[0.5em] uppercase mb-4">Dress Code</p>
          <div className="section-divider mb-6" />
          <h2 className="font-serif text-white text-4xl md:text-5xl font-light">Black Tie</h2>
          <p className="font-serif italic text-white/50 text-lg mt-3">Элегантность — это наш язык</p>
        </motion.div>

        {/* Color palette */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <p className="font-sans text-center text-white/40 text-xs tracking-[0.4em] uppercase mb-8">
            Цветовая палитра
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {palette.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.08, y: -4 }}
                className="flex flex-col items-center gap-2 cursor-default"
              >
                <div
                  className="w-16 h-16 rounded-sm"
                  style={{
                    backgroundColor: item.color,
                    border: item.color === '#F5F5F5' || item.color === '#D4C5A9'
                      ? '1px solid rgba(255,255,255,0.2)'
                      : '1px solid rgba(201,168,76,0.2)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  }}
                />
                <p className="font-sans text-white/70 text-xs text-center">{item.name}</p>
                <p className="font-sans text-white/30 text-xs text-center">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Rules */}
        <div className="grid md:grid-cols-3 gap-6">
          {rules.map((rule, i) => (
            <motion.div
              key={rule.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-sm p-8 text-center"
            >
              <div className="text-4xl mb-4">{rule.icon}</div>
              <h3 className="font-serif text-gold text-xl mb-3">{rule.title}</h3>
              <p className="font-sans text-white/50 text-sm leading-relaxed">{rule.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
