import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Stars, Star } from 'lucide-react';
import { romanticAudio } from '../utils/audioEngine';
import { triggerRomanticFinale } from '../utils/confettiFireworks';

export const WishMoment3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [hasWished, setHasWished] = useState(false);
  const [showSecondLine, setShowSecondLine] = useState(false);

  const starMeshRef = useRef<THREE.Mesh | null>(null);
  const trailParticlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const cameraZ = width < 360 ? 5.2 : 4.5;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, cameraZ);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.position.z = w < 360 ? 5.2 : 4.5;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff0f5, 1.4);
    scene.add(ambientLight);

    const goldStarLight = new THREE.PointLight(0xffd700, 3.5, 12);
    goldStarLight.position.set(0, 0, 2);
    scene.add(goldStarLight);

    // Create 3D Faceted Glowing Star Geometry (Icosahedron / Octahedron star cluster)
    const starGeo = new THREE.OctahedronGeometry(0.75, 0);
    const starMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0xd4af37,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.9,
      flatShading: true,
    });

    const starMesh = new THREE.Mesh(starGeo, starMat);
    scene.add(starMesh);
    starMeshRef.current = starMesh;

    // Outer Star Halo / Sparkle arms
    const haloGeo = new THREE.TetrahedronGeometry(0.9, 0);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xfff1b0,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    starMesh.add(haloMesh);

    // Cosmic Dust Particles
    const dustCount = 80;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      const radius = 1.2 + Math.random() * 1.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      dustPos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      dustPos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      dustPos[i * 3 + 2] = radius * Math.cos(phi);
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));

    const dustMat = new THREE.PointsMaterial({
      color: 0xffe066,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const dustPoints = new THREE.Points(dustGeo, dustMat);
    starMesh.add(dustPoints);
    trailParticlesRef.current = dustPoints;

    const startTime = performance.now();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = (performance.now() - startTime) * 0.001;

      if (starMesh) {
        starMesh.rotation.y = t * 0.7;
        starMesh.rotation.x = t * 0.4;
        starMesh.position.y = Math.sin(t * 1.6) * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleMakeWish = () => {
    if (hasWished) return;
    setHasWished(true);

    // Sound chime & launch
    romanticAudio.playChimeSound();

    // Launch shooting star animation
    const star = starMeshRef.current;
    if (star) {
      const startTime = performance.now();
      const launchDuration = 1200;

      const launchAnim = (now: number) => {
        const elapsed = now - startTime;
        const p = Math.min(elapsed / launchDuration, 1);
        const ease = p * p; // Accelerate upward

        star.position.y += ease * 0.35;
        star.position.x += ease * 0.15;
        star.scale.setScalar(Math.max(0.01, 1 - p * 0.9));
        star.rotation.z += 0.2;

        if (p < 1) {
          requestAnimationFrame(launchAnim);
        } else {
          // Trigger grand fireworks
          triggerRomanticFinale();
          setTimeout(() => setShowSecondLine(true), 2000);
        }
      };

      requestAnimationFrame(launchAnim);
    }
  };

  return (
    <section className="relative py-16 sm:py-28 px-4 flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-transparent via-[#060312]/70 to-transparent">
      {/* Cosmic Nebula Night Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-gradient-to-tr from-[#1b1540]/40 via-[#400e26]/30 to-[#d4af37]/15 blur-[150px] pointer-events-none" />

      {/* Header Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="z-20 mb-4 sm:mb-6"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#f9d976]/30 mb-3">
          <Stars className="w-3.5 h-3.5 text-[#ffd700]" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#f6e6b4]">Celestial Moment</span>
        </div>

        <h2 className="font-serif-luxury text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-[#fffaf0] font-normal px-2">
          Close your eyes and make a wish...
        </h2>
        <p className="font-cormorant italic text-base sm:text-2xl text-[#f6e6b4]/80 mt-2 px-4 max-w-xl mx-auto">
          Under the silent watch of a billion stars, whisper your heart's desire.
        </p>
      </motion.div>

      {/* 3D Star Canvas */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center z-20">
        <div ref={mountRef} className="w-full h-full" />
      </div>

      {/* Make Our Wish Button */}
      {!hasWished ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="z-20 mt-4"
        >
          <button
            onClick={handleMakeWish}
            className="group relative px-6 py-3 sm:px-8 sm:py-3.5 rounded-full overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border border-[#d4af37]/70 glass-panel cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/20 via-[#ffd700]/30 to-[#ea638c]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 flex items-center gap-2.5 font-serif-luxury text-[#f6e6b4] text-base sm:text-lg font-medium tracking-wider">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffd700] fill-[#ffd700] animate-spin-slow" />
              ✨ Make Our Wish
            </span>
          </button>
        </motion.div>
      ) : (
        /* Reveal Sequence */
        <div className="z-20 min-h-[140px] mt-4 sm:mt-6 flex flex-col items-center justify-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-cormorant italic text-xl sm:text-4xl text-[#fffaf0] leading-relaxed"
          >
            “My wish already came true.”
          </motion.p>

          <AnimatePresence>
            {showSecondLine && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
                className="mt-3 sm:mt-4 max-w-full"
              >
                <h3 className="font-script text-4xl xs:text-5xl sm:text-7xl md:text-8xl tracking-wide flex items-center justify-center gap-2 flex-wrap sm:flex-nowrap">
                  <span>It was you, </span>
                  <span className="gold-shimmer-text font-normal whitespace-nowrap">Sabnam</span>
                  <span className="inline-block text-[#ea638c] animate-pulse drop-shadow-[0_0_20px_rgba(234,99,140,0.8)] shrink-0">
                    ❤️
                  </span>
                </h3>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
};
