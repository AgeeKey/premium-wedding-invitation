import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  guests: string;
  attendance: string;
  dietary: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  attendance?: string;
}

export default function RSVP() {
  const [form, setForm] = useState<FormData>({
    name: '', email: '', guests: '1', attendance: '', dietary: '', message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Пожалуйста, введите ваше имя';
    if (!form.email.trim()) newErrors.email = 'Пожалуйста, введите email';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Некорректный email адрес';
    if (!form.attendance) newErrors.attendance = 'Пожалуйста, выберите ответ';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const inputClass = (field?: string) => `
    w-full bg-transparent font-sans text-white text-sm px-4 py-3 rounded-sm outline-none transition-all duration-300
    border ${field && errors[field as keyof FormErrors]
      ? 'border-red-500/60 focus:border-red-400'
      : 'border-white/10 focus:border-gold/60'
    }
    placeholder:text-white/20 focus:bg-white/3
  `;

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-gold/4 blur-[120px]" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-gold/60 text-xs tracking-[0.5em] uppercase mb-4">Подтверждение</p>
          <div className="section-divider mb-6" />
          <h2 className="font-serif text-white text-4xl md:text-5xl font-light">RSVP</h2>
          <p className="font-serif italic text-white/40 text-lg mt-3">
            Просим подтвердить присутствие до 1 февраля 2025
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card rounded-sm p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, type: 'spring', bounce: 0.4 }}
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #C9A84C, #8B6914)' }}
              >
                <Check className="text-luxury-black" size={32} />
              </motion.div>
              <h3 className="font-serif text-gold text-3xl mb-3">Спасибо!</h3>
              <p className="font-sans text-white/60 leading-relaxed">
                Мы получили ваш ответ и с нетерпением ждём встречи с вами на нашем торжестве.
              </p>
              <div className="section-divider mt-8" />
              <p className="font-serif italic text-white/30 text-sm mt-6">
                Александр & Виктория
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
              className="glass-card rounded-sm p-8 md:p-10 space-y-6"
            >
              {/* Name */}
              <div>
                <label className="font-sans text-white/50 text-xs tracking-[0.3em] uppercase block mb-2">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Иван Петров"
                  className={inputClass('name')}
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1 text-red-400 text-xs mt-1"
                  >
                    <AlertCircle size={12} /> {errors.name}
                  </motion.p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="font-sans text-white/50 text-xs tracking-[0.3em] uppercase block mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="ivan@example.com"
                  className={inputClass('email')}
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1 text-red-400 text-xs mt-1"
                  >
                    <AlertCircle size={12} /> {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Attendance */}
              <div>
                <label className="font-sans text-white/50 text-xs tracking-[0.3em] uppercase block mb-3">
                  Подтверждение присутствия *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'yes', label: '✓ С радостью буду' },
                    { value: 'no', label: '✗ К сожалению, нет' },
                  ].map(opt => (
                    <motion.button
                      key={opt.value}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setForm(f => ({ ...f, attendance: opt.value }))}
                      className={`py-3 px-4 rounded-sm text-sm font-sans transition-all duration-300 ${
                        form.attendance === opt.value
                          ? 'bg-gold text-luxury-black font-semibold'
                          : 'border border-white/10 text-white/50 hover:border-gold/40'
                      }`}
                    >
                      {opt.label}
                    </motion.button>
                  ))}
                </div>
                {errors.attendance && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1 text-red-400 text-xs mt-1"
                  >
                    <AlertCircle size={12} /> {errors.attendance}
                  </motion.p>
                )}
              </div>

              {/* Number of guests */}
              <div>
                <label className="font-sans text-white/50 text-xs tracking-[0.3em] uppercase block mb-2">
                  Количество гостей
                </label>
                <select
                  value={form.guests}
                  onChange={e => setForm(f => ({ ...f, guests: e.target.value }))}
                  className={inputClass() + ' cursor-pointer'}
                  style={{ colorScheme: 'dark' }}
                >
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n} style={{ background: '#1a1a1a' }}>
                      {n} {n === 1 ? 'гость' : n < 5 ? 'гостя' : 'гостей'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dietary */}
              <div>
                <label className="font-sans text-white/50 text-xs tracking-[0.3em] uppercase block mb-2">
                  Особенности питания
                </label>
                <input
                  type="text"
                  value={form.dietary}
                  onChange={e => setForm(f => ({ ...f, dietary: e.target.value }))}
                  placeholder="Вегетарианское, аллергии..."
                  className={inputClass()}
                />
              </div>

              {/* Message */}
              <div>
                <label className="font-sans text-white/50 text-xs tracking-[0.3em] uppercase block mb-2">
                  Поздравление или пожелание
                </label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Ваши тёплые слова..."
                  rows={3}
                  className={inputClass() + ' resize-none'}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="btn-gold w-full flex items-center justify-center gap-2"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 rounded-full border-2 border-luxury-black border-t-transparent"
                  />
                ) : (
                  <>
                    <Send size={16} />
                    <span>Отправить ответ</span>
                  </>
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
