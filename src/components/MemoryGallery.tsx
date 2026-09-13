import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, X, ZoomIn, Camera, Image as ImageIcon } from 'lucide-react';
import { triggerHeartBurst } from '../utils/confettiFireworks';

interface PhotoItem {
  id: number;
  url: string;
  caption: string;
  location: string;
  rotation: number;
}

const defaultPhotos: PhotoItem[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200&auto=format&fit=crop', // Romantic wedding rings & hands
    caption: 'My Favorite Smile ❤️',
    location: 'Forever In My Heart',
    rotation: -2,
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop', // Golden hour romantic walk
    caption: 'Beautiful Moments Together',
    location: 'Golden Sunset Horizons',
    rotation: 3,
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop', // Couple silhouette sunset love
    caption: 'You & Me Forever',
    location: 'Under The Twilight Sky',
    rotation: -3,
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop', // Elegant wedding flowers & celebration
    caption: 'The Best Part of My Life',
    location: 'Every Second With You',
    rotation: 2,
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop', // Holding hands romantic walk
    caption: 'My Home Is You',
    location: 'Wherever You Are',
    rotation: -2.5,
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop', // Beautiful portrait look
    caption: 'Endless Laughter & Grace',
    location: 'Sabnam, My Queen',
    rotation: 3.5,
  },
];

export const MemoryGallery: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoItem[]>(defaultPhotos);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPhoto]);

  const handleCustomImageUpload = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotos((prev) =>
            prev.map((p) => (p.id === id ? { ...p, url: event.target!.result as string } : p))
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="memory-gallery" className="relative py-28 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#670d22]/20 via-[#d4af37]/10 to-transparent blur-[140px] pointer-events-none" />

      {/* Heading */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#d4af37]/30 mb-3"
        >
          <Camera className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#f6e6b4]">Cherished Keepsakes</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#fffaf0] font-normal"
        >
          3D Memory Gallery
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-cormorant italic text-lg sm:text-2xl text-[#f6e6b4]/80 mt-2"
        >
          Snapshots of love frozen in time. Click any memory to expand into full bloom.
        </motion.p>
      </div>

      {/* Gallery Grid of 3D Polaroid Floating Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 perspective-1000">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{
              scale: 1.05,
              rotate: 0,
              y: -8,
              transition: { duration: 0.35, ease: 'easeOut' },
            }}
            className="group relative cursor-pointer"
            style={{ transform: `rotate(${photo.rotation}deg)` }}
            onClick={() => {
              setSelectedPhoto(photo);
              triggerHeartBurst(0.5, 0.5);
            }}
          >
            {/* Polaroid Container with Luxury Gold & Glass Rim */}
            <div className="glass-card-interactive p-4 sm:p-5 rounded-2xl border border-[#d4af37]/40 shadow-2xl relative overflow-hidden transition-all duration-500 group-hover:border-[#f6e6b4] group-hover:shadow-[0_20px_45px_rgba(212,175,55,0.3)]">
              {/* Photo Image Frame */}
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-[#1f040d]">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />

                {/* Shimmer Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#140207]/90 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                {/* Hover Quick Zoom Pill */}
                <div className="absolute bottom-3 right-3 p-2.5 rounded-full bg-[#160209]/80 backdrop-blur-md text-[#f6e6b4] border border-[#d4af37]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>

              {/* Polaroid Caption Area */}
              <div className="pt-4 pb-1 text-center">
                <h3 className="font-serif-luxury text-lg text-[#fffaf0] font-medium group-hover:text-[#f6e6b4] transition-colors flex items-center justify-center gap-1.5">
                  {photo.caption}
                </h3>
                <p className="text-xs tracking-wider text-[#ea638c] font-light mt-0.5 font-cormorant italic">
                  {photo.location}
                </p>
              </div>

              {/* Hidden Photo Replace Option for User Customization */}
              <label
                onClick={(e) => e.stopPropagation()}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-[#1b030b]/80 border border-[#d4af37]/30 text-[#f6e6b4]/70 hover:text-[#fff] hover:bg-[#d4af37]/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-[10px] flex items-center gap-1"
                title="Replace photo"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleCustomImageUpload(e, photo.id)}
                  className="hidden"
                />
              </label>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal via Portal */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedPhoto && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPhoto(null)}
                className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-8 bg-[#080104]/94 backdrop-blur-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="fixed top-6 right-6 p-3 rounded-full bg-[#1c030d]/80 border border-[#d4af37]/50 text-[#f6e6b4] hover:bg-[#d4af37] hover:text-[#1c030d] transition-colors z-[100000] cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Modal Content */}
                <motion.div
                  initial={{ scale: 0.85, y: 30 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.85, y: 30 }}
                  transition={{ type: 'spring', damping: 25 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-w-4xl w-full glass-panel border border-[#d4af37]/60 rounded-3xl p-5 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden"
                >
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={selectedPhoto.url}
                      alt={selectedPhoto.caption}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0105]/80 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#fffaf0]">
                        {selectedPhoto.caption}
                      </h3>
                      <p className="font-cormorant italic text-lg text-[#f6e6b4] mt-1">
                        {selectedPhoto.location} — Dedicated to Sabnam Rai
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => triggerHeartBurst(0.5, 0.5)}
                        className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#670d22] to-[#ea638c] text-[#fffaf0] font-medium text-sm shadow-lg hover:scale-105 transition-transform cursor-pointer"
                      >
                        <Heart className="w-4 h-4 fill-current text-white" />
                        Shower With Love
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};
