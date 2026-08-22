import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, Music } from 'lucide-react';

const TRACKS = [
  {
    title: 'Romantic Serenade',
    artist: 'SoundHelix',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    label: 'Романтика',
  },
  {
    title: 'Tender Waltz',
    artist: 'SoundHelix',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    label: 'Вальс',
  },
  {
    title: 'Golden Moment',
    artist: 'SoundHelix',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
    label: 'Золотой',
  },
  {
    title: 'Eternal Love',
    artist: 'SoundHelix',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    label: 'Мәңгү Сүйүү',
  },
  {
    title: 'Mountain Dream',
    artist: 'SoundHelix',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3',
    label: 'Тоо Бийик',
  },
];

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [trackIdx, setTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);

  const track = TRACKS[trackIdx];

  // Listen for envelope-opened custom event to auto-start
  useEffect(() => {
    const handler = () => {
      setIsExpanded(true);
      const audio = audioRef.current;
      if (audio) {
        audio.volume = volume;
        audio.play().then(() => setIsPlaying(true)).catch(() => {/* autoplay blocked */});
      }
    };
    window.addEventListener('envelope-opened', handler);
    return () => window.removeEventListener('envelope-opened', handler);
  }, [volume]);

  // Sync volume & mute
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Track progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const update = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration);
    };
    audio.addEventListener('timeupdate', update);
    return () => audio.removeEventListener('timeupdate', update);
  }, []);

  // Auto-advance to next track
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = () => setTrackIdx(i => (i + 1) % TRACKS.length);
    audio.addEventListener('ended', next);
    return () => audio.removeEventListener('ended', next);
  }, []);

  // Load new track when index changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const wasPlaying = isPlaying;
    if (wasPlaying) {
      const handler = () => {
        audio.play().catch(() => {});
        audio.removeEventListener('canplay', handler);
      };
      audio.addEventListener('canplay', handler);
    }
    audio.load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIdx]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const prev = () => setTrackIdx(i => (i - 1 + TRACKS.length) % TRACKS.length);
  const next = () => setTrackIdx(i => (i + 1) % TRACKS.length);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
  };

  return (
    <>
      <audio ref={audioRef} src={track.url} preload="metadata" />

      {/* Floating toggle button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center"
        style={{
          background: isPlaying
            ? 'linear-gradient(135deg, var(--color-accent), var(--color-accent-light))'
            : 'rgba(201,168,76,0.15)',
          border: '1px solid rgba(201,168,76,0.5)',
          boxShadow: isPlaying ? '0 0 24px rgba(201,168,76,0.5)' : '0 4px 16px rgba(0,0,0,0.5)',
        }}
        onClick={() => setIsExpanded(v => !v)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle music player"
      >
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={isPlaying ? { duration: 4, repeat: Infinity, ease: 'linear' } : {}}
        >
          <Music size={20} className={isPlaying ? 'text-luxury-black' : 'text-gold'} />
        </motion.div>
      </motion.button>

      {/* Player panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: 80, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 80, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-20 right-6 z-50 w-72"
            style={{
              background: 'rgba(10,10,10,0.92)',
              border: '1px solid rgba(201,168,76,0.3)',
              backdropFilter: 'blur(24px)',
              borderRadius: '4px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.1)',
            }}
          >
            {/* Header */}
            <div className="px-4 pt-4 pb-2 border-b border-white/5">
              <p className="font-sans text-gold/50 text-[10px] tracking-[0.4em] uppercase">Музыка Той</p>
            </div>

            {/* Track list */}
            <div className="px-4 py-3 space-y-1">
              {TRACKS.map((t, i) => (
                <button
                  key={i}
                  onClick={() => { setTrackIdx(i); const a = audioRef.current; if (a) { const h = () => { a.play().then(() => setIsPlaying(true)).catch(() => {}); a.removeEventListener('canplay', h); }; a.addEventListener('canplay', h); a.load(); } }}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-sm text-left transition-all duration-200"
                  style={{
                    background: i === trackIdx ? 'rgba(201,168,76,0.12)' : 'transparent',
                    border: i === trackIdx ? '1px solid rgba(201,168,76,0.2)' : '1px solid transparent',
                  }}
                >
                  {i === trackIdx && isPlaying ? (
                    <motion.div
                      animate={{ scaleY: [0.4, 1, 0.4] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="w-3 h-3 flex items-end gap-px"
                    >
                      {[0, 1, 2].map(b => (
                        <div key={b} className="w-0.5 bg-gold rounded-full"
                          style={{ height: `${40 + b * 20}%` }} />
                      ))}
                    </motion.div>
                  ) : (
                    <div className="w-3 h-3 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full"
                        style={{ background: i === trackIdx ? 'var(--color-accent)' : 'rgba(255,255,255,0.2)' }} />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`font-sans text-xs truncate ${i === trackIdx ? 'text-gold' : 'text-white/50'}`}>
                      {t.label}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Progress bar */}
            <div className="px-4 pb-2">
              <div
                className="h-1 rounded-full cursor-pointer overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.1)' }}
                onClick={seek}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, var(--color-accent), var(--color-accent-light))',
                    width: `${progress * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="px-4 pb-4 flex items-center gap-2">
              <button onClick={prev} className="p-1.5 text-white/40 hover:text-gold transition-colors" aria-label="Previous">
                <SkipBack size={14} />
              </button>

              <button
                onClick={togglePlay}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-light))' }}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={14} className="text-luxury-black" /> : <Play size={14} className="text-luxury-black ml-0.5" />}
              </button>

              <button onClick={next} className="p-1.5 text-white/40 hover:text-gold transition-colors" aria-label="Next">
                <SkipForward size={14} />
              </button>

              {/* Volume */}
              <div className="flex items-center gap-1.5 ml-auto">
                <button
                  onClick={() => setIsMuted(m => !m)}
                  className="text-white/40 hover:text-gold transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={e => { setVolume(Number(e.target.value)); setIsMuted(false); }}
                  className="w-14 accent-gold"
                  aria-label="Volume"
                  style={{ accentColor: 'var(--color-accent)' }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
