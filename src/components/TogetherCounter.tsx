import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Heart, Sparkles, Clock, Edit2, Check } from 'lucide-react';

interface TimeElapsed {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const TogetherCounter: React.FC = () => {
  // Exact marriage date: September 14, 2022
  const [startDateStr, setStartDateStr] = useState<string>(() => {
    const saved = localStorage.getItem('sabnam_anniversary_date');
    if (saved && saved !== '2021-09-13T09:00:00') return saved;
    return '2022-09-14T00:00:00';
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempDateInput, setTempDateInput] = useState('2022-09-14');

  const [timeElapsed, setTimeElapsed] = useState<TimeElapsed>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDateStr).getTime();
      const now = Date.now();
      const diffMs = Math.max(0, now - start);

      const totalSeconds = Math.floor(diffMs / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);

      // Approximate calendar years & months
      const startDate = new Date(start);
      const currentDate = new Date(now);

      let years = currentDate.getFullYear() - startDate.getFullYear();
      let months = currentDate.getMonth() - startDate.getMonth();
      let days = currentDate.getDate() - startDate.getDate();

      if (days < 0) {
        months -= 1;
        const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        days += prevMonthDays;
      }

      if (months < 0) {
        years -= 1;
        months += 12;
      }

      const hours = currentDate.getHours() - startDate.getHours();
      const actualHours = (hours + 24) % 24;
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();

      setTimeElapsed({
        years: Math.max(0, years),
        months: Math.max(0, months),
        days: Math.max(0, days),
        hours: actualHours,
        minutes,
        seconds,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [startDateStr]);

  const handleSaveDate = () => {
    if (tempDateInput) {
      const newFull = `${tempDateInput}T00:00:00`;
      setStartDateStr(newFull);
      localStorage.setItem('sabnam_anniversary_date', newFull);
    }
    setIsEditing(false);
  };

  const counterCards = [
    { label: 'Years', value: timeElapsed.years },
    { label: 'Months', value: timeElapsed.months },
    { label: 'Days', value: timeElapsed.days },
    { label: 'Hours', value: timeElapsed.hours },
    { label: 'Minutes', value: timeElapsed.minutes },
    { label: 'Seconds', value: timeElapsed.seconds },
  ];

  return (
    <section id="together-counter" className="relative py-16 sm:py-28 px-3 sm:px-6 max-w-5xl mx-auto text-center overflow-hidden">
      {/* Background Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#670d22]/25 via-[#ea638c]/15 to-[#d4af37]/15 blur-[130px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 sm:mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#d4af37]/30 mb-3">
          <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#f6e6b4]">Every Second Is Sacred</span>
        </div>

        <h2 className="font-serif-luxury text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-[#fffaf0] font-normal px-2">
          Loving You Since...
        </h2>

        {/* Date Edit Control */}
        <div className="mt-2.5 sm:mt-3 flex items-center justify-center gap-2 text-xs sm:text-sm text-[#f6e6b4]/80 px-2">
          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d4af37] shrink-0" />
          {isEditing ? (
            <div className="flex items-center gap-2 bg-[#1b030c] p-1.5 rounded-lg border border-[#d4af37]">
              <input
                type="date"
                value={tempDateInput}
                onChange={(e) => setTempDateInput(e.target.value)}
                className="bg-transparent text-xs text-[#fffaf0] outline-none"
              />
              <button
                onClick={handleSaveDate}
                className="px-2 py-0.5 bg-[#d4af37] text-[#0f0206] text-xs font-semibold rounded hover:bg-[#f6e6b4]"
              >
                <Check className="w-3 h-3 inline mr-1" />
                Save
              </button>
            </div>
          ) : (
            <div
              onClick={() => setIsEditing(true)}
              className="group flex items-center gap-1.5 cursor-pointer hover:text-[#fffaf0] transition-colors"
            >
              <span className="font-cormorant text-base sm:text-xl text-[#f3e5ab]">
                Our Wedding Day: {new Date(startDateStr).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <Edit2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-60 group-hover:opacity-100 text-[#d4af37]" />
            </div>
          )}
        </div>
      </motion.div>

      {/* Counters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4 lg:gap-6">
        {counterCards.map((card, idx) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08, duration: 0.5 }}
            className="glass-card-interactive p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#d4af37]/35 relative overflow-hidden group flex flex-col items-center justify-center"
          >
            {/* Number Display with Flip / Glow Animation */}
            <div className="relative">
              <span className="font-serif-luxury text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#fffaf0] group-hover:text-[#f6e6b4] transition-colors drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                {String(card.value).padStart(2, '0')}
              </span>
            </div>

            {/* Label */}
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#ea638c] font-medium mt-1 sm:mt-2">
              {card.label}
            </span>

            {/* Subtle bottom light line */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent group-hover:via-[#ea638c]" />
          </motion.div>
        ))}
      </div>

      {/* Together Banner & Closing line */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-12 flex flex-col items-center"
      >
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#670d22] to-[#ea638c] text-base sm:text-lg font-medium text-[#fffaf0] shadow-xl">
          <Heart className="w-5 h-5 fill-current text-white animate-pulse" />
          <span>Together ❤️</span>
        </div>

        <p className="font-cormorant italic text-2xl sm:text-3xl text-[#f6e6b4] mt-6 tracking-wide">
          “And I still want forever more...”
        </p>
      </motion.div>
    </section>
  );
};
