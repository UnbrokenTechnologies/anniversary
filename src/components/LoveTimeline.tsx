import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Gem, Home, Flame, Calendar, Edit3, Check } from 'lucide-react';
import { triggerHeartBurst } from '../utils/confettiFireworks';

interface TimelineStep {
  id: number;
  title: string;
  subtitle: string;
  quote: string;
  defaultDate: string;
  icon: 'heart' | 'love' | 'ring' | 'home' | 'always';
  color: string;
}

const initialSteps: TimelineStep[] = [
  {
    id: 1,
    title: 'The Day We Met ❤️',
    subtitle: 'Where Destiny Smiled Upon Us',
    quote: 'Two hearts met, and life became more beautiful.',
    defaultDate: 'The Unforgettable First Hello',
    icon: 'heart',
    color: '#ea638c',
  },
  {
    id: 2,
    title: 'The Day Love Began 💞',
    subtitle: 'A Whispered Truth in Our Hearts',
    quote: 'You quietly became the most important person in my world.',
    defaultDate: 'When My Soul Recognized Yours',
    icon: 'love',
    color: '#f9d976',
  },
  {
    id: 3,
    title: 'The Day We Became One 💍',
    subtitle: 'Our Sacred Vow & Wedding Day',
    quote: 'The beginning of our forever.',
    defaultDate: 'September 14, 2022',
    icon: 'ring',
    color: '#ffd1dc',
  },
  {
    id: 4,
    title: 'The Life We Built Together 🏡',
    subtitle: 'A Sanctuary of Laughter & Dreams',
    quote: 'Every day with you became a blessing.',
    defaultDate: 'Our Beautiful Home & Days',
    icon: 'home',
    color: '#d4af37',
  },
  {
    id: 5,
    title: 'Today and Always ❤️',
    subtitle: 'Endless Horizons Ahead',
    quote: 'I still choose you, and I always will.',
    defaultDate: 'Forever and Beyond',
    icon: 'always',
    color: '#ff758f',
  },
];

export const LoveTimeline: React.FC = () => {
  const [steps, setSteps] = useState<TimelineStep[]>(initialSteps);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempDate, setTempDate] = useState<string>('');

  const handleStartEdit = (step: TimelineStep) => {
    setEditingId(step.id);
    setTempDate(step.defaultDate);
  };

  const handleSaveEdit = (id: number) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, defaultDate: tempDate || s.defaultDate } : s))
    );
    setEditingId(null);
  };

  const renderIcon = (icon: TimelineStep['icon'], color: string) => {
    switch (icon) {
      case 'heart':
        return <Heart className="w-5 h-5 fill-current" style={{ color }} />;
      case 'love':
        return <Sparkles className="w-5 h-5" style={{ color }} />;
      case 'ring':
        return <Gem className="w-5 h-5" style={{ color }} />;
      case 'home':
        return <Home className="w-5 h-5" style={{ color }} />;
      case 'always':
        return <Flame className="w-5 h-5 fill-current" style={{ color }} />;
    }
  };

  return (
    <section id="love-story" className="relative py-16 sm:py-28 px-3 sm:px-6 max-w-5xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#d4af37]/30 mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#f6e6b4]">Our Love Story</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="font-serif-luxury text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-[#fffaf0] font-normal px-2"
        >
          Our Beautiful Journey
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-cormorant italic text-base sm:text-2xl text-[#f6e6b4]/80 mt-2 sm:mt-3 px-4"
        >
          Every chapter with you, Sabnam, is my favorite fairy tale.
        </motion.p>
      </div>

      {/* Vertical Timeline Container */}
      <div className="relative">
        {/* Glowing Center Line */}
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#670d22] via-[#d4af37] to-[#ea638c] shadow-[0_0_15px_rgba(212,175,55,0.7)]" />

        <div className="space-y-10 sm:space-y-24">
          {steps.map((step, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: isEven ? -25 : 25, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
                onViewportEnter={() => {
                  if (idx === 2) triggerHeartBurst(0.5, 0.6);
                }}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? 'sm:flex-row-reverse' : ''
                } group`}
              >
                {/* Content Card */}
                <div
                  className={`ml-10 sm:ml-0 sm:w-[44%] w-[calc(100%-2.5rem)] ${
                    isEven ? 'sm:text-right' : 'sm:text-left'
                  }`}
                >
                  <div className="glass-card-interactive p-4 sm:p-8 rounded-2xl sm:rounded-3xl relative overflow-hidden">
                    {/* Subtle Corner Glow */}
                    <div
                      className="absolute -right-8 -top-8 w-28 h-28 rounded-full blur-2xl opacity-20 pointer-events-none"
                      style={{ backgroundColor: step.color }}
                    />

                    {/* Date Badge / Edit */}
                    <div
                      className={`flex items-center gap-2 mb-3 text-xs tracking-wider font-medium text-[#f6e6b4]/75 ${
                        isEven ? 'sm:justify-end' : 'sm:justify-start'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                      {editingId === step.id ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={tempDate}
                            onChange={(e) => setTempDate(e.target.value)}
                            className="bg-[#140207] border border-[#d4af37] px-2 py-0.5 rounded text-xs text-[#fffaf0] outline-none"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveEdit(step.id)}
                            className="p-1 hover:text-[#d4af37]"
                          >
                            <Check className="w-3.5 h-3.5 text-green-400" />
                          </button>
                        </div>
                      ) : (
                        <span className="flex items-center gap-1 group/edit cursor-pointer" onClick={() => handleStartEdit(step)}>
                          <span>{step.defaultDate}</span>
                          <Edit3 className="w-3 h-3 opacity-0 group-hover/edit:opacity-100 transition-opacity text-[#d4af37]" />
                        </span>
                      )}
                    </div>

                    {/* Step Title */}
                    <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#fffaf0] font-medium mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs tracking-wider uppercase text-[#ea638c] font-medium mb-4">
                      {step.subtitle}
                    </p>

                    {/* Romantic Quote */}
                    <blockquote className="font-cormorant italic text-lg sm:text-xl text-[#f3e5ab] leading-relaxed border-l-2 border-[#d4af37]/40 pl-3 my-2">
                      “{step.quote}”
                    </blockquote>
                  </div>
                </div>

                {/* Node on Timeline Center */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1b030b] border-2 border-[#d4af37] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.7)] z-10 transition-transform cursor-pointer"
                    onClick={() => triggerHeartBurst(0.5, 0.5)}
                  >
                    {renderIcon(step.icon, step.color)}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
