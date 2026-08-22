import { motion } from 'framer-motion';
import { Camera, Heart, Music, UtensilsCrossed, Wine, Sparkles } from 'lucide-react';

const events = [
  { time: '14:30', title: 'Сбор гостей', desc: 'Встреча гостей, welcome-напитки, живая музыка', icon: <Wine size={18} /> },
  { time: '15:00', title: 'Церемония', desc: 'Торжественная регистрация брака', icon: <Heart size={18} /> },
  { time: '16:00', title: 'Фотосессия', desc: 'Памятные фото с молодожёнами', icon: <Camera size={18} /> },
  { time: '17:00', title: 'Банкет', desc: 'Изысканный ужин с авторским меню', icon: <UtensilsCrossed size={18} /> },
  { time: '19:00', title: 'Первый танец', desc: 'Торжественный первый танец пары', icon: <Music size={18} /> },
  { time: '20:00', title: 'Вечеринка', desc: 'Живая музыка, танцы, фейерверк', icon: <Sparkles size={18} /> },
];

export default function Timeline() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden md:block" />
      </div>

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-gold/60 text-xs tracking-[0.5em] uppercase mb-4">Программа</p>
          <div className="section-divider mb-6" />
          <h2 className="font-serif text-white text-4xl md:text-5xl font-light">Расписание</h2>
        </motion.div>

        <div className="relative space-y-0">
          {events.map((event, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={event.time}
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`flex items-center gap-6 pb-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Card */}
                <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card rounded-sm p-6 inline-block w-full md:max-w-xs"
                    style={{ cursor: 'default' }}
                  >
                    <p className="font-sans text-gold text-xs tracking-[0.3em] mb-1">{event.time}</p>
                    <h3 className="font-serif text-white text-xl mb-2">{event.title}</h3>
                    <p className="font-sans text-white/50 text-sm leading-relaxed">{event.desc}</p>
                  </motion.div>
                </div>

                {/* Center dot */}
                <div className="relative flex-shrink-0 hidden md:flex items-center justify-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #C9A84C, #8B6914)',
                      boxShadow: '0 0 20px rgba(201,168,76,0.4)',
                    }}
                  >
                    <span className="text-luxury-black">{event.icon}</span>
                  </div>
                </div>

                {/* Mobile icon */}
                <div className="flex-shrink-0 md:hidden">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #C9A84C, #8B6914)' }}
                  >
                    <span className="text-luxury-black">{event.icon}</span>
                  </div>
                </div>

                {/* Spacer for alternate layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
